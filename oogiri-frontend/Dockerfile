FROM node:20-alpine

WORKDIR /app

# 開発用の依存関係をインストールするスクリプトをコピー
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# エントリーポイントを設定
ENTRYPOINT ["docker-entrypoint.sh"]

# コンテナ起動時のコマンドを設定
CMD ["npm", "run", "dev"]