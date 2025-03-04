# effective-yomimono

効率的な読書管理のためのブックマーク収集・管理システムです。技術記事を収集し、読む習慣を効率化することを目的としています。

## プロジェクト概要
「effective-yomimono」は、ウェブ上の読みたい記事やコンテンツを効率的に管理するためのツールです。技術記事をタブで開いて並べておくことが多い開発者の習慣に着目し、Chrome拡張機能でブックマークを簡単に収集し、APIを通じてデータを保存、フロントエンドで整理・閲覧できます。

### 主な特徴
- Chrome拡張機能による簡単なブックマーク収集
- クラウドベースのデータ保存（Cloudflare Workers）
- モダンなウェブインターフェースでのブックマーク管理
- 効率的な読書体験のサポート

## プロジェクトのロードマップ

### 実装済み機能
- ✅ Cloudflare workersでAPIとDBを構築（Hono + Drizzle）
  - ブックマーク保存エンドポイントの実装
  - フロントエンド用APIの実装
- ✅ Chrome拡張機能の作成
  - タブの一括保存機能

### 開発中の機能
- 🚧 記事を読むためのUI作成
  - 記事の一覧表示機能

## プロジェクト構造
```
effective-yomimono/
├── api/                 # バックエンドAPI (Hono.js + Cloudflare Workers)
│   ├── drizzle/         # データベースマイグレーション
│   ├── src/
│   │   ├── db/          # データベース接続・スキーマ定義
│   │   ├── repositories/# データアクセス層
│   │   ├── routes/      # APIルート定義
│   │   └── services/    # ビジネスロジック
│   └── tests/           # APIテスト
│
├── extension/           # Chrome拡張機能 (Manifest V3)
│   ├── popup/           # 拡張機能UI
│   ├── background.js    # バックグラウンド処理
│   └── manifest.json    # 拡張機能設定
│
└── frontend/            # フロントエンドアプリ (Next.js)
    ├── src/
    │   ├── app/         # Next.jsアプリケーション
    │   ├── components/  # UIコンポーネント
    │   ├── lib/         # ユーティリティ関数
    │   └── types/       # 型定義
    └── docs/            # ドキュメント
```

## 技術スタック
- **バックエンド**: Hono.js, Cloudflare Workers, Drizzle ORM
- **フロントエンド**: Next.js, React, TailwindCSS
- **拡張機能**: Chrome Extensions API (Manifest V3)
- **テスト**: Vitest

## セットアップと実行方法

### 前提条件
- Node.js (v18以上)
- npm (v9以上)

### APIの実行
```bash
cd api
npm install
npm run dev  # 開発サーバー起動
```

### フロントエンドの実行
```bash
cd frontend
npm install
npm run dev  # 開発サーバー起動（http://localhost:3000）
```

### Chrome拡張機能のインストール
1. Chromeブラウザで `chrome://extensions` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `extension` ディレクトリを選択

### デプロイ
```bash
# APIのデプロイ
cd api
npm run deploy

# フロントエンドのデプロイ
cd frontend
npm run deploy
```

## APIリクエスト仕様
- エンドポイント: `/bookmarks`
- メソッド: `POST`
- リクエスト形式:
```json
{
  "bookmarks": [
    {
      "url": "https://example.com",
      "title": "ページタイトル"
    }
  ]
}
```

## 開発ワークフロー

### テスト実行
```bash
# APIのテスト
cd api
npm test

# フロントエンドのテスト
cd frontend
npm test
```

### コード品質とルール
- APIでは以下の品質基準を設定しています：
  - テストカバレッジ90%以上の維持
  - Biomeによる静的解析の実施
  - 単体テストを書きやすい設計（DI考慮）の採用

- 開発時の必須手順：
  1. 実装後は必ず`npm run format`でコードフォーマットを実行
  2. 実装後は必ず`npm run test`で静的解析を実施
  3. 新規仕様やメモは`.cline`以下に適切なマークダウンファイルとして記録
     - API関連のドキュメントは`.cline/api`以下に配置
     - 実装前に`.cline`以下の仕様を必ず確認

- フロントエンドでは以下のツールを使用：
  - Biomeによる静的解析
  - Vitestによるユニットテスト
  - Next.jsの標準リンター

### データベースマイグレーション
```bash
cd api
# マイグレーションファイル生成
npx drizzle-kit generate

# マイグレーション適用
npx drizzle-kit migrate
```

## コントリビューション
1. このリポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュする (`git push origin feature/amazing-feature`)
5. プルリクエストを作成する

## ライセンス
このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## Chrome拡張機能の詳細

### 概要
Chromeで開いているタブのURLとタイトルを一括で取得し、APIエンドポイントに送信するための拡張機能です。

### 機能
- 現在開いているChromeウィンドウの全タブのURL・タイトルを取得
- 取得したデータをAPIエンドポイントに一括でPOST送信
- 処理状態とレスポンスの可視化

### インストール方法
1. Chromeブラウザで `chrome://extensions` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `extension` ディレクトリを選択

### 使用方法
1. Chromeツールバーの拡張機能アイコンをクリック
2. 表示されたポップアップ内の「URLを収集して送信」ボタンをクリック
3. 処理状態がポップアップ内に表示され、完了時にはAPIからのレスポンスが表示されます

### 動作の流れ
1. ユーザーがポップアップUIのボタンをクリック
2. バックグラウンドプロセスが起動し、chrome.tabs APIを使用して現在のウィンドウの全タブ情報を収集
3. 収集したデータをJSON形式でAPIエンドポイントにPOST
4. APIからのレスポンスをポップアップUI上に表示
5. エラーが発生した場合は、詳細なエラーメッセージを表示

### エラーハンドリング
- タブ情報の取得に失敗した場合のエラー表示
- APIリクエスト失敗時のエラーメッセージ表示（HTTPステータスコードとエラー詳細を含む）
- ネットワークエラーの検知と表示

### 技術仕様とファイル構成

#### ディレクトリ構造
```
extension/
├── manifest.json       # 拡張機能の設定
├── background.js      # バックグラウンド処理（タブ情報取得とAPI通信）
├── popup/
│   ├── popup.html    # ポップアップUI
│   ├── popup.css     # スタイル定義
│   └── popup.js      # UIのロジック
```

#### 使用技術
- Chrome Extensions Manifest V3
- Chrome Tabs API
- Fetch API for HTTP通信
- ES6+ JavaScript
