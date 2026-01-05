import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as docDao from '../dao/docDao';
import { DocMeta, DocControl } from '../entity';
import { appConfig as config } from '../config/AppConfig';
import { logger } from '../util/logger';

const uploadDir = config.upload.dir;

// 确保上传目录存在
function ensureUploadDir(): void {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    logger.info(`创建上传目录: ${uploadDir}`);
  }
}

// 初始化时确保目录存在
ensureUploadDir();

/**
 * 获取文件存储路径
 */
function getFilePath(docId: string): string {
  return path.join(uploadDir, docId);
}

/**
 * 创建文档元数据
 */
export async function createDocMeta(data: { name: string; path?: string; extension: string; mimeType?: string; createdById?: string; ownerId?: string; }): Promise<DocMeta> {
  return docDao.createDoc({
    id: uuidv4(),
    ...data,
    path: data.path || '',
  });
}

/**
 * 根据ID查找文档
 */
export async function findById(id: string): Promise<DocMeta | null> {
  return docDao.findById(id);
}

/**
 * 根据名称查找文档
 */
export async function findByName(name: string): Promise<DocMeta | null> {
  return docDao.findByName(name);
}

/**
 * 获取文档列表
 */
export async function listDocs(userId?: string): Promise<DocMeta[]> {
  return docDao.findDocs(userId);
}

/**
 * 上传文件
 */
export async function uploadFile(docId: string, fileBuffer: Buffer, size: number): Promise<DocMeta | null> {
  const doc = await findById(docId);
  if (!doc) {
    return null;
  }

  const filePath = getFilePath(docId);
  fs.writeFileSync(filePath, fileBuffer);

  await docDao.updateDoc(docId, {
    size,
    modifiedAt: new Date(),
  });

  return findById(docId);
}

/**
 * 获取文件内容
 */
export async function getFileContent(docId: string): Promise<Buffer | null> {
  const filePath = getFilePath(docId);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath);
}

/**
 * 删除文档
 */
export async function deleteDoc(docId: string): Promise<DocMeta | null> {
  const doc = await findById(docId);
  if (!doc) {
    return null;
  }

  // 软删除
  await docDao.updateDoc(docId, { isDeleted: true });

  // 删除物理文件
  const filePath = getFilePath(docId);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return findById(docId);
}

/**
 * 更新文档元数据
 */
export async function updateDocMeta(
  docId: string,
  data: {
    name?: string;
    path?: string;
    modifiedAt?: Date;
  }
): Promise<DocMeta> {
  await docDao.updateDoc(docId, data);
  const doc = await findById(docId);
  if (!doc) {
    throw new Error('Document not found');
  }
  return doc;
}

/**
 * 获取文档控制配置
 */
export async function getDocControl(userId: string, docId: string): Promise<DocControl | null> {
  return docDao.findControl(userId, docId);
}

/**
 * 创建或更新文档控制配置
 */
export async function upsertDocControl(
  userId: string,
  docId: string,
  data: {
    canEdit?: boolean;
    canDownload?: boolean;
    canPrint?: boolean;
    canCopy?: boolean;
    canComment?: boolean;
    canShare?: boolean;
    watermarkEnabled?: boolean;
    watermarkText?: string;
    watermarkType?: string;
    extensions?: string;
  }
): Promise<DocControl> {
  const existing = await getDocControl(userId, docId);
  
  if (existing) {
    await docDao.updateControl(existing.id, data);
    return docDao.findControlById(existing.id) as Promise<DocControl>;
  } else {
    return docDao.createControl({ userId, docId, ...data });
  }
}

/**
 * 检查用户是否有权限访问文档
 */
export async function checkAccess(userId: string, docId: string): Promise<boolean> {
  const doc = await findById(docId);
  if (!doc) {
    return false;
  }

  // 管理员和共享用户可以访问所有文档
  if (userId === 'admin' || userId === 'share') {
    return true;
  }

  // 文档创建者和所有者可以访问
  if (doc.createdById === userId || doc.ownerId === userId) {
    return true;
  }

  // 共享文档可以访问
  if (doc.createdById === 'share' || doc.ownerId === 'share') {
    return true;
  }

  return false;
}

