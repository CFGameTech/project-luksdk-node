export namespace NotifyGame {
  export interface Request {
    // App ID
    app_id: number;
    // 通知数据
    data: string;
    // 房间透传字段，每个用户加入房间时采用最新值作为透传内容
    ext?: string;
    // 游戏 ID
    game_id: number;
    // 通知类型枚举，需根据不同的通知类型，解析为对应的通知数据
    notify_type: number;
    // 请求签名
    sign: string;
    // 秒级时间戳
    timestamp?: number;
  }

  export interface Response {
    // 请求状态码，当值为 0 时表示请求成功
    code: number;
    // 请求状态说明
    msg?: string;
  }

  export interface StartBefore {
    // 房间 ID
    room_id: string;
    // 回合 ID
    round_id: string;
    // 玩家准备状态
    player_ready_status: { [playerId: string]: boolean };
    // 通知操作
    notify_action: number;
    // 游戏设置
    game_setting: string;
  }

  export interface GameStartBefore {
    // 房间 ID
    room_id: string;
    // 回合 ID
    round_id: string;
    // 玩家准备状态
    player_ready_status: { [playerId: string]: boolean };
    // 通知操作
    notify_action: number;
    // 游戏设置
    game_setting: string;
  }

  export interface GameRunning {
    room_id: string;
    round_id: string;
    player_num: number;
    player_uids: string[];
    notify_action: number;
  }

  export interface GameEnd {
    room_id: string;
    round_id: string;
    rank: string[];
    player_score: {};
    notify_action: number;
  }
}
