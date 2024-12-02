var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signature } from './sign';
import { Response } from "./models";
import { CustomizeError, errors } from "./errors";
export class SDK {
    constructor(signSecret, domain) {
        this.apiPrefix = "/sdk";
        this.signSecret = signSecret;
        this.domain = domain;
    }
    issuance_props(channelId, gameId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.domain) {
                throw new Error("Domain is empty");
            }
            const url = `${this.domain}${this.apiPrefix}/issuance_props/`;
            const body = {
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
                headers: { 'Content-Type': 'application/json' }
            }).then(r => {
                if (!r.ok) {
                    return Promise.reject(new Error('Request failed with status ' + r.status));
                }
                return r.json(); // 这里返回解析后的 JSON 数据
            }).then(data => {
                return data; // 返回获取到的数据
            }).catch(error => {
                return Promise.reject(error); // 错误处理
            });
        });
    }
    getGameServiceList(channelId) {
        if (!this.domain) {
            return Promise.reject(new Error("Domain is empty"));
        }
        const url = `${this.domain}${this.apiPrefix}/get_game_service_list/`;
        const body = {
            c_id: channelId,
            timestamp: Date.now(),
        };
        if (!body.sign || body.sign === "") {
            body.sign = this.generateSignature(body);
        }
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }).then(r => {
            if (!r.ok) {
                return Promise.reject(new Error('Request failed with status ' + r.status));
            }
            return r.json(); // 这里返回解析后的 JSON 数据
        }).then(data => {
            return data; // 返回获取到的数据
        }).catch(error => {
            return Promise.reject(error); // 错误处理
        });
    }
    // VerifySignature 验证签名是否正确
    verifySignature(sign, params) {
        const generatedSign = signature(this.signSecret, params);
        return generatedSign === sign;
    }
    // GenerateSignature 生成签名
    generateSignature(params) {
        return signature(this.signSecret, params);
    }
    // GetChannelToken 获取用户令牌
    getChannelToken(request, successHandler) {
        return this.generateHandler(request.sign, request, successHandler);
    }
    // RefreshChannelToken 刷新用户令牌过期时间
    refreshChannelToken(request, successHandler) {
        return this.generateHandler(request.sign, request, successHandler);
    }
    // GetChannelUserInfo 获取渠道用户信息
    getChannelUserInfo(request, successHandler) {
        return this.generateHandler(request.sign, request, successHandler);
    }
    // CreateChannelOrder 向渠道下订单
    createChannelOrder(request, successHandler) {
        return this.generateHandler(request.sign, request, successHandler);
    }
    // NotifyChannelOrder 下注开奖通知结果
    notifyChannelOrder(request, successHandler) {
        return this.generateHandler(request.sign, request, successHandler);
    }
    // NotifyGame 向渠道通知游戏状态
    notifyGame(request, successHandler) {
        return this.generateHandler(request.sign, request, successHandler);
    }
    // generateHandler 内部处理方法
    generateHandler(sign, request, successHandler) {
        const verified = this.verifySignature(sign ? sign : "", request);
        let resp = new Response();
        if (verified) {
            if (successHandler) {
                const v = successHandler(request);
                if (v) {
                    if (v instanceof CustomizeError) {
                        resp.withError(v);
                    }
                    else {
                        resp.withData(v);
                    }
                }
            }
            return resp;
        }
        return resp.withError(errors.ErrInvalidSignature);
    }
}
