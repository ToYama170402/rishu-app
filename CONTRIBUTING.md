# 貢献ガイドライン

rishu-appへの貢献に興味を持っていただき、ありがとうございます！このドキュメントでは、プロジェクトへの貢献方法をまとめています。

## 目次

- [行動規範](#行動規範)
- [貢献の方法](#貢献の方法)
- [開発環境のセットアップ](#開発環境のセットアップ)
- [開発ワークフロー](#開発ワークフロー)
- [コーディング規約](#コーディング規約)
- [コミットメッセージ](#コミットメッセージ)
- [プルリクエストのガイドライン](#プルリクエストのガイドライン)
- [Issueの報告](#issueの報告)
- [質問とサポート](#質問とサポート)

## 行動規範

このプロジェクトに参加する全ての人には、お互いを尊重し、協力的な態度で接することを期待しています。建設的で前向きなコミュニティを作っていきましょう！

- 他の貢献者に敬意を払う
- 建設的なフィードバックを心がける
- 異なる視点や経験を尊重する
- プロジェクトとコミュニティの利益を優先する

## 貢献の方法

rishu-appへの貢献はいろいろな形で歓迎しています：

### バグ報告

バグを見つけたら、[Issue](https://github.com/ToYama170402/rishu-app/issues)を作成してください。詳しくは[Issueの報告](#issueの報告)セクションを参照。

### 機能提案

新しい機能のアイデアがあれば、ぜひIssueで提案してください！以下を含めると話が進みやすいです：

- 機能の概要
- なぜ必要か
- どう実装するか（思いつけば）

### コードの貢献

コードの貢献は大歓迎です！以下の流れで進めてください：

1. Issueを確認するか、新しくIssueを作る
2. フォークしてブランチを作成
3. コードを実装
4. テストを追加/更新
5. プルリクエストを作成

### ドキュメントの改善

ドキュメントの改善も大切な貢献です：

- タイポの修正
- 説明の追加や明確化
- 例やチュートリアルの追加

## 開発環境のセットアップ

### 必要な環境

- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)
- [Dev Container 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### セットアップ手順

1. **リポジトリをフォーク**

   GitHub上で[rishu-app](https://github.com/ToYama170402/rishu-app)をフォークしてください。

2. **リポジトリをクローン**

   ```bash
   git clone https://github.com/あなたのユーザー名/rishu-app.git
   cd rishu-app
   ```

3. **Dev Containerで開く**

   - VS Codeでクローンしたディレクトリを開く
   - コマンドパレット（`Ctrl+Shift+P` / `Cmd+Shift+P`）を開く
   - `Dev Containers: Reopen in Container` を選択
   - 開発したいサービスを選択（frontend、syllabus-frontendなど）

4. **リモートリポジトリの設定**

   ```bash
   git remote add upstream https://github.com/ToYama170402/rishu-app.git
   ```

## 開発ワークフロー

### ブランチの作成

メインブランチから新しいブランチを作ります：

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

ブランチ名の規則：

- `feature/機能名` - 新機能の追加
- `fix/バグ名` - バグ修正
- `docs/ドキュメント名` - ドキュメントの更新
- `refactor/対象` - リファクタリング
- `test/テスト名` - テストの追加・修正
- `chore/タスク名` - ビルド、設定、その他の雑多なタスク

### 開発

1. **コードを書く**

   エディタで必要な変更を加えてください。

2. **ローカルでテスト**

   変更が正しく動作するか確認しましょう。

3. **コミット**

   ```bash
   git add .
   git commit -m "適切なコミットメッセージ"
   ```

4. **プッシュ**

   ```bash
   git push origin <your-branch-name>
   ```

### 最新の変更を取り込む

開発中に上流リポジトリの変更を取り込みたい場合：

```bash
git fetch upstream
git rebase upstream/main
```

## コーディング規約

### TypeScript / JavaScript

- **言語**: TypeScript を使用
- **フォーマット**: プロジェクトのESLint/Prettierの設定に従う
- **命名規則**:
  - 変数・関数: `camelCase`
  - クラス・型: `PascalCase`
  - 定数: `UPPER_SNAKE_CASE`
  - ファイル: `camelCase.ts` または `PascalCase.tsx`（コンポーネント）

### 全体的なコーディング規約

このプロジェクトは複数のサービス（frontend、syllabus-frontend、syllabus-backend、syllabus-scrapeなど）から構成されています。それぞれのサービスで共通して守るべき規約：

- **型安全性**: TypeScriptの型システムを最大限活用し、`any`の使用は最小限に
- **エラーハンドリング**: 適切なエラーハンドリングを実装
- **コードの可読性**: 意図が明確になるような命名と構造を心がける
- **再利用性**: 共通のロジックは適切に抽出して再利用

### フロントエンド（React/Next.js）

- 関数コンポーネントを使用
- Hooksを適切に使用（`useState`, `useEffect`など）
- コンポーネントは再利用可能で単一責任の原則に従う
- PropTypesの代わりにTypeScriptの型を使用

### スタイリング

- MUIコンポーネントを優先的に使用
- カスタムスタイルが必要な場合は、MUIのスタイリングシステム（`sx` prop、`styled`）を使用

### コメント

- 複雑なロジックには説明を追加
- コメントは日本語または英語で記述
- TODOコメントには `// TODO: 説明` の形式を使用

## コミットメッセージ

明確で分かりやすいコミットメッセージを心がけましょう。このプロジェクトでは[Conventional Commits](https://www.conventionalcommits.org/)の形式を推奨しています。

### フォーマット

```
<type>: <subject>

<body>（任意）
```

### Type の種類

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの動作に影響しない変更（空白、フォーマットなど）
- `refactor`: バグ修正や機能追加ではないコードの変更
- `test`: テストの追加や修正
- `chore`: ビルドプロセスやツールの変更

参考: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)

### 例

```
feat: 履修登録状況のグラフ表示機能を追加

- Chart.jsを使用してグラフを実装
- 登録者数の推移を可視化
```

## プルリクエストのガイドライン

### プルリクエストを作成する前に

- [ ] コードが正しく動作するか確認
- [ ] 既存のテストが通るか確認
- [ ] 必要なら新しいテストを追加
- [ ] コードスタイルがプロジェクトの規約に従っている
- [ ] コミットメッセージが明確
- [ ] 不要なファイルが含まれていない

### プルリクエストの作成

1. GitHubでフォークしたリポジトリを開く
2. 「Pull Request」ボタンをクリック
3. ベースブランチは `main`、比較ブランチは作成したブランチを選択
4. タイトルと説明を記入（プルリクエストテンプレートがある場合はそれに従ってください）

### レビュープロセス

- メンテナーがプルリクエストをレビューします
- フィードバックがあれば対応してください
- 承認されたら、メンテナーがマージします

## Issueの報告

### バグ報告

バグを報告する際は、Issueテンプレートがある場合はそれに従ってください。テンプレートがない場合は、以下の情報があると助かります：

- バグの内容
- 再現手順
- 期待される動作と実際の動作
- スクリーンショット（あれば）
- 環境情報（OS、ブラウザなど）

### 機能リクエスト

新機能を提案する際は、Issueテンプレートがある場合はそれに従ってください。テンプレートがない場合は、以下があると良いです：

- 機能の説明
- なぜその機能が必要か
- 実装のアイデア（あれば）
- 代替案（あれば）

## 質問とサポート

### コミュニケーション

プロジェクトに関する質問や相談は気軽にどうぞ：

- **GitHub Issues**: バグ報告、機能提案、質問
- **Twitter**: [@ToYamaSoujin](https://x.com/ToYamaSoujin)
- **Email**: [toyamasoujinn@gmail.com](mailto:toyamasoujinn@gmail.com)

### 質問をする前に

まずは以下をチェックしてみてください：

1. [README.md](readme.md)を確認
2. 既存のIssueを検索
3. ドキュメントを確認

それでも解決しなければ、遠慮なく質問してください！

## その他のリソース

- [リポジトリ](https://github.com/ToYama170402/rishu-app)
- [アプリケーション](https://yamato.kurisyushien.org)
- [risyu API](https://github.com/ogawa3427/risyu_son)

---

再度、rishu-appへの貢献に興味を持っていただき、ありがとうございます！あなたの貢献がプロジェクトをより良くすることを楽しみにしています。
