import { CustomizeError } from "./errors";
export class NotifyGameRequest {
    constructor() {
        this.getGaming = () => {
            return JSON.parse(this.data ? this.data : "{}");
        };
        this.getEnd = () => {
            return JSON.parse(this.data ? this.data : "{}");
        };
        this.getSettingGame = () => {
            return JSON.parse(this.data ? this.data : "{}");
        };
    }
}
export class Response {
    constructor(data) {
        this.code = 0;
        this.msg = "";
        if (data !== undefined) {
            this.data = data;
        }
    }
    // 设置响应的错误信息
    withError(err, msg = []) {
        if (err instanceof CustomizeError) {
            this.code = err.code;
        }
        else {
            this.code = -1;
        }
        this.msg = err.message;
        if (msg.length > 0) {
            this.msg = [this.msg, ...msg].join(', ');
        }
        return this;
    }
    // 设置响应的数据
    withData(data) {
        this.data = data;
        if (this.code === 0) {
            this.msg = '成功';
        }
        return this;
    }
    // 判断是否成功
    suc() {
        return this.code === 0;
    }
}
