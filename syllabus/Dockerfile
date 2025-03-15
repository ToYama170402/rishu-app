# ベースイメージ
FROM golang:1.24.0-bullseye

# 作業ディレクトリを作成
WORKDIR /workspace

# 必要なファイルをコピー
COPY go.mod .
COPY go.sum .
RUN go mod download

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN go build -o main .

# アプリケーションを実行
CMD ["./main"]