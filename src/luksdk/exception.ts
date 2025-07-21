export class LukSDKException extends Error {
  private readonly code: number;
  private readonly msg: string;

  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
    this.msg = msg;
    this.name = 'LukSDKException';
  }

  getCode(): number {
    return this.code;
  }

  getMessage(): string {
    return this.msg;
  }

  public with(...args: any[]): LukSDKException {
    if (args.length === 0) {
      return this;
    }

    let msg: string;
    if (args.length === 1) {
      msg = String(args[0]);
    } else {
      msg = args.map(arg => String(arg)).join(' ');
    }

    const newMsg = `${this.msg}: ${msg}`;
    return new LukSDKException(this.code, newMsg);
  }
}

// 预定义的错误
export namespace LukSDKExceptions {
  export const INTERNAL_ERROR = new LukSDKException(100000, "Luksdk: 服务器内部异常");
  export const PARAM_ERROR = new LukSDKException(100001, "Luksdk: 参数错误");
  export const BUSY = new LukSDKException(100002, "Luksdk: 请稍后再试");
  export const NOT_FOUND = new LukSDKException(100003, "Luksdk: 资源不存在");
  export const CHANNEL_DISABLED = new LukSDKException(100004, "Luksdk: 渠道已禁用");
  export const SIGN_INVALID = new LukSDKException(100005, "Luksdk: 签名校验失败");
  export const TOKEN_INVALID = new LukSDKException(100006, "Luksdk: 未登录或 Token 已过期");
  export const CALLBACK_ERROR = new LukSDKException(100007, "Luksdk: 渠道方回调地址响应解析失败");
}