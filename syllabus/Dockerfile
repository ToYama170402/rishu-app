# ベースイメージ
FROM golang:1.24.0-bullseye

# 作業ディレクトリを作成
WORKDIR /workspace

# プロキシを無効化
RUN go env -w GOPROXY=direct

# 必要なファイルをコピー
COPY go.mod .
COPY go.sum .
RUN go mod download

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN go build -o main ./src

# アプリケーションを実行
CMD ["./main"]
