# msal-app-test

日本語 | [English](README-en.md)

## 概要

MSAL.js を使った **Microsoft Entra ID ログイン** と、Azure SDK を用いた **Blob コンテナ一覧取得**を組み込んだ Next.js (App Router) の MPA です。フロントと API を同一プロセスで提供し、Azure Container Apps での 1 コンテナー運用を想定しています。

## ページ構成

- `/` トップ（非ログインでも表示）
- `/login` ログインページ
- `/about` アプリ概要
- `/items` Azure Storage コンテナ一覧
- `/settings` 設定

## 主な機能

- MSAL.js によるサインイン（Microsoft Entra ID）
- `DefaultAzureCredential` で Azure Storage Blob のコンテナ一覧を取得
- 言語切り替え（`/api/lang` を経由して Cookie を設定）
- ヘルスチェック API: `/api/health`

## 必要な環境

- Node.js 20 LTS 以上
- Docker
- Azure CLI（ローカル開発時に `DefaultAzureCredential` を使うため）

## セットアップ

1. 環境変数ファイルを用意

```
cp .env.template .env
```

2. 必要な値を設定

| 変数                                    | 説明                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------- |
| `PORT`                                  | 開発/本番で待ち受けるポート（例: 3000）                                 |
| `NODE_ENV`                              | `development` / `production`                                            |
| `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`        | Entra ID のアプリケーション (クライアント) ID                           |
| `NEXT_PUBLIC_AZURE_AD_TENANT_ID`        | Entra ID のディレクトリ (テナント) ID                                   |
| `NEXT_PUBLIC_AZURE_AD_REDIRECT_URI`     | リダイレクト URI（例: `http://localhost:3000/auth/popup.html`）         |
| `STORAGE_ACCOUNT_URL`                   | Storage アカウント URL（例: `https://{account}.blob.core.windows.net`） |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | （任意）App Insights 接続文字列                                         |

3. 依存関係をインストール

```
npm install
```

4. 開発サーバー起動

```
npm run dev
```

## Microsoft Entra ID の設定

1. Entra ID にアプリ登録を作成
2. リダイレクト URI に `http://localhost:3000/auth/popup.html` を追加
3. 本番で使う場合は `https://<your-domain>/auth/popup.html` も追加

## Azure Storage の設定

- ローカル開発は `az login` でサインインし、Storage への RBAC を付与します
- 例: `Storage Blob Data Reader` ロールをユーザーに割り当て

## Docker 実行

```
docker build -t msal-app-test .
docker run --rm -p 3000:3000 -e PORT=3000 --env-file .env msal-app-test
```

## Azure Container Apps へのデプロイ概要

1. Container Apps 環境、Azure Storage、必要なら ACR を用意
2. イメージをビルドして ACR へ push
3. Container Apps を作成し、環境変数を設定
4. マネージド ID を有効化し、Storage への RBAC を付与

## 仕様の補足

- MSAL のログインは `loginPopup` を利用しています
- 言語切り替えは `/api/lang` を経由して Cookie を更新します（middleware は未使用）
- Azure Storage が未設定の場合は `/api/items` が 500 を返します
