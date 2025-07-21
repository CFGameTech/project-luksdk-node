export namespace GetChannelToken {
    export interface Request {
        c_id: number;
        c_uid: string;
        code?: string;
        timestamp?: number;
        sign: string;
    }

    export interface Response {
        code: number;
        msg?: string;
        data?: {
            token: string;
            left_time: number;
        };
    }
}