
export class CustomizeError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }

    getCode() {
        return this.code;
    }
}

export const errors = {
    ErrInvalidParams: new CustomizeError(1000, "invalid params"),                   // 参数有误
    ErrInvalidChannel: new CustomizeError(1001, "invalid channel"),                 // 渠道有误
    ErrInvalidChannelOrder: new CustomizeError(1002, "invalid channel request"),    // 渠道请求异常
    ErrInvalidSignature: new CustomizeError(1003, "invalid signature"),             // 签名有误
    ErrInvalidGame: new CustomizeError(1004, "invalid game"),                       // 游戏有误
    ErrChannelDataException: new CustomizeError(1005, "channel data exception"),    // 渠道返回数据异常
    ErrRepeatOrder: new CustomizeError(1006, "repeat order"),                       // 重复下订单
    ErrOrderFailed: new CustomizeError(1007, "order failed"),                       // 下单失败
    ErrOrderNotExist: new CustomizeError(1008, "order not exist"),                  // 订单不存在
};