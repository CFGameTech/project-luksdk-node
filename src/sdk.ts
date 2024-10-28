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
    NotifyGameResponse
} from "./models";
import {CustomizeError, errors} from "./errors"; // 引入之前的签名生成函数

interface Params {
    [key: string]: any;
}

export class SDK {
    private readonly signSecret: string;

    constructor(signSecret: string) {
        this.signSecret = signSecret;
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