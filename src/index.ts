import {CustomizeError, errors} from "./errors";
import {NotifyType, Action} from "./constant";
import {
    GetChannelTokenRequest,
    GetChannelTokenResponse,
    RefreshChannelTokenRequest,
    RefreshChannelTokenResponse,
    GetChannelUserInfoRequest,
    GetChannelUserInfoResponse,
    CreateChannelOrderRequestEntry,
    CreateChannelOrderRequest,
    CreateChannelOrderResponseEntry,
    CreateChannelOrderResponse,
    NotifyChannelOrderRequestEntry,
    NotifyChannelOrderRequest,
    NotifyChannelOrderResponseEntry,
    NotifyChannelOrderResponse,
    NotifyGameRequest,
    NotifyGameRequestStartBefore,
    NotifyGameRequestGaming,
    NotifyGameRequestEnd,
    Response,
    RequestHandler,
    NotifyGameResponse
} from "./models";
import {SDK} from "./sdk";
export {
    CustomizeError,
    errors,
    NotifyType,
    Action,
    GetChannelTokenRequest,
    GetChannelTokenResponse,
    RefreshChannelTokenRequest,
    RefreshChannelTokenResponse,
    GetChannelUserInfoRequest,
    GetChannelUserInfoResponse,
    CreateChannelOrderRequestEntry,
    CreateChannelOrderRequest,
    CreateChannelOrderResponseEntry,
    CreateChannelOrderResponse,
    NotifyChannelOrderRequestEntry,
    NotifyChannelOrderRequest,
    NotifyChannelOrderResponseEntry,
    NotifyChannelOrderResponse,
    NotifyGameRequest,
    NotifyGameRequestStartBefore,
    NotifyGameRequestGaming,
    NotifyGameRequestEnd,
    Response,
    RequestHandler,
    NotifyGameResponse
}

function example() {
    // 初始化 SDK
    let sdk = new SDK("123456")

    // 来自 SDK 请求的参数结构
    let request: GetChannelTokenRequest = {
        c_id: 1000, c_uid: "123456789", code: "", sign: "", timestamp: 167456789
    }
    request.sign = sdk.generateSignature(request)

    // 处理请求
    let resp = sdk.getChannelToken(request, (request) => {
        // 业务逻辑
        let resp: GetChannelTokenResponse = {
            token: "token", left_time: 7200
        }
        return resp
    })

    console.log(JSON.stringify(resp))
}

