<template>
  <div class="files-container">
    <div class="files-header">
      <h2>文件列表</h2>
      <div class="header-actions">
        <el-upload
          ref="uploadRef"
          :action="uploadAction"
          :headers="uploadHeaders"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :show-file-list="false"
          :multiple="true"
          :before-upload="beforeUpload"
        >
          <el-button type="primary" :icon="Upload">上传文件</el-button>
        </el-upload>
        
        <el-dropdown @command="handleNewFile" style="margin-left: 10px;">
          <el-button type="success" :icon="Plus">
            新建文档
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="docx">Word 文档</el-dropdown-item>
              <el-dropdown-item command="xlsx">Excel 表格</el-dropdown-item>
              <el-dropdown-item command="pptx">PowerPoint 演示</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          v-if="fileStore.selectedFiles.length > 0"
          type="danger"
          :icon="Delete"
          @click="handleBatchDelete"
          style="margin-left: 10px;"
        >
          批量删除 ({{ fileStore.selectedFiles.length }})
        </el-button>

        <el-button
          :icon="Refresh"
          @click="refreshList"
          style="margin-left: 10px;"
        >
          刷新
        </el-button>
      </div>
    </div>

    <el-table
      v-loading="fileStore.loading"
      :data="fileStore.fileList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      
      <el-table-column prop="name" label="文件名" min-width="200">
        <template #default="{ row }">
          <div class="file-name">
            <el-icon :size="18" style="margin-right: 8px;">
              <Document />
            </el-icon>
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="size" label="大小" width="120">
        <template #default="{ row }">
          {{ formatFileSize(row.size) }}
        </template>
      </el-table-column>

      <el-table-column prop="createdBy" label="创建者" width="150">
        <template #default="{ row }">
          {{ row.createdBy?.nickname || row.createdBy?.username || '-' }}
        </template>
      </el-table-column>

      <el-table-column prop="modifiedAt" label="修改时间" width="180">
        <template #default="{ row }">
          {{ formatDate(row.modifiedAt || row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="View"
            @click="handleView(row)"
          >
            预览
          </el-button>
          <el-button
            type="success"
            size="small"
            :icon="Download"
            @click="handleDownload(row)"
          >
            下载
          </el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 空状态 -->
    <el-empty
      v-if="!fileStore.loading && fileStore.fileList.length === 0"
      description="暂无文件，请上传文件"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useFileStore } from '@/store/file';
import { uploadFile, downloadFile, deleteFile, batchDeleteFiles, newFile, type DocMeta } from '@/api/file';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  Upload,
  Plus,
  Delete,
  Refresh,
  View,
  Download,
  Document,
  ArrowDown,
} from '@element-plus/icons-vue';

const fileStore = useFileStore();

const uploadAction = computed(() => {
  return `${import.meta.env.VITE_API_BASE_URL}/api/file/upload`;
});

const uploadHeaders = computed(() => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
});

onMounted(() => {
  refreshList();
});

const refreshList = async () => {
  try {
    await fileStore.fetchFileList();
  } catch (error) {
    ElMessage.error('获取文件列表失败');
  }
};

const beforeUpload = (file: File) => {
  const maxSize = 500 * 1024 * 1024; // 500MB
  if (file.size > maxSize) {
    ElMessage.error('文件大小不能超过 500MB');
    return false;
  }
  return true;
};

const handleUploadSuccess = () => {
  ElMessage.success('上传成功');
  refreshList();
};

const handleUploadError = () => {
  ElMessage.error('上传失败');
};

const handleNewFile = async (docType: string) => {
  try {
    await newFile(docType);
    ElMessage.success('新建文档成功');
    refreshList();
  } catch (error) {
    ElMessage.error('新建文档失败');
  }
};

const handleSelectionChange = (selection: DocMeta[]) => {
  fileStore.selectedFiles = selection.map(item => item.id);
};

const handleView = (row: DocMeta) => {
  ElMessage.info('预览功能开发中...');
  // TODO: 实现预览功能
};

const handleDownload = async (row: DocMeta) => {
  try {
    const response = await downloadFile(row.id);
    
    // 创建下载链接
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', row.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    ElMessage.success('下载成功');
  } catch (error) {
    ElMessage.error('下载失败');
  }
};

const handleDelete = async (row: DocMeta) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除文件 "${row.name}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );

    await deleteFile(row.id);
    ElMessage.success('删除成功');
    refreshList();
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

const handleBatchDelete = async () => {
  if (fileStore.selectedFiles.length === 0) {
    ElMessage.warning('请选择要删除的文件');
    return;
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${fileStore.selectedFiles.length} 个文件吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );

    await batchDeleteFiles(fileStore.selectedFiles);
    ElMessage.success('批量删除成功');
    fileStore.clearSelection();
    refreshList();
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error('批量删除失败');
    }
  }
};

const formatFileSize = (size: number): string => {
  if (size === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return (size / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};

const formatDate = (date: string): string => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<style scoped>
.files-container {
  background: white;
  border-radius: 4px;
  padding: 20px;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.files-header h2 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
}

.file-name {
  display: flex;
  align-items: center;
}
</style>

