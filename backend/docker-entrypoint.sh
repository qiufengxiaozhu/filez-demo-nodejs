#!/bin/sh
set -e

# 初始化数据库（如果需要）
if [ ! -f "/app/data/filez_demo.db" ]; then
  echo "🔧 初始化数据库..."
  node dist/src/database/Seed.js || true
fi

# 启动应用
echo "🚀 启动服务..."
exec node dist/src/app.js

