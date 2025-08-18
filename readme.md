Inspired by [kurisyushien.org](https://kurisyushien.org)

# [rishu-app](https://yamato.kurisyushien.org)

![Node.js](https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=plastic)
![TypeScript](https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=plastic)
![Next.js](https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=plastic)
![React](https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=plastic)
![MUI](https://img.shields.io/badge/-MUI-757575.svg?logo=MUI&style=plastic)
![Django](https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=plastic)
![Python](https://img.shields.io/badge/-Python-3776AB.svg?logo=python&style=plastic)
![Go](https://img.shields.io/badge/-Go-00ADD8.svg?logo=go&style=plastic)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1.svg?logo=postgresql&style=plastic)
![Docker](https://img.shields.io/badge/-Docker-2496ED.svg?logo=docker&style=plastic)
![Dev Container](https://img.shields.io/badge/-Dev%20Container-444444.svg?logo=dev.to&style=plastic)
![Vercel](https://img.shields.io/badge/-Vercel-000000.svg?logo=vercel&style=plastic)
![Selenium](https://img.shields.io/badge/-Selenium-43B02A.svg?logo=selenium&style=plastic)

このプロジェクトは、[risyu](https://kurisyushien.org)を参考に作成された、金沢大学の履修登録期間に抽選科目の登録状況をリアルタイムで可視化するWebアプリケーションです。

Seleniumを使用して大学の履修登録システムから自動的にデータを取得し、時間割形式で登録状況を表示します。

## 特徴

- 登録状況をリアルタイムで時間割形式で表示
- 抽選科目の競争率を視覚的に把握可能
- レスポンシブデザインでスマートフォンにも対応
- Dockerを使用した簡単な開発環境構築

## アーキテクチャ

このアプリケーションは以下のサービスで構成されたマイクロサービスアーキテクチャを採用しています：

### フロントエンド
- **技術スタック**: Next.js 15.2.4 + React 19 + TypeScript + MUI
- **機能**: 履修登録状況の時間割表示、レスポンシブUI
- **デプロイ**: Vercel

### バックエンド（Django API）
- **技術スタック**: Django 4.2.22 + Python + SQLite
- **機能**: データ取得API、Seleniumによるスクレイピング
- **API**: `/registration-term`, `/adjustment-term`

### シラバスサービス
- **技術スタック**: Go + PostgreSQL
- **機能**: シラバス情報の管理・提供

### インフラストラクチャ
- **リバースプロキシ**: Nginx
- **スクレイピング**: Selenium (Chrome Headless)
- **コンテナ化**: Docker + Docker Compose

## 使用技術

### フロントエンド
- [Node.js](https://nodejs.org/) 
- [TypeScript](https://www.typescriptlang.org/)（メイン開発言語）
- [Next.js](https://nextjs.org/) 15.2.4（フロントエンドフレームワーク）
- [React](https://reactjs.org/) 19（UIライブラリ）
- [MUI](https://mui.com/)（UIコンポーネント）
- [pnpm](https://pnpm.io/)（パッケージマネージャ）

### バックエンド
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/) 4.2.22（APIフレームワーク）
- [Selenium](https://selenium-python.readthedocs.io/) 4.26.1（Webスクレイピング）
- [BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/)（HTMLパーサー）
- [APScheduler](https://apscheduler.readthedocs.io/)（スケジューラ）

### シラバスサービス
- [Go](https://golang.org/) 1.24.0
- [PostgreSQL](https://www.postgresql.org/) 17.4

### インフラストラクチャ・開発環境
- [Docker](https://www.docker.com/) & Docker Compose（コンテナ化）
- [Dev Container](https://code.visualstudio.com/docs/remote/containers)（開発環境）
- [Nginx](https://nginx.org/)（リバースプロキシ）
- [Vercel](https://vercel.com/)（フロントエンドホスティング）

## API仕様

詳細なAPI仕様は [`docs/api.yaml`](./docs/api.yaml) を参照してください。

### エンドポイント
- `GET /registration-term` - 履修登録期間中の登録状況
- `GET /adjustment-term` - 履修登録補正期間中の登録状況

## 開発環境

### 必要な環境
- [VS Code](https://code.visualstudio.com/)
- [Dev Container拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker](https://www.docker.com/)

### 環境構築

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/ToYama170402/rishu-app.git
   cd rishu-app
   ```

2. **環境変数の設定**
   ```bash
   cp sample.env .env
   # .envファイルを適切に編集
   ```

3. **Dev Containerでの開発**
   - VS Codeでプロジェクトを開く
   - `.devcontainer/devcontainer.json`の`service`キーを編集：
     - フロントエンド開発: `frontennd`
     - バックエンド開発: `backend`
     - シラバスサービス開発: `syllabus`
   - コマンドパレット（`Ctrl+Shift+P`）→ `Dev Containers: Reopen in Container`

4. **本番環境の起動**
   ```bash
   docker-compose up --build
   ```

### デバッグ
`.vscode/launch.json`にデバッグ設定が含まれています。VS Codeのデバッグ機能を使用して、各サービスをデバッグできます。

### 注意事項
- Dev Container内からはGitが使用できないため、Git操作はホストから行ってください
- 開発用とプロダクション用のDocker Composeファイルが分かれています（`docker-compose.dev.yml`, `docker-compose.yml`）

## プロジェクトの現状

現在、プロジェクトは積極的に開発が進められています：

- ✅ 基本的な時間割表示機能
- ✅ リアルタイムデータ取得機能（Selenium）
- ✅ レスポンシブデザイン
- ✅ Docker化された開発環境
- ✅ API仕様書（OpenAPI）
- 🚧 シラバス検索機能の強化
- 🚧 UIの改善とアクセシビリティ向上
- 🚧 パフォーマンス最適化

## コントリビュート

Pull Request、Issue、質問、提案など、どんな形でも歓迎します。

### 開発に参加したい方
Twitterの[@ToYamaSoujin](https://x.com/ToYamaSoujin)または、[toyamasoujinn@gmail.com](mailto:toyamasoujinn@gmail.com)までお気軽にご連絡ください。

### 貢献の方法
1. このリポジトリをFork
2. 新しいブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. Pull Requestを作成

## Special Thanks

- [Ogawa3427](https://twitter.com/Ogawa3427)
  - [kurisyushien.org](https://kurisyushien.org)のサブドメインを提供していただきました。

## ライセンス

MIT License
