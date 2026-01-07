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
# 构建并启动（默认端口 8000）
docker compose up -d --build

# 自定义端口
PORT=9000 docker compose up -d --build

# 查看日志
docker compose logs -f

# 停止服务
docker compose down

# 重新构建
docker compose up -d --build --force-recreate

# 停止并重启
docker compose down && docker compose up -d

# 进入容器
docker exec -it filez-demo-nodejs sh
```

访问: http://localhost:8000

### 手动构建镜像

```bash
# 构建镜像
docker build -t filez-demo-nodejs .

# 运行容器
docker run -d -p 8000:8000 \
  -v filez-data:/app/data \
  -v filez-uploads:/app/uploads \
  --name filez-demo-nodejs filez-demo-nodejs

# 自定义端口
docker run -d -p 9000:9000 -e PORT=9000 \
  -v filez-data:/app/data \
  -v filez-uploads:/app/uploads \
  --name filez-demo-nodejs filez-demo-nodejs
```

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

