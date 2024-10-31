import {CustomizeError, errors} from "./errors";
import {Action, NotifyType} from "./constant";

export type GetChannelTokenRequest = {
    c_id?: number; // 渠道ID
    c_uid?: string; // 渠道用户id
    code?: string; // 渠道的用户临时的code
    timestamp?: number; // 时间戳
    sign?: string; // 加密签名
};

export type GetChannelTokenResponse = {
    token?: string; // 用户令牌
    left_time?: number; // 剩余秒数(避免时区问题用剩余秒数) 注意：不能为0
};

export type RefreshChannelTokenRequest = {
    c_id?: number; // 渠道ID
    c_uid?: string; // 渠道用户id
    token?: string; // sdk平台令牌
    timestamp?: number; // 时间戳
    sign?: string; // 加密签名
    left_time?: number; // 设置剩余秒数
};

export type RefreshChannelTokenResponse = {
    token?: string; // 用户令牌
    left_time?: number; // 剩余秒数(避免时区问题用剩余秒数) 注意：不能为0
};

export type GetChannelUserInfoRequest = {
    g_id?: number; // 游戏id
    c_id?: number; // 渠道ID
    c_uid?: string; // 渠道用户id
    timestamp?: number; // 时间戳
    token?: string; // 用户token
    sign?: string; // 加密签名
};

export type GetChannelUserInfoResponse = {
    c_uid?: string; // 渠道用户id
    name?: string; // 用户昵称
    avatar?: string; // 用户头像
    coins?: number; // 用户金币
};

export type CreateChannelOrderRequestEntry = {
    c_id?: number; // 渠道ID
    c_uid?: string; // 渠道用户id
    c_room_id?: string; // 渠道房间id
    g_id?: number; // 游戏id
    coins_cost?: number; // 下单金额
    score_cost?: number; // 下单积分
    game_order_id?: string; // 游戏方生成的唯一id
    token?: string; // 用户token
    timestamp?: number; // 时间戳
};

export type CreateChannelOrderRequest = {
    sign?: string; // 加密签名
    data?: CreateChannelOrderRequestEntry[]; // 订单条目
    timestamp?: number; // 时间戳
    nonce?: string // 随机值
};

export type CreateChannelOrderResponseEntry = {
    c_uid?: string; // 渠道用户id
    order_id?: string; // 渠道订单id
    coins?: number; // 用户当前金币
    status?: number; // 付款状态 1成功 0失败
};

export type CreateChannelOrderResponse = CreateChannelOrderResponseEntry[];

export type NotifyChannelOrderRequestEntry = {
    c_id?: number; // 渠道ID
    c_uid?: string; // 渠道用户id
    g_id?: number; // 游戏id
    game_order_id?: string; // 游戏方生成的唯一id
    token?: string; // 用户token
    coins_cost?: number; // 下注时消耗的金币
    coins_award?: number; // 下注开出的金币 可能为0或者负数,即没获胜的情况下
    score_cost?: number; // 下注时消耗的积分
    score_award?: number; // 下注开出的积分 可能为0或者负数,即没获胜的情况下
    timestamp?: number; // 时间戳
};

export type NotifyChannelOrderRequest = {
    sign?: string; // 加密签名
    data?: NotifyChannelOrderRequestEntry[];
    timestamp?: number; // 时间戳
    nonce?: string // 随机值
};

export type NotifyChannelOrderResponseEntry = {
    c_uid?: string; // 渠道用户id
    order_id?: string; // 渠道订单id
    coins?: number; // 当前用户剩下金币
    score?: number; // 当前用户剩下积分
};

export type NotifyChannelOrderResponse = NotifyChannelOrderResponseEntry[];

export class NotifyGameRequest {
    c_id?: number; // 渠道ID
    g_id?: number; // 游戏id
    notify_type?: number; // 游戏通知状态
    ext?: string; // 渠道方透传数据
    data?: string; // 游戏数据
    timestamp?: number; // 时间戳
    sign?: string; // 加密签名


    getGaming = (): NotifyGameRequestStartBefore => {
        return JSON.parse(this.data ? this.data : "{}")
    }

    getEnd = (): NotifyGameRequestEnd => {
        return JSON.parse(this.data ? this.data : "{}")
    }

    getSettingGame = (): NotifyGameRequestGaming => {
        return JSON.parse(this.data ? this.data : "{}")
    }
}

export type NotifyGameRequestStartBefore = {
    room_id?: string; // 房间id
    round_id?: string; // 回合ID
    player_ready_status?: { [playerId: string]: boolean }; // 玩家准备状态
    notify_action?: number; // 游戏通知操作
    game_setting?: string; // 游戏当前设置
};

export type NotifyGameRequestGaming = {
    room_id?: string; // 房间id
    round_id?: string; // 回合ID
    player_num?: number; // 玩家数量
    player_uids?: string[]; // 玩家uids数组
    notify_action?: number; // 游戏通知操作
};

export type NotifyGameRequestEnd = {
    room_id?: string; // 房间id
    round_id?: string; // 回合ID
    rank?: string[]; // 排名
    is_force_end?: boolean; // 是否为强制结束
    notify_action?: number; // 游戏通知操作
};

export type NotifyGameResponse = {

}

export type RequestHandler<Q, T> = (request?: Q) => T | undefined | null | Error;

export class Response<T> {
    code: number = 0;
    msg: string = "";
    data?: T;

    public constructor(data?: T) {
        if (data !== undefined) {
            this.data = data;
        }
    }


    // 设置响应的错误信息
    public withError(err: Error, msg: string[] = []): Response<T> {
        if (err instanceof CustomizeError) {
            this.code = err.code;
        }else {
            this.code = -1;
        }
        this.msg = err.message;
        if (msg.length > 0) {
            this.msg = [this.msg, ...msg].join(', ');
        }
        return this;
    }

    // 设置响应的数据
    public withData(data: T): Response<T> {
        this.data = data;
        if (this.code === 0) {
            this.msg = '成功';
        }
        return this;
    }

    // 判断是否成功
    public suc(): boolean {
        return this.code === 0;
    }
}

