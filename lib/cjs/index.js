"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.NotifyGameRequest = exports.Action = exports.NotifyType = exports.errors = exports.CustomizeError = void 0;
const errors_1 = require("./errors");
Object.defineProperty(exports, "CustomizeError", { enumerable: true, get: function () { return errors_1.CustomizeError; } });
Object.defineProperty(exports, "errors", { enumerable: true, get: function () { return errors_1.errors; } });
const constant_1 = require("./constant");
Object.defineProperty(exports, "NotifyType", { enumerable: true, get: function () { return constant_1.NotifyType; } });
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return constant_1.Action; } });
const models_1 = require("./models");
Object.defineProperty(exports, "NotifyGameRequest", { enumerable: true, get: function () { return models_1.NotifyGameRequest; } });
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return models_1.Response; } });
const sdk_1 = require("./sdk");
function example() {
    // 初始化 SDK
    let sdk = new sdk_1.SDK("123456");
    // 来自 SDK 请求的参数结构
    let request = {
        c_id: 1000, c_uid: "123456789", code: "", sign: "", timestamp: 167456789
    };
    request.sign = sdk.generateSignature(request);
    // 处理请求
    let resp = sdk.getChannelToken(request, (request) => {
        // 业务逻辑
        let resp = {
            token: "token", left_time: 7200
        };
        return resp;
    });
    console.log(JSON.stringify(resp));
}
example();
