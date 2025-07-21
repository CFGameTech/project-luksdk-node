export namespace NotifyEvent {
    export interface Request {
        // App ID
        app_id: number;
        // 游戏 ID
        game_id: number;
        // 房间 ID
        room_id: string;
        // 游戏局次 ID
        round_id: string;
        // 请求签名
        sign: string;
        // 秒级时间戳
        timestamp?: number;
        // 事件类型，根据事件类型解析为对应的事件数据
        type: number;
        // 事件数据
        data: string;
    }

    export interface Response {
        // 请求状态码，当值为 0 时表示请求成功
        code: number;
        // 请求状态说明
        msg?: string;
    }

    export interface StartGame {
        start_unix_sec: number;
        user_ids: string[];
        op_user_id: string;
        start_ext: string;
    }

    export interface GameEnd {
        start_unix_sec: number;
        end_unix_sec: number;
        user_results: {
            score?: number;
            rank?: number;
            status?: number;
            escape?: boolean;
            trust?: boolean;
        }[];
        end_type?: number;
        end_ext?: string;
        cost_coins?: number;
        op_user_id?: string;
        start_ext?: string;
    }

    export interface UserChange {
        user_ids: string[];
        type: number;
        player_state: {};
        ob_user_ids?: string[];
        gaming?: boolean
    }

    export interface RoomSettingChange {
        op_user_id?: string;
        room_setting?: string;
    }

    export interface RoomSeatSync {
        seat_user_ids: {};
    }

    export interface GameFeatureEvent {
        feature: string;
    }

    export interface PropEquip {
        user_id: string;
        equipped_prop_id?: string;
        unequipped_prop_id?: string;
    }
}