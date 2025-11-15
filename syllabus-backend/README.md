# syllabus-backend

シラバス情報を提供するバックエンドAPIサービスです。Go言語で実装されており、PostgreSQLデータベースと連携してシラバスデータを管理します。

## 概要

このサービスは、金沢大学のシラバス情報を提供するREST APIを実装しています。Ginフレームワークを使用しており、GORMでデータベースとのやり取りを行います。

## 利用技術

- **Go** 1.24.0
- **Gin** - Webフレームワーク
- **GORM** - ORMライブラリ
- **PostgreSQL** - データベース
- **Docker** - コンテナ化

## ディレクトリ構造

```
syllabus-backend/
├── src/
│   ├── cmd/
│   │   └── api/          # APIサーバーのエントリーポイント
│   ├── api/              # APIハンドラー
│   └── internal/         # 内部パッケージ
├── Dockerfile            # 本番環境用Dockerfile
├── Dockerfile.dev        # 開発環境用Dockerfile
├── go.mod                # Go依存関係管理
└── go.sum                # Go依存関係チェックサム
```

## 開発環境のセットアップ

### 事前準備

- Docker
- Docker Compose
- VS Code（推奨）
  - Dev Container拡張機能

### 起動方法

#### Dev Containerを使用する場合

1. VS Codeでプロジェクトルートを開く
2. コマンドパレット（`Ctrl+Shift+P`）から`Dev Containers: Reopen in Container`を選択
3. `syllabus-backend`を選択

#### Docker Composeを使用する場合

```bash
# プロジェクトルートで実行
docker-compose -f docker-compose.dev.yml up syllabus-backend syllabus-db
```

サービスは`http://localhost:8080`で起動します。

### ローカルでの実行

```bash
# 依存関係のインストール
go mod download

# 開発サーバーの起動
go run src/cmd/api/main.go
```

## 動作確認方法

### ヘルスチェック

```bash
# APIサーバーが起動していることを確認
curl http://localhost:8080/health
```

### APIエンドポイント

詳細なAPIエンドポイントは、サービス起動後に確認できます。

## 環境変数

以下の環境変数が必要です：

- `POSTGRES_USER` - PostgreSQLのユーザー名
- `POSTGRES_PASSWORD` - PostgreSQLのパスワード
- `POSTGRES_DB` - データベース名

開発環境では`docker-compose.dev.yml`で自動的に設定されます。

## データベース

PostgreSQL 17.4を使用しています。データベースは`syllabus-db`サービスとして別コンテナで起動します。

## トラブルシューティング

### ポートが既に使用されている

```bash
# ポート8080を使用しているプロセスを確認
lsof -i :8080

# または別のポートを使用
# docker-compose.dev.ymlのportsセクションを編集
```

### データベース接続エラー

- `syllabus-db`コンテナが起動していることを確認
- 環境変数が正しく設定されていることを確認
