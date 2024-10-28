import { GetChannelTokenRequest, GetChannelTokenResponse, RefreshChannelTokenRequest, Response, RequestHandler, RefreshChannelTokenResponse, GetChannelUserInfoRequest, GetChannelUserInfoResponse, CreateChannelOrderRequest, CreateChannelOrderResponse, NotifyChannelOrderRequest, NotifyChannelOrderResponse, NotifyGameRequest, NotifyGameResponse } from "./models";
interface Params {
    [key: string]: any;
}
export declare class SDK {
    private readonly signSecret;
    constructor(signSecret: string);
    verifySignature(sign: string, params: Params): boolean;
    generateSignature(params: Params): string;
    getChannelToken(request: GetChannelTokenRequest, successHandler?: RequestHandler<GetChannelTokenRequest, GetChannelTokenResponse>): Response<GetChannelTokenResponse>;
    refreshChannelToken(request: RefreshChannelTokenRequest, successHandler?: RequestHandler<RefreshChannelTokenRequest, RefreshChannelTokenResponse>): Response<RefreshChannelTokenResponse>;
    getChannelUserInfo(request: GetChannelUserInfoRequest, successHandler?: RequestHandler<GetChannelUserInfoRequest, GetChannelUserInfoResponse>): Response<GetChannelUserInfoResponse>;
    createChannelOrder(request: CreateChannelOrderRequest, successHandler?: RequestHandler<CreateChannelOrderRequest, CreateChannelOrderResponse>): Response<CreateChannelOrderResponse>;
    notifyChannelOrder(request: NotifyChannelOrderRequest, successHandler?: RequestHandler<NotifyChannelOrderRequest, NotifyChannelOrderResponse>): Response<NotifyChannelOrderResponse>;
    notifyGame(request: NotifyGameRequest, successHandler?: RequestHandler<NotifyGameRequest, NotifyGameResponse>): Response<NotifyGameResponse>;
    private generateHandler;
}
export {};
