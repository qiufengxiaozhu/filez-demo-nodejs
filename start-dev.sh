#!/bin/bash

echo "========================================"
echo "  Filez Demo - 开发环境启动脚本"
echo "========================================"
echo ""

echo "[1/4] 检查 Node.js 环境..."
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js 16+"
    exit 1
fi
echo "✅ Node.js 环境正常"

echo ""
echo "[2/4] 检查后端依赖..."
if [ ! -d "backend/node_modules" ]; then
    echo "📦 首次运行，正在安装后端依赖..."
    cd backend
    npm install
    cd ..
else
    echo "✅ 后端依赖已安装"
fi

echo ""
echo "[3/4] 检查前端依赖..."
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 首次运行，正在安装前端依赖..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ 前端依赖已安装"
fi

echo ""
echo "[4/4] 初始化数据库..."
if [ ! -d "backend/data" ]; then
    echo "📊 首次运行，正在初始化数据库..."
    cd backend
    npm run prisma:generate
    npm run prisma:push
    npm run prisma:seed
    cd ..
else
    echo "✅ 数据库已初始化"
fi

echo ""
echo "========================================"
echo "  准备启动服务..."
echo "========================================"
echo ""
echo "🚀 后端服务: http://localhost:3000"
echo "🌐 前端服务: http://localhost:5173"
echo ""
echo "默认账号:"
echo "  用户名: admin"
echo "  密码: zOffice"
echo ""
echo "按 Ctrl+C 可以停止服务"
echo "========================================"
echo ""

# 启动后端
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# 等待 3 秒
sleep 3

# 启动前端
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ 服务启动完成！"
echo ""
echo "后端 PID: $BACKEND_PID"
echo "前端 PID: $FRONTEND_PID"
echo ""
echo "请等待几秒钟，然后访问: http://localhost:5173"
echo ""

# 等待用户中断
trap "echo ''; echo '正在停止服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '服务已停止'; exit 0" INT

wait

