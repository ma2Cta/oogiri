# 使用するRustのイメージ
FROM rust:1.81.0

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# 必要なパッケージのインストール
RUN cargo install cargo-watch

# アプリケーションのソースコードをコピー
COPY . .

# 依存関係をビルド
RUN cargo build

# ホットリロードでアプリケーションを実行
CMD ["cargo", "watch", "-x", "run"]
