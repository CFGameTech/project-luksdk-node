export type GetChannelTokenRequest = {
    c_id?: number;
    c_uid?: string;
    code?: string;
    timestamp?: number;
    sign?: string;
};
export type GetChannelTokenResponse = {
    token?: string;
    left_time?: number;
};
export type RefreshChannelTokenRequest = {
    c_id?: number;
    c_uid?: string;
    token?: string;
    timestamp?: number;
    sign?: string;
    left_time?: number;
};
export type RefreshChannelTokenResponse = {
    token?: string;
    left_time?: number;
};
export type GetChannelUserInfoRequest = {
    g_id?: number;
    c_id?: number;
    c_uid?: string;
    timestamp?: number;
    token?: string;
    sign?: string;
};
export type GetChannelUserInfoResponse = {
    c_uid?: string;
    name?: string;
    avatar?: string;
    coins?: number;
};
export type CreateChannelOrderRequestEntry = {
    c_id?: number;
    c_uid?: string;
    c_room_id?: string;
    g_id?: number;
    coins_cost?: number;
    score_cost?: number;
    game_order_id?: string;
    token?: string;
    timestamp?: number;
};
export type CreateChannelOrderRequest = {
    sign?: string;
    data?: CreateChannelOrderRequestEntry[];
    timestamp?: number;
    nonce?: string;
};
export type CreateChannelOrderResponseEntry = {
    c_uid?: string;
    order_id?: string;
    coins?: number;
    status?: number;
};
export type CreateChannelOrderResponse = CreateChannelOrderResponseEntry[];
export type NotifyChannelOrderRequestEntry = {
    c_id?: number;
    c_uid?: string;
    g_id?: number;
    game_order_id?: string;
    token?: string;
    coins_cost?: number;
    coins_award?: number;
    score_cost?: number;
    score_award?: number;
    timestamp?: number;
};
export type NotifyChannelOrderRequest = {
    sign?: string;
    data?: NotifyChannelOrderRequestEntry[];
    timestamp?: number;
    nonce?: string;
};
export type NotifyChannelOrderResponseEntry = {
    c_uid?: string;
    order_id?: string;
    coins?: number;
    score?: number;
};
export type NotifyChannelOrderResponse = NotifyChannelOrderResponseEntry[];
export declare class NotifyGameRequest {
    c_id?: number;
    g_id?: number;
    notify_type?: number;
    ext?: string;
    data?: string;
    timestamp?: number;
    sign?: string;
    getGaming: () => NotifyGameRequestStartBefore;
    getEnd: () => NotifyGameRequestEnd;
    getSettingGame: () => NotifyGameRequestGaming;
}
export type NotifyGameRequestStartBefore = {
    room_id?: number;
    round_id?: number;
    player_ready_status?: {
        [playerId: string]: boolean;
    };
    notify_action?: number;
    game_setting?: string;
};
export type NotifyGameRequestGaming = {
    room_id?: number;
    round_id?: number;
    player_num?: number;
    player_uids?: string[];
    notify_action?: number;
};
export type NotifyGameRequestEnd = {
    room_id?: number;
    round_id?: number;
    rank?: string[];
    is_force_end?: boolean;
    notify_action?: number;
};
export type NotifyGameResponse = {};
export type RequestHandler<Q, T> = (request?: Q) => T | undefined | null | Error;
export declare class Response<T> {
    code: number;
    msg: string;
    data?: T;
    constructor(data?: T);
    withError(err: Error, msg?: string[]): Response<T>;
    withData(data: T): Response<T>;
    suc(): boolean;
}
