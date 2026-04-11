# frontend

抽選科目の登録状況を可視化するフロントエンドサービスです。

## 概要

このサービスは、risyu APIから取得した抽選科目の申込状況データを表示するNext.js製のWebアプリケーションです。また、金沢大学のシラバス情報の検索・閲覧および履修登録ビルダー機能も提供しています。

## 利用技術

- **Next.js** 16 - Reactベースのフロントエンドフレームワーク
- **React** 19 - UIライブラリ
- **TypeScript** - 型安全な開発言語
- **Tailwind CSS** v4 - ユーティリティファーストCSSフレームワーク
- **shadcn/ui** - Tailwind CSS + Radix UIベースのコンポーネントライブラリ
- **pnpm** - パッケージマネージャー

## ディレクトリ構造

```
frontend/
├── src/
│   ├── app/           # Next.js App Router（ページ・レイアウト）
│   ├── components/    # 共通コンポーネント（shadcn/ui等）
│   ├── features/      # 機能別コンポーネント
│   ├── hooks/         # カスタムフック
│   ├── lib/           # ユーティリティ・ヘルパー
│   ├── types/         # TypeScript型定義
│   └── utils/         # ユーティリティ関数
├── public/            # 静的アセット
├── .storybook/        # Storybook設定
├── Dockerfile         # 本番環境用Dockerfile
├── Dockerfile.dev     # 開発環境用Dockerfile
├── package.json       # 依存関係管理
├── pnpm-lock.yaml     # pnpm lockファイル
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

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm typecheck
```

## コード品質管理

### リント・フォーマット

```bash
# ESLintによるリントチェック
pnpm lint
```

### テスト

```bash
# 全テストの実行
pnpm test

# ユニットテストのみ実行
pnpm test:unit

# Storybookテストのみ実行
pnpm test:storybook
```

### Storybook

```bash
# Storybookの起動（http://localhost:6006）
pnpm storybook

# Storybookのビルド
pnpm build-storybook
```

## 主な機能

- **抽選科目一覧** (`/odds`): 履修登録期間中の抽選科目の申込状況を表示
- **授業一覧** (`/view`): シラバス情報の検索・閲覧
- **履修登録ビルダー** (`/builder`): 履修登録のプランニングを支援

## トラブルシューティング

### ポートが既に使用されている

```bash
# ホストマシンで実行: ポート3000を使用しているプロセスを確認
lsof -i :3000

# または別のポートを使用
# docker-compose.dev.ymlのportsセクションを編集
```

### 依存関係のインストールエラー

```bash
# node_modulesを削除して再インストール
rm -rf node_modules
pnpm install
```
