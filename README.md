# Filez Demo - Node.js 版本

## 项目简介

Filez Demo 是一个基于 Node.js 的文档管理集成示例项目，采用前后端分离架构，主要用于演示如何与 Filez 文档中台进行集成。项目提供了完整的文档上传、下载、编辑、预览、对比等功能。

> 📖 **快速开始？** 请查看 [start.md](./start.md) 获取详细的启动指南！

## 🚀 一键启动（推荐）

### Windows 用户
双击运行 `start-dev.bat` 文件，或在命令行中执行：
```bash
start-dev.bat
```

### Mac/Linux 用户
在终端中执行：
```bash
chmod +x start-dev.sh
./start-dev.sh
```

脚本会自动：
1. ✅ 检查 Node.js 环境
2. 📦 安装依赖（如果需要）
3. 📊 初始化数据库（如果需要）
4. 🚀 启动前后端服务

启动完成后，访问 **http://localhost:5173** 即可使用！

**默认账号：**
- 用户名：`admin`
- 密码：`zOffice`

## 核心功能

### 🔐 用户认证系统
- 用户登录/登出
- JWT Token 认证
- Session 管理

### 📁 文档管理功能
- 文件上传（单文件/批量）
- 文件下载
- 文件删除（单文件/批量）
- 文件列表查询
- 新建文档

### 📝 文档集成功能
- 文档在线编辑
- 文档预览
- 文档元数据管理
- 文档权限控制
- 文档对比

### 🔧 系统管理功能
- 用户信息管理
- 文档控制配置
- 操作日志记录

## 技术架构

### 后端技术栈
- **框架**: Koa 2.x + TypeScript
- **数据库**: SQLite (内嵌数据库，无需额外安装)
- **ORM**: Prisma
- **认证**: JWT + koa-session
- **文件上传**: @koa/multer
- **API文档**: Swagger (koa-swagger-decorator)
- **HTTP客户端**: axios

### 前端技术栈
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI框架**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **HTTP客户端**: axios

### 项目结构
```
filez-demo-nodejs/
├── backend/                    # 后端项目
│   ├── src/
│   │   ├── config/            # 配置文件
│   │   ├── controllers/       # 控制器
│   │   ├── services/          # 业务逻辑
│   │   ├── middlewares/       # 中间件
│   │   ├── models/            # 数据模型
│   │   ├── utils/             # 工具类
│   │   ├── routes/            # 路由定义
│   │   ├── prisma/            # Prisma schema
│   │   └── app.ts             # 应用入口
│   ├── uploads/               # 文件上传目录
│   └── data/                  # SQLite数据库
│
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── views/             # 页面组件
│   │   ├── components/        # 通用组件
│   │   ├── router/            # 路由配置
│   │   ├── store/             # Pinia状态管理
│   │   ├── api/               # API接口
│   │   └── utils/             # 工具函数
│   └── public/                # 静态资源
│
└── README.md
```

## 快速开始

### 环境要求
- Node.js 16+ 或更高版本
- npm 或 pnpm

### 安装依赖

#### 后端
```bash
cd backend
npm install
# 或
pnpm install
```

#### 前端
```bash
cd frontend
npm install
# 或
pnpm install
```

### 初始化数据库

```bash
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 启动开发服务器

#### 启动后端（默认端口：3000）
```bash
cd backend
npm run dev
```

#### 启动前端（默认端口：5173）
```bash
cd frontend
npm run dev
```

### 访问应用

启动成功后，可通过以下地址访问：

- **前端应用**: http://localhost:5173
- **后端API**: http://localhost:3000
- **API文档**: http://localhost:3000/swagger

默认登录账号：
- 用户名: `admin`
- 密码: `zOffice`

## API 接口文档

### 认证相关接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/profile` - 获取当前用户信息

### 文件管理接口
- `POST /api/file/upload` - 上传文件
- `POST /api/file/batch-upload` - 批量上传文件
- `GET /api/file/download/:docId` - 下载文件
- `DELETE /api/file/delete/:docId` - 删除文件
- `POST /api/file/batch-delete` - 批量删除文件
- `POST /api/file/new` - 新建文件
- `GET /api/file/list` - 获取文件列表

### 文档元数据接口
- `GET /api/doc/:docId/meta` - 获取文档元数据
- `PUT /api/doc/:docId/meta` - 更新文档元数据
- `GET /api/doc/:docId/content` - 获取文档内容
- `POST /api/doc/:docId/content` - 上传文档内容

### 文档控制接口
- `GET /api/doc/:docId/control` - 获取文档控制配置
- `PUT /api/doc/:docId/control` - 更新文档控制配置

### 用户管理接口
- `GET /api/user/:userId` - 获取用户信息
- `PUT /api/user/:userId` - 更新用户信息

## 配置说明

### 后端配置

创建 `backend/.env` 文件：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DATABASE_URL="file:./data/filez_demo.db"

# JWT配置
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Session配置
SESSION_SECRET=your-session-secret

# 文件上传配置
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=524288000

# Filez服务配置（可选）
FILEZ_HOST=172.16.34.165
FILEZ_PORT=8001
FILEZ_REPO_ID=3rd-party
```

### 前端配置

创建 `frontend/.env.development` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 生产环境部署

### 后端构建
```bash
cd backend
npm run build
npm run start
```

### 前端构建
```bash
cd frontend
npm run build
```

构建产物在 `frontend/dist` 目录，可以部署到任何静态服务器（Nginx、Apache等）。

### 使用 PM2 部署后端
```bash
cd backend
npm install -g pm2
pm2 start dist/app.js --name filez-demo-backend
```

## 开发指南

### 后端开发
- 使用 TypeScript 进行开发
- 遵循 RESTful API 设计规范
- 使用 Prisma 进行数据库操作
- 使用中间件处理认证、日志等横切关注点

### 前端开发
- 使用 Vue 3 Composition API
- 使用 TypeScript 进行类型检查
- 使用 Element Plus 组件库
- 使用 Pinia 进行状态管理

## 技术支持

如有问题，请通过以下方式联系：
- 提交 Issue
- 发送邮件至技术支持邮箱

---

**注意**: 本项目是一个集成示例，实际使用时请根据具体业务需求进行相应的修改和优化。

