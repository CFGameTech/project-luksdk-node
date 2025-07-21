export namespace PublishControlEvent {
    export interface Request {
        // App ID
        app_id: number;
        // 游戏 ID
        game_id: number;
        // 房间 ID
        room_id?: string;
        // 请求签名
        sign: string;
        // 秒级时间戳
        timestamp?: number;
        // 事件类型枚举
        type: number;
        // 事件数据 JSON
        data: string;
    }

    export interface Response {
        code?: number;
        msg?: string;
        data?: any;
    }

    export interface JoinGame {
        user_id: string;
        seat?: number;
        ready?: boolean;
        auto_start_num?: number;
    }

    export interface LeaveGame {
        user_id: string;
    }

    export interface ChangeReadyStatus {
        user_id: string;
        is_prepare?: boolean;
    }

    export interface KickPlayer {
        op_user_id?: string;
        user_id: string;
        reason?: string;
    }

    export interface StartGame {
        op_user_id?: string;
        force?: boolean;
        start_ext?: string;
    }

    export interface ForceCloseGame {
        op_user_id?: string;
        clear_seat?: boolean;
    }

    export interface ChangeRoomSetting {
        op_user_id?: string;
        room_setting: string;
    }

    export interface RoomSeatSync {

    }

    export interface RefreshUserInfo {
        user_id: string;
    }

    export interface QuickStartGame {
        user_ids: string[];
        start_game?: boolean;
        setting?: string;
    }

    export interface IssueProps {
        unique_id: string;
        user_id: string;
        detail: {
            prop_id: string;
            num: number;
            duration?: number;
            duration_reset?: boolean;
        }[];
    }

    export interface FetchUserBag {
        user_id: string;
    }

    export interface FetchUserBagResponse {
        props?: {
            prop_id: string;
            type: number;
            num: number;
            expire_time?: number;
            is_equipped?: boolean;
        }[]
    }

    export interface QueryIssueStatus {
        unique_id: string;
    }

    export interface QueryIssueStatusResponse {
        app_id?: number;
        game_id?: string;
        unique_id?: string;
        user_id?: string;
        details?: {
            prop_id: string;
            type: number;
            num: number;
            expire_time?: number;
            is_equipped?: boolean;
        }
        extra?: string;
        status?: number;
        created_time?: number;
    }

    export interface EquipProp {
        user_id: string;
        equipped_prop_id: string;
    }

    export interface UnequipProp {
        user_id: string;
        unequipped_prop_id: string;
    }
}