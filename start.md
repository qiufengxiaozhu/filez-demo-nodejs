# Filez Demo Node.js 版本 - 快速启动指南

## 📦 项目概述

这是一个基于 Node.js + Vue 3 的文档管理系统，采用前后端分离架构。

**技术栈：**
- 后端：Koa + TypeScript + Prisma + SQLite
- 前端：Vue 3 + Vite + TypeScript + Element Plus + Pinia

## 🚀 快速启动（首次运行）

### 前置要求
- Node.js 16+ 
- npm 或 pnpm

### 第一步：启动后端

```bash
# 1. 进入后端目录
cd backend

# 2. 安装依赖
npm install

# 3. 初始化数据库
npm run prisma:generate
npm run prisma:push
npm run prisma:seed

# 4. 启动后端服务
npm run dev
```

后端将在 **http://localhost:3000** 启动

### 第二步：启动前端

打开新的终端窗口：

```bash
# 1. 进入前端目录
cd frontend

# 2. 安装依赖
npm install

# 3. 启动前端服务
npm run dev
```

前端将在 **http://localhost:5173** 启动

### 第三步：访问应用

打开浏览器访问：**http://localhost:5173**

**默认账号：**
- 用户名：`admin`
- 密码：`zOffice`

---

## 📋 功能清单

### ✅ 已实现功能

1. **用户认证**
   - 用户登录/登出
   - JWT Token 认证
   - Session 管理

2. **文件管理**
   - 单文件上传
   - 批量文件上传
   - 文件下载
   - 单文件删除
   - 批量文件删除
   - 文件列表查看

3. **文档管理**
   - 新建文档（Word/Excel/PowerPoint）
   - 文档元数据管理
   - 文档权限控制配置

4. **用户管理**
   - 查看用户信息
   - 修改用户信息
   - 修改密码

### 🚧 待实现功能

1. **Swagger API 文档**（可选）
2. **文档在线编辑预览**（需要集成 Filez 服务）
3. **文档对比功能**
4. **文档批注功能**

---

## 📁 项目结构

```
filez-demo-nodejs/
├── backend/                    # 后端项目
│   ├── src/
│   │   ├── config/            # 配置文件
│   │   ├── controllers/       # 控制器
│   │   ├── services/          # 业务逻辑
│   │   ├── middlewares/       # 中间件
│   │   ├── routes/            # 路由
│   │   ├── utils/             # 工具函数
│   │   └── app.ts             # 应用入口
│   ├── prisma/
│   │   ├── schema.prisma      # 数据库模型
│   │   └── Seed.ts            # 数据初始化
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── api/               # API 接口
│   │   ├── components/        # 通用组件
│   │   ├── router/            # 路由配置
│   │   ├── store/             # Pinia 状态管理
│   │   ├── views/             # 页面组件
│   │   ├── App.vue
│   │   └── main.ts
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md
```

---

## 🔧 常见问题

### 1. 端口被占用

如果 3000 或 5173 端口被占用，可以修改：

**后端端口：** 修改 `backend/.env` 中的 `PORT`
**前端端口：** 修改 `frontend/vite.config.ts` 中的 `server.port`

### 2. 数据库初始化失败

删除 `backend/data` 目录，重新执行：

```bash
cd backend
npm run prisma:push
npm run prisma:seed
```

### 3. 前端无法连接后端

检查 `frontend/.env.development` 中的 `VITE_API_BASE_URL` 是否正确

### 4. 文件上传失败

确保 `backend/uploads` 目录存在且有写入权限

---

## 🔐 API 接口

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/profile` - 获取当前用户信息

### 文件接口
- `POST /api/file/upload` - 上传文件
- `POST /api/file/batch-upload` - 批量上传
- `GET /api/file/download/:docId` - 下载文件
- `DELETE /api/file/delete/:docId` - 删除文件
- `POST /api/file/batch-delete` - 批量删除
- `POST /api/file/new` - 新建文档
- `GET /api/file/list` - 获取文件列表

### 文档接口
- `GET /api/doc/:docId/meta` - 获取文档元数据
- `PUT /api/doc/:docId/meta` - 更新文档元数据
- `GET /api/doc/:docId/content` - 获取文档内容
- `POST /api/doc/:docId/content` - 上传文档内容
- `GET /api/doc/:docId/control` - 获取文档控制配置
- `PUT /api/doc/:docId/control` - 更新文档控制配置

### 用户接口
- `GET /api/user/:userId` - 获取用户信息
- `PUT /api/user/:userId` - 更新用户信息
- `POST /api/user/:userId/password` - 修改密码

---

## 🎯 与 Java 版本的对比

| 功能 | Java 版本 | Node.js 版本 | 说明 |
|------|-----------|--------------|------|
| 架构 | 单体应用（MVC） | 前后端分离 | Node.js 版本更现代化 |
| 模板引擎 | FreeMarker | Vue 3 | 前端使用 Vue 组件 |
| 数据库 | SQLite + MyBatis Plus | SQLite + Prisma | ORM 框架不同 |
| 认证 | JWT + Session | JWT + Session | 认证方式相同 |
| 文件上传 | MultipartFile | multer | 实现方式不同 |
| API 文档 | Knife4j (Swagger) | 待实现 | 可选功能 |
| 部署方式 | 单一 JAR 包 | 前后端分别部署 | 部署方式不同 |

---

## 📝 开发说明

### 后端开发

```bash
cd backend
npm run dev  # 开发模式（热重载）
npm run build  # 构建生产版本
npm run start  # 启动生产版本
```

### 前端开发

```bash
cd frontend
npm run dev  # 开发模式（热重载）
npm run build  # 构建生产版本
npm run preview  # 预览生产版本
```

### 数据库管理

```bash
cd backend
npm run prisma:studio  # 打开 Prisma Studio（数据库可视化工具）
```

---

## 🚀 生产环境部署

### 后端部署

```bash
cd backend
npm run build
pm2 start dist/app.js --name filez-demo-backend
```

### 前端部署

```bash
cd frontend
npm run build
# 将 dist 目录部署到 Nginx/Apache 等静态服务器
```

---

## 📞 技术支持

如有问题，请查看：
- 后端 README: `backend/README.md`
- 前端 README: `frontend/README.md`
- 主 README: `README.md`

---

**祝使用愉快！** 🎉

