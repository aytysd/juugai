# ベースイメージとして MySQL を使用
FROM mysql:latest

# MySQL の初期設定を環境変数で指定
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=user_db
ENV MYSQL_USER=ayato
ENV MYSQL_PASSWORD=ayato_password

# カスタムの初期化スクリプトをコピー（必要に応じて）
# COPY ./init.sql /docker-entrypoint-initdb.d/

# デフォルトのポートを公開
EXPOSE 3306
