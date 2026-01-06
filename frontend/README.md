# Filez Demo Frontend

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

## 默认账号

- 用户名: `admin`
- 密码: `zOffice`

## 环境变量

项目根目录的 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 项目结构

```
src/
├── api/             # API 接口
├── config/          # 配置
├── router/          # 路由配置
├── store/           # Pinia 状态管理
├── utils/           # 工具函数
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 应用入口
```

## 功能特性

- ✅ 用户登录/登出
- ✅ 文件上传（单文件/批量）
- ✅ 文件下载
- ✅ 文件删除（单文件/批量）
- ✅ 文件列表查看
- ✅ 新建文档（Word/Excel/PowerPoint）
- ✅ 用户信息管理
- ✅ 密码修改

## 生产部署

### 构建

```bash
npm run build
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
