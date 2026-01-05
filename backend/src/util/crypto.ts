import * as crypto from 'crypto';

/**
 * SHA256 哈希
 */
export function sha256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * 密码加密
 */
export function hashPassword(password: string): string {
  return sha256(password);
}

/**
 * 验证密码
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * 生成随机字符串
 */
export function generateRandomString(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * HMAC-SHA256 签名
 */
export function hmacSha256(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * 生成 HMAC 签名（用于 Filez 集成）
 */
export function generateHmac(params: Record<string, any>, secret: string): string {
  // 按照 key 排序
  const sortedKeys = Object.keys(params).sort();
  
  // 拼接参数
  const paramString = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // 生成 HMAC
  return hmacSha256(paramString, secret);
}

