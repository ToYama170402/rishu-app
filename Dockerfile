FROM node:20

# 必要なパッケージのインストールとアップデート
RUN apt-get update \
    && apt-get install -y \
    git \
    # 追加のパッケージをここに列挙する
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# アプリケーションの依存関係をインストール
COPY /rishu-app/yarn.lock ./rishu-app/
CMD cd rishu-app
RUN yarn install --frozen-lockfile
