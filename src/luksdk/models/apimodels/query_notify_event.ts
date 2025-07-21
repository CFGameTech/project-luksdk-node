export namespace QueryNotifyEvent {

    export interface Request {
        // App ID
        app_id: number;
        // 结束时间，可基于秒级结束时间戳过滤
        end_at?: number;
        // 游戏 ID
        game_id: number;
        // 页码
        page_no: number;
        // 每页数量
        page_size: number;
        // 房间 ID，可基于房间 ID 过滤
        room_id?: string;
        // 请求签名
        sign: string;
        // 开始时间，可基于秒级开始时间戳过滤
        start_at?: number;
        // 秒级时间戳
        timestamp?: number;
        // 事件类型，可基于事件类型过滤，具体参考游戏通知事件接口
        type?: number;
    }

    export interface Response {
        // Code 0 表示成功
        code: number;
        // Msg 消息
        msg?: string;
        // Data 数据
        data: {
            // List 列表
            list: {
                type: number;
                data: string;
            }[];
        };
    }


}
