# nginx

リバースプロキシおよびロードバランサーとして機能するNginxサーバーです。

## 概要

このサービスは、各マイクロサービス（frontend、syllabus-frontend、syllabus-backend）へのリクエストをルーティングするリバースプロキシとして動作します。本番環境でのフロントエンドとして、クライアントからのすべてのHTTPリクエストを受け付けます。

## 利用技術

- **Nginx** - Webサーバー・リバースプロキシ
- **Docker** - コンテナ化

## ディレクトリ構造

```
nginx/
├── Dockerfile              # Dockerイメージ定義
└── default.conf.template   # Nginx設定テンプレート
```

## 設定ファイル

### default.conf.template

このファイルは、環境変数を使用してNginxの設定を動的に生成するテンプレートです。

#### 主な設定内容

- **ポート80でリクエストを受信**
- **各サービスへのプロキシ設定（サブドメインベース）**:
  - `example.com` → frontend（メインアプリケーション）
  - `builder.example.com` → syllabus-frontend（シラバスフロントエンド）
  - `api.example.com` → syllabus-backend（シラバスAPI）

#### ルーティング例

```
http://example.com/              → frontendサービス
http://builder.example.com/      → syllabus-frontendサービス
http://api.example.com/          → syllabus-backendサービス
```

## 環境変数

- `SERVER_NAME` - サーバーのドメイン名（本番環境で使用）

開発環境では`docker-compose.dev.yml`で`localhost`に設定されます。

## 開発環境での起動

### Docker Composeを使用する場合

```bash
# プロジェクトルートで実行
# すべてのサービスを起動（Nginxはポート80で待機）
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

サービスは`http://localhost`で起動します。

## 動作確認方法

### アクセス確認

```bash
# ホストマシンで実行: メインページへのアクセス
curl http://localhost/

# ホストマシンで実行: シラバスフロントエンドへのアクセス（builder.localhostサブドメイン）
curl -H "Host: builder.localhost" http://localhost/

# ホストマシンで実行: シラバスAPIへのアクセス（api.localhostサブドメイン）
curl -H "Host: api.localhost" http://localhost/courses
```

### 接続テスト

ブラウザで以下のURLにアクセスして、各サービスが正常に動作していることを確認：

- `http://localhost/` - メインアプリケーション
- `http://builder.localhost/` - シラバスフロントエンド
- `http://api.localhost/courses` - シラバスAPI

## 本番環境

本番環境では、以下の設定が推奨されます：

- HTTPS対応（SSL証明書の設定）
- gzip圧縮の有効化
- セキュリティヘッダーの追加
- アクセスログの設定

## トラブルシューティング

### ポート80が既に使用されている

```bash
# ホストマシンで実行: ポート80を使用しているプロセスを確認
sudo lsof -i :80

# または別のポートを使用
# docker-compose.dev.ymlのportsセクションを「8000:80」などに変更
```

### 502 Bad Gateway エラー

- バックエンドサービスが起動していることを確認
- `docker compose logs <service-name>`でバックエンドのログを確認
- ネットワーク設定を確認（すべてのサービスが同じDockerネットワークに接続されているか）

### 設定の再読み込み

```bash
# Nginxの設定を再読み込み
docker compose restart web
```

## カスタマイズ

### 新しいルートの追加

`default.conf.template`を編集して、新しいルーティングルールを追加できます：

```nginx
location /new-service/ {
    proxy_pass http://new-service:port/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

変更後、コンテナを再起動して設定を反映させてください。
