@echo off
chcp 65001 >nul
echo ========================================
echo   Filez Demo - 开发环境启动脚本
echo ========================================
echo.

echo [1/4] 检查 Node.js 环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到 Node.js，请先安装 Node.js 16+
    pause
    exit /b 1
)
echo ✅ Node.js 环境正常

echo.
echo [2/4] 检查后端依赖...
if not exist "backend\node_modules" (
    echo 📦 首次运行，正在安装后端依赖...
    cd backend
    call npm install
    cd ..
) else (
    echo ✅ 后端依赖已安装
)

echo.
echo [3/4] 检查前端依赖...
if not exist "frontend\node_modules" (
    echo 📦 首次运行，正在安装前端依赖...
    cd frontend
    call npm install
    cd ..
) else (
    echo ✅ 前端依赖已安装
)

echo.
echo [4/4] 初始化数据库...
if not exist "backend\data" (
    echo 📊 首次运行，正在初始化数据库...
    cd backend
    call npm run prisma:generate
    call npm run prisma:push
    call npm run prisma:seed
    cd ..
) else (
    echo ✅ 数据库已初始化
)

echo.
echo ========================================
echo   准备启动服务...
echo ========================================
echo.
echo 🚀 后端服务: http://localhost:3000
echo 🌐 前端服务: http://localhost:5173
echo.
echo 默认账号:
echo   用户名: admin
echo   密码: zOffice
echo.
echo 按 Ctrl+C 可以停止服务
echo ========================================
echo.

:: 启动后端（新窗口）
start "Filez Demo - Backend" cmd /k "cd backend && npm run dev"

:: 等待 3 秒
timeout /t 3 /nobreak >nul

:: 启动前端（新窗口）
start "Filez Demo - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ 服务启动完成！
echo.
echo 请等待几秒钟，然后访问: http://localhost:5173
echo.
pause

