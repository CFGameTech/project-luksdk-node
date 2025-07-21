export namespace QueryOrder {
    export interface Request {
        // App ID
        app_id: number;
        // 渠道订单 ID，和 game_order_no 二选一
        app_order_no?: string;
        // 游戏 ID
        game_id: number;
        // 游戏订单 ID，和 app_order_no 二选一
        game_order_no?: string;
        // 随机字符串
        nonce?: string;
        // 请求签名
        sign: string;
        // 秒级时间戳
        timestamp?: number;
    }

    export interface Response {
        code: number;
        msg?: string;
        data: {
            // 房间抽成值
            anchor_draw?: number;
            // App ID
            app_id: number;
            // 渠道订单 ID
            app_order_id: string;
            // 订单奖励金额
            coins_award?: number;
            // 订单消耗金额
            coins_cost?: number;
            // 官方抽成值
            coins_official_draw?: number;
            // 订单时间，秒级时间戳
            create_time: number;
            // 订单扩展信息
            ext?: string;
            // 订单盈余
            gain?: number;
            // 游戏订单 ID
            game_order_id: string;
            // 订单道具 ID
            item_id?: string;
            // 道具数量
            num?: number;
            // 游戏支付通知状态
            pay_game_status: number;
            // 订单状态
            pay_status: number;
            // 用户 ID
            user_id: string;
        };
    }
}