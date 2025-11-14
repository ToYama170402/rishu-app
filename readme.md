Inspired by [kurisyushien.org](https://kurisyushien.org)

# [rishu-app](https://yamato.kurisyushien.org)

![Node.js](https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=plastic)
![TypeScript](https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=plastic)
![Next.js](https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=plastic)
![React](https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=plastic)
![MUI](https://img.shields.io/badge/-MUI-757575.svg?logo=MUI&style=plastic)
![Docker](https://img.shields.io/badge/-Docker-2496ED.svg?logo=docker&style=plastic)
![Dev Container](https://img.shields.io/badge/-Dev%20Container-444444.svg?logo=dev.to&style=plastic)
![Vercel](https://img.shields.io/badge/-Vercel-000000.svg?logo=vercel&style=plastic)
![risyu API](https://img.shields.io/badge/-risyu%20API-FFFFFF.svg?logo=api&style=flat)

![rishu-app](./rishu-app/app/favicon.ico)

このプロジェクトは、[risyu](https://kurisyushien.org)を参考に作成された、金沢大学の履修登録期間に抽選科目の登録を支援するアプリケーションです。

## 特徴

- 登録状況をグラフ表示

現在プロジェクトは発展途上であり、機能の追加や改善が行われる予定です。

## 使用技術

- [Node.js](https://nodejs.org/)
  - [TypeScript](https://www.typescriptlang.org/)（主要開発言語）
  - [Next.js](https://nextjs.org/)（フロントエンドフレームワーク）
    - [React](https://reactjs.org/)（UIライブラリ）
      - [MUI](https://mui.com/)（UIコンポーネント）
- [Docker](https://www.docker.com/)（開発環境）
  - [Dev Container](https://code.visualstudio.com/docs/remote/containers)（開発環境）
- [Vercel](https://vercel.com/)（ホスティング）
- [risyu API](https://github.com/ogawa3427/risyu_son?tab=readme-ov-file)（データ取得）

## 開発環境

Dev Containerを使用して開発環境を構築します。

### 事前インストール

- VS Code
  - Dev Container
- Docker

### 環境構築

1. `git clone https://github.com/ToYama170402/rishu-app.git`
2. クローンしたレポジトリをVS Codeで開く
3. コマンドパレット（`Ctrl+Shift+p`）から`Reopen in Container`を選択
4. メニューから開発したいサービスを選択

## コントリビュート

Pull Request、Issue、質問、提案など、どんな形でも歓迎します。

### 貢献の始め方

- 🌱 **初めての方**: [初心者向け貢献ガイド](./CONTRIBUTING_BEGINNERS.md) - GitHubの使い方から丁寧に解説
- 📖 **経験者の方**: [貢献ガイドライン](./CONTRIBUTING.md) - 開発ワークフローやコーディング規約

開発に参加したい方は、Twitterの[@ToYamaSoujin](https://x.com/ToYamaSoujin)または、[toyamasoujinn@gmail.com](toyamasoujinn@gmail.com)までお気軽にご連絡ください。

## Special Thanks

- [Ogawa3427](https://twitter.com/Ogawa3427)
  - [kurisyushien.org](https://kurisyushien.org)のサブドメインを提供していただきました。

## ライセンス

MIT License
