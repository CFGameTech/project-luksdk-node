import { signature } from './sign';
import {
    GetChannelTokenRequest,
    GetChannelTokenResponse,
    RefreshChannelTokenRequest,
    Response,
    RequestHandler,
    RefreshChannelTokenResponse,
    GetChannelUserInfoRequest,
    GetChannelUserInfoResponse,
    CreateChannelOrderRequest,
    CreateChannelOrderResponse,
    NotifyChannelOrderRequest,
    NotifyChannelOrderResponse,
    NotifyGameRequest,
    NotifyGameResponse,
    GetGameServiceListRequest,
    GetGameServiceListResponse,
    IssuancePropsRequestEntry,
    IssuancePropsRequest, IssuancePropsResponse
} from "./models";
import {CustomizeError, errors} from "./errors";

interface Params {
    [key: string]: any;
}

export class SDK {
    private readonly signSecret: string;
    private readonly domain: string;
    private readonly apiPrefix = "/sdk"

    constructor(signSecret: string, domain: string) {
        this.signSecret = signSecret;
        this.domain = domain;
    }

    public async issuance_props(channelId: number, gameId: number, data: IssuancePropsRequestEntry[]) : Promise<Response<IssuancePropsResponse>> {
        if (!this.domain) {
            throw new Error("Domain is empty");
        }

        const url = `${this.domain}${this.apiPrefix}/issuance_props/`;
        const body :IssuancePropsRequest = {
            c_id: channelId,
            g_id: gameId,
            timestamp: Date.now(),
            data: data,
        };

        if (!body.sign || body.sign === "") {
            body.sign = this.generateSignature(body);
        }

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        }).then(r => {
            if (!r.ok) {
                return Promise.reject(new Error('Request failed with status ' + r.status));
            }
            return r.json();  // 这里返回解析后的 JSON 数据
        }).then(data => {
            return data;  // 返回获取到的数据
        }).catch(error => {
            return Promise.reject(error);  // 错误处理
        });
    }

    public getGameServiceList(channelId: number): Promise<Response<GetGameServiceListResponse>> {
        if (!this.domain) {
            return Promise.reject(new Error("Domain is empty"));
        }

        const url = `${this.domain}${this.apiPrefix}/get_game_service_list/`;
        const body: GetGameServiceListRequest = {
            c_id: channelId,
            timestamp: Date.now(),
        };

        if (!body.sign || body.sign === "") {
            body.sign = this.generateSignature(body);
        }

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        }).then(r => {
            if (!r.ok) {
                return Promise.reject(new Error('Request failed with status ' + r.status));
            }
            return r.json();  // 这里返回解析后的 JSON 数据
        }).then(data => {
            return data;  // 返回获取到的数据
        }).catch(error => {
            return Promise.reject(error);  // 错误处理
        });
    }

    // VerifySignature 验证签名是否正确
    verifySignature(sign: string, params: Params): boolean {
        const generatedSign = signature(this.signSecret, params);
        return generatedSign === sign;
    }

    // GenerateSignature 生成签名
    generateSignature(params: Params): string {
        return signature(this.signSecret, params);
    }

    // GetChannelToken 获取用户令牌
    getChannelToken(
        request: GetChannelTokenRequest,
        successHandler?: RequestHandler<GetChannelTokenRequest, GetChannelTokenResponse>
    ): Response<GetChannelTokenResponse> {
        return this.generateHandler(request.sign, request, successHandler);
    }

    // RefreshChannelToken 刷新用户令牌过期时间
    refreshChannelToken(
        request: RefreshChannelTokenRequest,
        successHandler?: RequestHandler<RefreshChannelTokenRequest, RefreshChannelTokenResponse>
    ): Response<RefreshChannelTokenResponse> {
        return this.generateHandler(request.sign, request, successHandler);
    }

    // GetChannelUserInfo 获取渠道用户信息
    getChannelUserInfo(
        request: GetChannelUserInfoRequest,
        successHandler?: RequestHandler<GetChannelUserInfoRequest, GetChannelUserInfoResponse>
    ): Response<GetChannelUserInfoResponse> {
        return this.generateHandler(request.sign, request, successHandler);
    }

    // CreateChannelOrder 向渠道下订单
    createChannelOrder(
        request: CreateChannelOrderRequest,
        successHandler?: RequestHandler<CreateChannelOrderRequest, CreateChannelOrderResponse>
    ): Response<CreateChannelOrderResponse> {
        return this.generateHandler(request.sign, request, successHandler);
    }

    // NotifyChannelOrder 下注开奖通知结果
    notifyChannelOrder(
        request: NotifyChannelOrderRequest,
        successHandler?: RequestHandler<NotifyChannelOrderRequest, NotifyChannelOrderResponse>
    ): Response<NotifyChannelOrderResponse> {
        return this.generateHandler(request.sign, request, successHandler);
    }

    // NotifyGame 向渠道通知游戏状态
    notifyGame(
        request: NotifyGameRequest,
        successHandler?: RequestHandler<NotifyGameRequest, NotifyGameResponse>
    ): Response<NotifyGameResponse> {
        return this.generateHandler(request.sign, request, successHandler);
    }

    // generateHandler 内部处理方法
    private generateHandler<TRequest, TResponse>(
        sign?: string,
        request?: TRequest,
        successHandler?: RequestHandler<TRequest, TResponse>
    ): Response<TResponse> {
        const verified = this.verifySignature(sign ? sign : "", request as unknown as Params);
        let resp = new Response<TResponse>();
        if (verified) {
            if (successHandler) {
                const v = successHandler(request);
                if (v) {
                    if (v instanceof CustomizeError) {
                        resp.withError(v);
                    }else {
                        resp.withData(v as TResponse)
                    }
                }
            }
            return resp;
        }
        return resp.withError(errors.ErrInvalidSignature);
    }
}