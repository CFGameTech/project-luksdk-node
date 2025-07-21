export namespace RefreshChannelToken {
    export interface Request {
        c_id: number;
        c_uid: string;
        timestamp?: number;
        sign: string;
        token: string;
        left_time: number;
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