import { signature } from './sign';
import { Response } from "./models";
import { CustomizeError, errors } from "./errors"; // 引入之前的签名生成函数
export class SDK {
    constructor(signSecret) {
        this.signSecret = signSecret;
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
