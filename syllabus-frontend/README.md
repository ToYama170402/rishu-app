# syllabus-frontend

金沢大学のシラバス情報を表示するフロントエンドアプリケーションです。

## 概要

このサービスは、syllabus-backendから取得した情報を表示するWebアプリケーションです。SolidJSとSolidStartを使用して構築されており、高速で効率的なユーザーインターフェースを提供します。

## 利用技術

- **SolidJS** 1.9+ - 高性能なリアクティブUIライブラリ
- **SolidStart** 1.1+ - SolidJSのメタフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** 4.0+ - ユーティリティファーストCSSフレームワーク
- **pnpm** - パッケージマネージャー
- **Docker** - コンテナ化

## ディレクトリ構造

```
syllabus-frontend/
├── src/
│   ├── routes/        # ページルーティング
│   ├── components/    # UIコンポーネント
│   └── app.tsx        # アプリケーションエントリーポイント
├── public/            # 静的ファイル
├── Dockerfile         # 本番環境用Dockerfile
├── Dockerfile.dev     # 開発環境用Dockerfile
├── app.config.ts      # SolidStart設定
├── package.json       # npm依存関係
└── tsconfig.json      # TypeScript設定
```

## 開発環境のセットアップ

### 事前準備

- Docker
- Docker Compose
- Node.js 22以上（ローカル実行の場合）
- VS Code（推奨）
  - Dev Container拡張機能

### 起動方法

#### Dev Containerを使用する場合

1. VS Codeでプロジェクトルートを開く
2. コマンドパレット（`Ctrl+Shift+P`）から`Dev Containers: Reopen in Container`を選択
3. `syllabus-frontend`を選択

#### Docker Composeを使用する場合

```bash
# プロジェクトルートで実行
docker compose -f docker-compose.yml -f docker-compose.dev.yml up syllabus-frontend syllabus-backend
```

サービスは`http://localhost:4000`で起動します。

### ローカルでの実行

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動（ポート4000）
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバーの起動
pnpm start
```

## 動作確認方法

1. ブラウザで`http://localhost:4000`にアクセス
2. シラバス情報が表示されることを確認

## 主な機能

- **科目詳細表示**: 各科目の詳細情報を表示
- **フィルタリング**: 学部・学科・開講時期などでフィルタリング
- **レスポンシブデザイン**: モバイルデバイスにも対応

## 環境変数

- `NODE_ENV` - 実行環境（development/production）

## バックエンドAPI連携

このフロントエンドは`syllabus-backend`サービスと連携して動作します。開発時は以下を確認してください：

- `syllabus-backend`が起動していること
- APIエンドポイントが正しく設定されていること

## トラブルシューティング

### ポートが既に使用されている

```bash
# ホストマシンで実行: ポート4000を使用しているプロセスを確認
lsof -i :4000
```

### ビルドエラー

```bash
# node_modulesとキャッシュをクリア
rm -rf node_modules .vinxi
pnpm install
```

### API接続エラー

- `syllabus-backend`サービスが起動していることを確認
- ネットワーク設定を確認（Docker Composeの場合）
- ブラウザの開発者ツールでネットワークエラーを確認

## 参考リソース

- [SolidJS Documentation](https://www.solidjs.com/)
- [SolidStart Documentation](https://start.solidjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
