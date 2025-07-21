# Luksdk Node.js 模块化实现

这是参考 Golang 版本实现的 Node.js 版本 Luksdk，采用模块化设计，提供了完整的 API 调用和回调处理功能。

## 特性

- 🏗️ 模块化设计，结构清晰
- 🔐 自动签名生成和验证
- 📝 完整的 TypeScript 类型定义
- 🚀 异步 API 调用支持
- 🛡️ 错误处理机制
- 📋 回调请求验证

## 快速开始

### 1. 创建配置

```typescript
import { newConfig, newClient } from 'luksdk';

const config = newConfig()
  .withAppId(12345)
  .withAppSecret('your-app-secret')
  .withDomain('https://api.example.com')
  .withDebug(true)
  .build();
```

### 2. 创建客户端

```typescript
const client = newClient(config);
```

### 3. 调用 API

```typescript
// 获取游戏服务列表
const gameListResponse = await client.apis.getGameServiceList({
  c_id: 12345,
  timestamp: Math.floor(Date.now() / 1000),
  sign: '' // 签名会自动生成
});

// 查询订单
const orderResponse = await client.apis.queryOrder({
  app_id: 12345,
  game_id: 67890,
  game_order_no: 'order-123',
  sign: '', // 签名会自动生成
  timestamp: Math.floor(Date.now() / 1000)
});
```

### 4. 处理回调

```typescript
// 验证回调请求签名
try {
  client.callbacks.parseGetChannelTokenRequest(request);
  console.log('签名验证成功');
  // 处理业务逻辑...
} catch (error) {
  console.error('签名验证失败:', error);
}
```

## API 接口

### APIs 类

- `getGameServiceList(req)` - 获取游戏服务列表
- `queryOrder(req)` - 查询订单
- `queryNotifyEvent(req)` - 查询通知事件
- `publishControlEvent(req)` - 发布控制事件

### Callbacks 类

- `parseGetChannelTokenRequest(req)` - 验证获取渠道令牌请求
- `parseRefreshChannelTokenRequest(req)` - 验证刷新渠道令牌请求
- `parseNotifyChannelOrderRequest(req)` - 验证通知渠道订单请求
- `parseNotifyEventRequest(req)` - 验证通知事件请求

## 错误处理

```typescript
import { LuksdkError, LuksdkErrorSignError } from 'luksdk';

try {
  // API 调用
} catch (error) {
  if (error instanceof LuksdkError) {
    console.log('错误码:', error.getCode());
    console.log('错误信息:', error.getMessage());
  }
}
```

## 模型定义

所有的请求和响应模型都有完整的 TypeScript 类型定义，包括：

- API 模型 (`apimodels`)
- 回调模型 (`callbackmodels`)
- 枚举定义 (`enums`)

## 目录结构

```
src/luksdk/
├── config.ts              # 配置管理
├── luksdk.ts              # 客户端入口
├── apis.ts                # API 调用
├── callbacks.ts           # 回调处理
├── exception.ts              # 错误定义
├── sign.ts                # 签名工具
├── models/                # 模型定义
│   ├── enums.ts          # 枚举
│   ├── apimodels/        # API 模型
│   └── callbackmodels/   # 回调模型
└── index.ts              # 主入口
```

## 与 Golang 版本的对应关系

| Golang | Node.js |
|--------|--------|
| `luksdk.NewConfig()` | `newConfig()` |
| `luksdk.NewClient()` | `newClient()` |
| `client.Apis` | `client.apis` |
| `client.Callbacks` | `client.callbacks` |
| `luksdkerrors.LuksdkError` | `LuksdkError` |
| `luksdkmodels.apimodels` | `apimodels` |
| `luksdkmodels.callbackmodels` | `callbackmodels` |