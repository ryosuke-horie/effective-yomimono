# Effective Yomimono プロジェクトドキュメント

このディレクトリには、プロジェクトの設計文書、意思決定記録、機能仕様書、調査報告書などが含まれています。
AIとの協業を意識した日本語ベースのドキュメント構造になっています。

## ディレクトリ構造と役割

```
docs/
├── ADR/                       # アーキテクチャ意思決定記録
│   ├── README.md              # ADRの説明と作成ガイド
│   ├── 001-リソース保護に関して.md
│   ├── 002-ネットワーク層でのリソース保護.md
│   └── 003-CF-Accessとサービストークンによる認証.md
│
├── 機能仕様/                   # 機能ごとの詳細仕様
│   ├── README.md              # 機能仕様の概要と作成ガイド
│   └── お気に入り/              # お気に入り機能
│       ├── 01_概要.md          # 機能概要
│       ├── 02_データモデル.md    # データモデル定義
│       ├── 03_API設計.md        # API設計
│       └── 04_フロントエンド設計.md # フロントエンド設計
│
├── 調査/                      # 実装前の調査・検討資料
│   ├── README.md              # 調査・設計ドキュメントの概要
│   ├── 認証システム/            # 認証関連の調査・設計
│   │   ├── README.md
│   │   ├── cloudflare_access調査.md
│   │   └── 実装ガイド.md
│
├── 要望メモ/                  # 機能のアイデア・要件メモ・思考過程等を雑多に配置する
│
├── README.md # ドキュメントに関するルール・方針等を記載
```

## ディレクトリの役割詳細

### 1. ADR（アーキテクチャ意思決定記録）

プロジェクトの重要なアーキテクチャ上の意思決定を記録するためのディレクトリです。各ADRは、決定に至った背景、検討した選択肢、採用した解決策、その根拠、予想される結果を含みます。

**目的**:
- プロジェクトの重要な決定を文書化し、その背景と理由を残す
- 後から参照できるように決定の文脈を保存する
- 新しいメンバーがプロジェクトの発展経緯を理解できるようにする

**現在のADR**:
- [001-リソース保護に関して.md](./ADR/001-リソース保護に関して.md) - JWT認証による保護の方針
- [002-ネットワーク層でのリソース保護.md](./ADR/002-ネットワーク層でのリソース保護.md) - Cloudflareのエッジ機能活用
- [003-CF-Accessとサービストークンによる認証.md](./ADR/003-CF-Accessとサービストークンによる認証.md) - クロスドメイン認証の実装方針

### 2. 開発ガイドライン

プロジェクトのコード品質と一貫性を確保するための開発規約とベストプラクティスを含むディレクトリです。

**目的**:
- 一貫したコーディングスタイルの維持
- プロジェクト固有の実装パターンの標準化
- 技術スタックの効果的な活用方法の共有

**主要文書**:
- [hono.md](./開発ガイドライン/hono.md) - Hono.jsフレームワークの利用ガイドとベストプラクティス

### 3. 機能仕様

プロジェクトの各機能に関する詳細な仕様を記述したドキュメントを含むディレクトリです。新機能の開発前に作成し、実装の指針とします。

**目的**:
- 機能の目的と範囲を明確にする
- データモデル、API、UIなど実装に必要な詳細を提供する
- 実装前のレビューと合意形成の基盤とする

**お気に入り機能の仕様**:
- [01_概要.md](./機能仕様/お気に入り/01_概要.md) - 機能の目的と主要コンポーネント
- [02_データモデル.md](./機能仕様/お気に入り/02_データモデル.md) - データベースモデルとスキーマ定義
- [03_API設計.md](./機能仕様/お気に入り/03_API設計.md) - APIエンドポイントとインターフェース設計
- [04_フロントエンド設計.md](./機能仕様/お気に入り/04_フロントエンド設計.md) - UI/UX設計とコンポーネント構成

### 4. 調査_設計

新機能や新技術の導入前に行った調査、検討内容、設計案を含むディレクトリです。
実装の前段階での探索的な内容が中心です。

**目的**:
- 新技術や機能の可能性と制約の調査
- 実装前の設計案の検討
- 調査に基づく意思決定の根拠を記録

**主要な調査・設計文書**:
- **認証システム**: Cloudflare Accessを活用した認証システムの調査と設計
- **MCP (Model Context Protocol)**: AI連携のためのプロトコル導入に関する調査と設計
  - **自動分類機能**: MCPを活用したブックマーク自動分類機能の設計

### 5. テンプレート

新しいドキュメントを作成する際に使用するテンプレートを含むディレクトリです。一貫した形式のドキュメントを作成するための雛形を提供します。

**目的**:
- ドキュメント作成の効率化
- ドキュメント形式の標準化
- 必要な項目の抜け漏れ防止

**テンプレート一覧**:
- ADR_テンプレート.md - 新規ADR作成用
- 機能仕様_テンプレート.md - 新機能の仕様書作成用
- 調査報告_テンプレート.md - 技術調査報告書用

## ドキュメント作成と管理のガイドライン

### 命名規則

- **ディレクトリ名**: 日本語で、機能や目的を表す名詞
- **ファイル名**: 日本語またはアルファベットで、内容がわかりやすい名前
  - ADRファイル: `NNN-内容.md` 形式（NNNは連番）
  - 機能仕様: `NN_内容.md` 形式（NNは順序を表す番号）
  - README: 各ディレクトリに配置し、そのディレクトリの概要を説明

### 新規ドキュメント作成の流れ

1. 適切なディレクトリを選択（必要に応じて新規ディレクトリを作成）
2. テンプレートディレクトリから適切なテンプレートを選択
3. 命名規則に従ってファイルを作成
4. 内容を作成・レビュー
5. 関連するREADMEファイルにリンクを追加

### AIとの協業における注意点

1. **日本語での記述**: AIとの効率的なコミュニケーションのため、日本語で詳細に記述
2. **構造化された内容**: 見出しや箇条書きなど、構造化された形式で記述
3. **コンテキストの明確化**: 背景情報や目的を明確に記述し、AIが適切に理解できるようにする
4. **用語の一貫性**: プロジェクト固有の用語は一貫して使用し、必要に応じて説明を追加

## 技術スタック概要

Effective Yomimonoは以下の技術スタックで構築されています：

### フロントエンド
- React / Next.js - UIコンポーネントとページ構築
- TailwindCSS - スタイリング
- SWR - データフェッチングと状態管理

### バックエンド
- Hono.js - 軽量APIフレームワーク
- Cloudflare Workers - エッジコンピューティング環境
- Cloudflare D1 - SQLiteベースのデータベース
- Drizzle ORM - タイプセーフなORM

### 認証
- Cloudflare Access - ネットワーク層での認証
- JWT - アプリケーション層での認証

### AI連携
- Claude API - テキスト解析と生成
- Model Context Protocol (MCP) - AI連携の標準プロトコル

## 今後の方針

1. 既存ドキュメントの日本語化と整理の継続
2. 各ディレクトリにREADMEファイルの追加
3. 新機能開発前の機能仕様作成の徹底
4. ADRの継続的な記録と更新
5. AIとの協業のための明確なプロンプトとガイドラインの整備

## 参考リンク

- [Honoドキュメント](https://hono.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare Access](https://www.cloudflare.com/zero-trust/products/access/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Drizzle ORM](https://orm.drizzle.team/)