#!/bin/sh

# package.jsonが変更されている場合、依存関係をインストール
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ] || [ "package.json" -nt "node_modules/.package-lock.json" ]; then
  echo "Installing dependencies..."
  npm install
  cp package-lock.json node_modules/.package-lock.json
fi

# 引数で渡されたコマンドを実行
exec "$@"