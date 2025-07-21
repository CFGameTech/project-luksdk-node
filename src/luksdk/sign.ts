import crypto from 'crypto';

interface Params {
    [key: string]: any;
}

// 生成签名
export function signature(signSecret: string, params: any): string {
    const paramsMap = castToSignatureParams(params);
    return generateSignature(signSecret, paramsMap);
}

// 生成签名
function generateSignature(signSecret: string, params: Record<string, string>): string {
    // 提取并排序参数键
    const keys = Object.keys(params).sort();

    // 构建签名字符串
    const signatureBuilder: string[] = [];
    for (const k of keys) {
        const value = params[k];
        if (value !== '') {
            signatureBuilder.push(`${k}=${value}`);
        }
    }

    // 删除末尾的 '&' 并拼接密钥
    const signatureString = signatureBuilder.join('&') + `&key=${signSecret}`;

    // 生成 MD5 哈希并将结果转换为大写
    const hash = crypto.createHash('md5').update(signatureString).digest('hex');

    return hash.toUpperCase();
}

// 将参数转换为签名参数
function castToSignatureParams(obj: any): Record<string, string> {
    const result: Record<string, string> = {};

    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            result[key] = String(value);
        });
    } else {
        // 遍历对象的键值对
        Object.keys(obj).forEach(key => {
            if (key !== 'sign' && obj[key] !== undefined && obj[key] !== null) {
                // 类型检查
                switch (typeof obj[key]) {
                    case 'bigint':
                        if (obj[key].toString() === '0') return;
                        break;
                    case 'string':
                        if (obj[key].length === 0) return;
                        break;
                    case 'number':
                        if (isNaN(obj[key]) || obj[key] === 0) return;
                        break;
                    case 'boolean':
                        if (!obj[key]) return;
                        break;
                    default:
                        return;
                }
                result[key] = String(obj[key]);
            }
        });
    }

    return result;
}