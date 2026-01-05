import request from './request';

export interface DocMeta {
  id: string;
  name: string;
  path: string;
  size: number;
  extension: string;
  mimeType?: string;
  version: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  modifiedAt?: string;
  createdBy?: {
    id: string;
    username: string;
    email: string;
    nickname?: string;
  };
  owner?: {
    id: string;
    username: string;
    email: string;
    nickname?: string;
  };
}

/**
 * 上传文件
 */
export function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request.post<any, DocMeta>('/api/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 批量上传文件
 */
export function batchUploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  return request.post<any, string[]>('/api/file/batch-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 下载文件
 */
export function downloadFile(docId: string, download: boolean = true) {
  return request.get(`/api/file/download/${docId}`, {
    params: { download },
    responseType: 'blob',
  });
}

/**
 * 删除文件
 */
export function deleteFile(docId: string) {
  return request.delete<any, DocMeta>(`/api/file/delete/${docId}`);
}

/**
 * 批量删除文件
 */
export function batchDeleteFiles(fileIds: string[]) {
  return request.post<any, string[]>('/api/file/batch-delete', { fileIds });
}

/**
 * 新建文件
 */
export function newFile(docType: string, filename?: string) {
  return request.post<any, DocMeta>('/api/file/new', { docType, filename });
}

/**
 * 获取文件列表
 */
export function getFileList() {
  return request.get<any, DocMeta[]>('/api/file/list');
}

