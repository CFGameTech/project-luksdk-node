export namespace GetGameServiceList {

    export interface Request {
        // App ID
        c_id?: number;
        // 请求签名
        sign?: string;
        /// 秒级时间戳
        timestamp?: number;
    }

    export interface Response {
        code?: number;
        msg?: string
        data?: {
            game_list: {
                // 游戏图标
                g_icon: string;
                // 游戏 ID
                g_id: number;
                // 游戏名称
                g_name: string;
                // 游戏在线加载 URL
                g_url: string;
            }[];
        }
    }

}
