# Rustの公式イメージをベースとして使用
FROM rust:1.81.0

# 作業ディレクトリを設定
WORKDIR /usr/src/oogiri-backend

# 必要なツールをインストール
RUN cargo install cargo-watch

# 実行コマンドを設定
CMD ["cargo", "watch", "-x", "run"]
