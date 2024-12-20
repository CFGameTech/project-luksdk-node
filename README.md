# 介绍
本项目为 Node 版本的 LukSDK，可直接引入使用，其中提供了需接入接口的通用实现，仅需结合业务逻辑将其返回即可。

> 仅需将 HTTP 请求转换为对应结构体后调用相关函数并填充返回值即可，关于参数的校验等行为交由 SDK 内部处理。

# 安装
```shell
npm install luksdk
```

# 示例代码
```typescript
// 初始化 SDK
const luksdk = require("luksdk")
function example() {
    // 初始化 SDK
    let sdk = new luksdk.SDK("123456", "https://......");
    // 来自 SDK 请求的参数结构
    let request = {
        c_id: 1000, c_uid: "123456789", code: "", sign: "", timestamp: 167456789
    };
    request.sign = sdk.generateSignature(request);
    // 处理请求
    let resp = sdk.getChannelToken(request, (request) => {
        // 业务逻辑
        return {
            token: "token", left_time: 7200
        };
    });
    console.log(JSON.stringify(resp));
}
example();
```