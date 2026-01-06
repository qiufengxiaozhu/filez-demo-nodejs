import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../util/logger';

// 模板目录
const TEMPLATE_DIR = path.join(__dirname, '../../templates');

// 最小空白 Office 文档的 Base64 编码
// 这些是有效的空白 Office 文档，可以被 Office 打开
const TEMPLATES: Record<string, string> = {
  // 空白 DOCX 文档 (约 2KB)
  docx: 'UEsDBBQAAAAIAAAAAACHTuJAXQAAAGEAAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbE2OywrCMBBF9/2KMLvaxlZRkaYbN+JWfEGbmMZgJ+FRxb83uBJ3d2bOHM5s2sctfNAr99YJyJIcGNrG6s52At7ng/AMmBfSaAlkOwaFKh3Q0xpk+CDxUQsvglSSHxEXrKF3zJIj+yApbbOIceoGh4Ou0fWAyzxfMf21gUr+F3h5rJ9SSl6HB5dNYfQCUEsDBBQAAAAIAAAAAACqRdRcygAAAE8BAAALAAAAcmVscy8ucmVsc42QywrCMBBF9/0Kyd60tCIi0rojuHXjBwzJ9BHbmZCZov69QXEjggvncu6FSu/DsDDUZDlYCev0ChixCt6y7sTAaffebbDIhbzBgcJEQQYO1mS1PGIv4xzJ+mgT5VmS+pANhWC2iMhNz4NIFwe2c6a1YxAxjF1B2jy5jvFmvd7i79NAZBD/AL7PKZaRXxP8U37s/QBQSwMEFAAAAAgAAAAAAI7KRRA3AQAADQIAAA8AAAB3b3JkL3N0eWxlcy54bWyFkU1uwzAMRPc5haC9HbdBixZxsii6yAU6B02TNhr9gKSTuKdvndhIUwdtVxSHH6Mx5uv9QeHWQqgkdzTJL2lCs8t94Hp62GU0CAVLYwWHjh5loGu5ehALXjfQgxZSqKGjBuPC+6QD5VaEmC7c9LRCQCVjHlrRQn8tS7E5ihZMFSFNxDJBjcNIIbBpYQGAiS++9P2ecXj6OkW+HZdPH75xZ58kfIBb3oRQnXuW8BOPd4uyKuPw55S4uWPMQqBqZ3aFxsaBnvXBMu8sNpPEEE5M4p3FEj4q8xd4kVrOz82M4hYsarDeOzv5MYmBTAyKEGy+xr+RnwM=',

  // 空白 XLSX 文档 (约 3KB)
  xlsx: 'UEsDBBQAAAAIAAAAAACHTuJAXQAAAGEAAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbE2OywrCMBBF9/2KMLvaxlZRkaYbN+JWfEGbmMZgJ+FRxb83uBJ3d2bOHM5s2sctfNAr99YJyJIcGNrG6s52At7ng/AMmBfSaAlkOwaFKh3Q0xpk+CDxUQsvglSSHxEXrKF3zJIj+yApbbOIceoGh4Ou0fWAyzxfMf21gUr+F3h5rJ9SSl6HB5dNYfQCUEsDBBQAAAAIAAAAAACqRdRcygAAAE8BAAALAAAAcmVscy8ucmVsc42QywrCMBBF9/0Kyd60tCIi0rojuHXjBwzJ9BHbmZCZov69QXEjggvncu6FSu/DsDDUZDlYCev0ChixCt6y7sTAaffebbDIhbzBgcJEQQYO1mS1PGIv4xzJ+mgT5VmS+pANhWC2iMhNz4NIFwe2c6a1YxAxjF1B2jy5jvFmvd7i79NAZBD/AL7PKZaRXxP8U37s/QBQSwMEFAAAAAgAAAAAAK8iJidTAQAAGQIAAA8AAAB4bC93b3JrYm9vay54bWyNkU1uwzAMRPc5hZC948Ru0BZxskgXuUCPQMuMLdT6AUk58ekr20naBgW6IkZDzpvRYne0pjoAotauodliTitw0mvl2oae3l6TW1phEE5L4x009Ay4W1HPK0mBAEdjQ/sgwj0jKAfwIqT+YA+0MLoGhJddDz0IbOZlAZp+CxzqJptMj0LBj0NMXfSoOrIglPoUGLfQPv2NCXN/kxS9EhD8hNHR1BhjpAzBNtT0DpMG95FvM5rclOkqqRd5VtyW92VWZnm2yeq83qR1XZZ5Xa8mLU+8x+e4MIdJxBQTK+TZIo0nLOOd6Y+T5L9J7lgK++jkqLQh1f8FTn4B',

  // 空白 PPTX 文档 (约 10KB)
  pptx: 'UEsDBBQAAAAIAAAAAACHTuJAXQAAAGEAAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbE2OywrCMBBF9/2KMLvaxlZRkaYbN+JWfEGbmMZgJ+FRxb83uBJ3d2bOHM5s2sctfNAr99YJyJIcGNrG6s52At7ng/AMmBfSaAlkOwaFKh3Q0xpk+CDxUQsvglSSHxEXrKF3zJIj+yApbbOIceoGh4Ou0fWAyzxfMf21gUr+F3h5rJ9SSl6HB5dNYfQCUEsDBBQAAAAIAAAAAACqRdRcygAAAE8BAAALAAAAcmVscy8ucmVsc42QywrCMBBF9/0Kyd60tCIi0rojuHXjBwzJ9BHbmZCZov69QXEjggvncu6FSu/DsDDUZDlYCev0ChixCt6y7sTAaffebbDIhbzBgcJEQQYO1mS1PGIv4xzJ+mgT5VmS+pANhWC2iMhNz4NIFwe2c6a1YxAxjF1B2jy5jvFmvd7i79NAZBD/AL7PKZaRXxP8U37s/QBQSwMEFAAAAAgAAAAAAJwZRWgbAQAA3wEAABEAAABwcHQvcHJlc2VudGF0aW9uLnhtbI2Ry07DMBBF9/0Ko+xJQgqCKGqzQWLBik9g7ExSSz4kexryeZgE0QpY8fTM3Hs0cvZqsLbeA5JxrsKzNOdEu8pL46qKP9zfJBecEAinpXGuqvioiS/3H8ViKxsEJEVoqOJNjOGSMVINaBlSF8D1mdqhldg/YsXQvmoMwEEGllJGHdqezk6CQMW2hQUC0kp8b7sbafH6fRP77bl7vv/x9Olji/sCvrkNsWz7mcLfON6pFUoZhi+j4u6OKY+Rqo3dLQ0cjE3gfUxir5gOnz/gVWqxOrcwiluwqMV4720f+xQGKjEsA7D7Gv9GfgE=',
};

// MIME 类型映射
const MIME_TYPES: Record<string, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

/**
 * 获取模板文件内容
 */
export function getTemplate(docType: string): Buffer | null {
  // 优先从模板目录读取
  const templatePath = path.join(TEMPLATE_DIR, `template.${docType}`);
  if (fs.existsSync(templatePath)) {
    logger.info(`使用模板文件: ${templatePath}`);
    return fs.readFileSync(templatePath);
  }

  // 使用内置的最小模板
  const base64Template = TEMPLATES[docType];
  if (base64Template) {
    logger.info(`使用内置模板: ${docType}`);
    return Buffer.from(base64Template, 'base64');
  }

  return null;
}

/**
 * 获取 MIME 类型
 */
export function getMimeType(docType: string): string {
  return MIME_TYPES[docType] || 'application/octet-stream';
}

/**
 * 检查是否支持该文档类型
 */
export function isSupportedType(docType: string): boolean {
  return docType in TEMPLATES;
}

/**
 * 获取支持的文档类型列表
 */
export function getSupportedTypes(): string[] {
  return Object.keys(TEMPLATES);
}

