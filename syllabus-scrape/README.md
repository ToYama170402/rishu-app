# syllabus-scrape

金沢大学のシラバス情報をスクレイピングし、データベースに保存するサービスです。

## 概要

このサービスは、金沢大学の公式ウェブサイトからシラバス情報を定期的に取得し、PostgreSQLデータベースに保存します。Puppeteerを使用してブラウザ自動化を行い、CheerioでHTMLの解析を行います。

## 利用技術

- **Node.js** 22+
- **TypeScript** 5.9+
- **Puppeteer** - ブラウザ自動化
- **Cheerio** - HTML解析
- **Biome** - リンター・フォーマッター
- **PostgreSQL** - データベース
- **Docker** - コンテナ化

## ディレクトリ構造

```
syllabus-scrape/
├── src/
│   ├── course/           # コース情報の処理
│   ├── logger/           # ロギング機能
│   ├── resourceClient/   # リソース取得クライアント
│   ├── scheduler/        # スケジュール管理
│   ├── scraping/         # スクレイピング処理
│   ├── services/         # 各種サービス
│   ├── storage/          # データベース操作
│   ├── utils/            # ユーティリティ関数
│   └── main.ts           # エントリーポイント
├── Dockerfile            # 本番環境用Dockerfile
├── Dockerfile.dev        # 開発環境用Dockerfile
├── biome.json            # Biome設定
├── package.json          # npm依存関係
├── pnpm-lock.yaml        # pnpm lockファイル
└── tsconfig.json         # TypeScript設定
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
3. `syllabus-scrape`を選択

#### Docker Composeを使用する場合

```bash
# プロジェクトルートで実行
docker-compose -f docker-compose.dev.yml up syllabus-scrape syllabus-db
```

### ローカルでの実行

```bash
# 依存関係のインストール
pnpm install

# 開発モードで実行
pnpm start

# ビルド
pnpm build

# 型チェック
pnpm typecheck
```

## コード品質管理

### リント・フォーマット

```bash
# コードのフォーマット
pnpm format

# リントチェック
pnpm lint

# フォーマットとリントを同時に実行
pnpm check
```

## 動作確認方法

1. サービスを起動します
2. ログを確認してスクレイピング処理が実行されていることを確認
3. PostgreSQLデータベースにデータが保存されていることを確認

```bash
# コンテナのログを確認
docker logs -f syllabus-scrape
```

## 環境変数

以下の環境変数が必要です：

- `POSTGRES_USER` - PostgreSQLのユーザー名
- `POSTGRES_PASSWORD` - PostgreSQLのパスワード
- `POSTGRES_DB` - データベース名
- `NODE_ENV` - 実行環境（development/production）

開発環境では`docker-compose.dev.yml`で自動的に設定されます。

## スクレイピング対象

金沢大学の公式シラバスサイトから以下の情報を取得します：

- コース名
- 担当教員
- 開講時期
- 単位数
- その他のシラバス情報

## トラブルシューティング

### Puppeteerのインストールエラー

Dockerコンテナ内で実行する場合、必要なブラウザは自動的にインストールされます。

### データベース接続エラー

- `syllabus-db`コンテナが起動していることを確認
- 環境変数が正しく設定されていることを確認
- ネットワーク設定を確認

### メモリ不足

スクレイピング処理は大量のメモリを使用する可能性があります。必要に応じてDockerのメモリ制限を調整してください。

## 注意事項

- スクレイピングは対象サイトに負荷をかけないよう、適切な間隔で実行してください
- サイトの構造変更により、スクレイピング処理が失敗する可能性があります
