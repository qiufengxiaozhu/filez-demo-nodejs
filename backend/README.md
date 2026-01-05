# Filez Demo Backend

基于 Node.js + Koa + TypeORM + TypeScript 的文档管理系统后端。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化数据库

```bash
npm run seed
```

这将创建默认用户账号：
- 管理员: `admin` / `zOffice`
- 测试用户: `test` / `test123`
- 共享用户: `share` / `share123`

### 3. 启动服务

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

## 项目结构

```
src/
├── app.ts              # 应用入口
├── config/             # 配置
│   └── AppConfig.ts
├── controller/         # 控制器（处理 HTTP 请求）
│   ├── AuthController.ts
│   ├── DocController.ts
│   ├── FileController.ts
│   └── UserController.ts
├── dao/                # 数据访问层（数据库操作）
│   ├── userDao.ts
│   └── docDao.ts
├── database/           # 数据库连接与初始化
│   ├── DataSource.ts
│   └── Seed.ts
├── entity/             # 实体定义
│   ├── SysUser.ts
│   ├── DocMeta.ts
│   └── DocControl.ts
├── middleware/         # 中间件
│   ├── auth.ts
│   ├── error.ts
│   └── logger.ts
├── route/              # 路由定义
│   ├── authRoute.ts
│   ├── docRoute.ts
│   ├── fileRoute.ts
│   └── userRoute.ts
├── service/            # 业务逻辑层
│   ├── userService.ts
│   └── docService.ts
└── util/               # 工具函数
    ├── crypto.ts
    ├── jwt.ts
    ├── logger.ts
    └── response.ts
```

## 技术栈

- **框架**: Koa.js
- **语言**: TypeScript
- **ORM**: TypeORM
- **数据库**: SQLite
- **认证**: JWT

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run seed` | 初始化数据库 |

## API 端点

### 认证 `/api/auth`

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/login` | 用户登录 |
| POST | `/logout` | 用户登出 |
| GET | `/profile` | 获取当前用户信息 |
| GET | `/profiles` | 获取用户列表 |

### 文件 `/api/file`

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/list` | 获取文件列表 |
| POST | `/upload` | 上传文件 |
| POST | `/batch-upload` | 批量上传 |
| GET | `/download/:docId` | 下载文件 |
| DELETE | `/delete/:docId` | 删除文件 |
| POST | `/batch-delete` | 批量删除 |
| POST | `/new` | 新建文件 |

### 文档 `/api/doc`

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/:docId/meta` | 获取文档元数据 |
| PUT | `/:docId/meta` | 更新文档元数据 |
| GET | `/:docId/content` | 获取文档内容 |
| POST | `/:docId/content` | 上传文档内容 |
| GET | `/:docId/control` | 获取文档控制配置 |
| PUT | `/:docId/control` | 更新文档控制配置 |
| POST | `/:docId/notify` | 文档通知回调 |
| POST | `/:docId/mention` | 批注通知回调 |

### 用户 `/api/user`

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/` | 获取所有用户（管理员） |
| GET | `/:userId` | 获取用户信息 |
| PUT | `/:userId` | 更新用户信息 |
| POST | `/:userId/password` | 修改密码 |

## 认证方式

支持三种方式传递 Token：

```bash
# 1. Header
Authorization: Bearer <token>

# 2. Cookie
# 登录后自动设置

# 3. Query
?token=<token>
```

## 环境变量

可通过环境变量覆盖配置：

```bash
SERVER_PORT=3000
DATABASE_URL=file:./data/filez_demo.db
JWT_SECRET=your_secret_key
```

## 许可证

MIT License
