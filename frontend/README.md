# frontend

金沢大学の履修登録を支援するメインアプリケーションのフロントエンドです。

## 概要

このサービスは、履修登録期間中に抽選科目の登録状況をグラフで可視化し、学生の履修登録をサポートするWebアプリケーションです。[Next.js](https://nextjs.org/)を使用して構築されています。

## 利用技術

- **Next.js** 15.4+ - Reactフレームワーク
- **React** 19.0 - UIライブラリ
- **TypeScript** - 型安全な開発
- **Material-UI (MUI)** - UIコンポーネントライブラリ
- **pnpm** - パッケージマネージャー
- **Docker** - コンテナ化

## ディレクトリ構造

```
frontend/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # 再利用可能なコンポーネント
│   ├── const/         # 定数定義
│   ├── features/      # 機能別コンポーネント
│   ├── hooks/         # カスタムフック
│   ├── types/         # TypeScript型定義
│   └── util/          # ユーティリティ関数
├── public/            # 静的ファイル
├── Dockerfile         # 本番環境用Dockerfile
├── Dockerfile.dev     # 開発環境用Dockerfile
├── next.config.mjs    # Next.js設定
├── package.json       # npm依存関係
└── tsconfig.json      # TypeScript設定
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
3. `frontend`を選択

#### Docker Composeを使用する場合

```bash
# プロジェクトルートで実行
docker compose -f docker-compose.yml -f docker-compose.dev.yml up frontend
```

サービスは`http://localhost:3000`で起動します。

### ローカルでの実行

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動（Turbopack使用）
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバーの起動
pnpm start

# リントチェック
pnpm lint
```

## 動作確認方法

1. ブラウザで`http://localhost:3000`にアクセス
2. トップページが表示されることを確認
3. 履修登録情報が正しく表示されることを確認

## 主な機能

- **登録状況のグラフ表示**: 抽選科目の登録状況をビジュアル化
- **レスポンシブデザイン**: スマートフォンやタブレットにも対応

## 環境変数

- `GTM` - Google Tag Manager ID（本番環境）
- `GOOGLE_SITE_VERIFICATION` - Google Search Console認証（本番環境）
- `NODE_ENV` - 実行環境（development/production）

## コード編集

ページの編集は`src/app/page.tsx`から始めることができます。ファイルを編集すると、ページが自動的に更新されます。

このプロジェクトは[`next/font`](https://nextjs.org/docs/basic-features/font-optimization)を使用して、Googleフォントを最適化して読み込みます。

## ビルド分析

バンドルサイズを分析する場合：

```bash
pnpm analyze
```

## デプロイ

このアプリケーションは[Vercel](https://vercel.com/)にデプロイされています。

## トラブルシューティング

### ポートが既に使用されている

```bash
# ホストマシンで実行: ポート3000を使用しているプロセスを確認
lsof -i :3000
```

### ビルドエラー

```bash
# node_modulesとキャッシュをクリア
rm -rf node_modules .next
pnpm install
```

### 型エラー

```bash
# TypeScriptの型チェックを実行
pnpm tsc --noEmit
```

## 参考リソース

Next.jsについて詳しく学ぶには：

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
