# Filez Demo

ZOffice 文档管理集成演示项目，包含前后端完整实现。

## 项目结构

```
filez-demo-nodejs/
├── backend/          # 后端服务 (Node.js + Koa + TypeScript)
├── frontend/         # 前端应用 (Vue 3 + TypeScript + Element Plus)
├── docker-compose.yml
└── Dockerfile
```

## 快速开始

### Docker 部署（推荐）

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

访问: http://localhost:8000

### 本地开发

```bash
# 后端
cd backend
npm install
npm run seed
npm run dev

# 前端（新终端）
cd frontend
npm install
npm run dev
```

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| PORT | 服务端口 | 8000 |
| NODE_ENV | 环境 | production |

## 默认账号

- 用户名: `admin`
- 密码: `zOffice`

