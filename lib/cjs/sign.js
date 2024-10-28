"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signature = signature;
const crypto_1 = __importDefault(require("crypto"));
function signature(signSecret, params) {
    const paramsMap = castToSignatureParams(params);
    return generateSignature(signSecret, paramsMap);
}
function generateSignature(signSecret, params) {
    // 提取并排序参数键
    const keys = Object.keys(params).sort();
    // 构建签名字符串
    const signatureString = keys
        .filter(key => params[key] !== "")
        .map(key => `${key}=${params[key]}`)
        .join('&') + `&key=${signSecret}`;
    // 生成 MD5 哈希并转换为大写
    return crypto_1.default.createHash('md5').update(signatureString).digest('hex').toUpperCase();
}
function castToSignatureParams(obj) {
    const result = {};
    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            result[key] = String(value);
        });
    }
    else {
        // 遍历对象的键值对
        Object.keys(obj).forEach(key => {
            if (key !== 'sign' && obj[key] !== undefined && obj[key] !== null) {
                // 类型断言
                switch (typeof obj[key]) {
                    case "bigint":
                        if (obj[key].toString() === "0")
                            return;
                        break;
                    case 'string':
                        if (obj[key].length === 0)
                            return;
                        break;
                    case 'number':
                        if (isNaN(obj[key]) || obj[key] === 0)
                            return;
                        break;
                    case 'boolean':
                        if (!obj[key])
                            return;
                        break;
                }
                result[key] = String(obj[key]);
            }
        });
    }
    return result;
}
