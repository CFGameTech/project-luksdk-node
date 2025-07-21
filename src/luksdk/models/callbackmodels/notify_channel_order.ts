export namespace NotifyChannelOrder {
    export interface Request {
        // 随机字符串
        nonce?: string;
        // 请求签名
        sign: string;
        // 秒级时间戳
        timestamp?: number;
        // 订单列表
        data: {
            // App ID
            c_id: number;
            // 用户 ID
            c_uid: string;
            // 游戏 ID
            g_id: number;
            // 游戏订单 ID
            game_order_id: string;
            // 用户令牌
            token: string;
            // 下注时消耗的金币
            coins_cost: number;
            // 下注开出的金币
            coins_award: number;
            // 下注时消耗的积分
            score_cost: number;
            // 下注开出的积分
            score_award: number;
            // 秒级时间戳
            timestamp: number;
        }[];
    }

    export interface Response {
        // 请求状态码，当值为 0 时表示请求成功
        code: number;
        // 请求状态说明
        msg?: string;
        // 订单响应列表
        data: {
            // 用户 ID
            c_uid: string;
            // 剩余货币量
            coins?: number;
            // 渠道方订单 ID
            order_id: string;
        }[];
    }
}
