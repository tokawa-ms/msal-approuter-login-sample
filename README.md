# NSAL.js + App Router ログイン実装サンプル

日本語 | [English](README-en.md)

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![MSAL.js](https://img.shields.io/badge/MSAL.js-5E5E5E?logo=microsoft&logoColor=white)
![Microsoft Graph](https://img.shields.io/badge/Microsoft%20Graph-5E5E5E?logo=microsoft&logoColor=white)
![Azure Container Apps](https://img.shields.io/badge/Azure%20Container%20Apps-0078D4?logo=microsoftazure&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## 概要

MSAL.js を使った **Microsoft Entra ID ログイン** と、Microsoft Graph API を用いた **プロフィール情報の取得**を組み込んだ Next.js (App Router) の MPA です。フロントと API を同一プロセスで提供し、Azure Container Apps での 1 コンテナー運用を想定しています。

## ページ構成

- `/` トップ（非ログインでも表示）
- `/login` ログインページ
- `/about` アプリ概要
- `/items` Microsoft Graph のプロフィール情報
- `/settings` 設定

## 主な機能

- MSAL.js によるサインイン（Microsoft Entra ID）
- Microsoft Graph API で本人のプロフィール情報を取得
- 言語切り替え（`/api/lang` を経由して Cookie を設定）
- ヘルスチェック API: `/api/health`

## ドキュメント

- 実装概要・認証フロー・設定の詳細は [/docs/README.md](docs/README.md) を参照してください。
- English documentation: [/docs/README-en.md](docs/README-en.md)

## 必要な環境

- Node.js 20 LTS 以上
- Docker
- Azure CLI（ローカル開発で必要な場合）

## セットアップ

1. 環境変数ファイルを用意

```
cp .env.template .env
```

2. 必要な値を設定

| 変数                                    | 説明                                                            |
| --------------------------------------- | --------------------------------------------------------------- |
| `PORT`                                  | 開発/本番で待ち受けるポート（例: 3000）                         |
| `NODE_ENV`                              | `development` / `production`                                    |
| `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`        | Entra ID のアプリケーション (クライアント) ID                   |
| `NEXT_PUBLIC_AZURE_AD_TENANT_ID`        | Entra ID のディレクトリ (テナント) ID                           |
| `NEXT_PUBLIC_AZURE_AD_REDIRECT_URI`     | リダイレクト URI（例: `http://localhost:3000/auth/popup.html`） |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | （任意）App Insights 接続文字列                                 |

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

## Microsoft Graph の設定

- Entra ID のアプリ登録で Microsoft Graph の `User.Read` 権限を追加してください
- 初回アクセス時に同意画面が表示されます

## Docker 実行

```
docker build -t msal-app-test .
docker run --rm -p 3000:3000 -e PORT=3000 --env-file .env msal-app-test
```

## Azure Container Apps へのデプロイ概要

1. Container Apps 環境、必要なら ACR を用意
2. イメージをビルドして ACR へ push
3. Container Apps を作成し、環境変数を設定
4. マネージド ID を有効化（必要に応じて）

## 仕様の補足

- MSAL のログインは `loginRedirect` を利用しています
- 言語切り替えは `/api/lang` を経由して Cookie を更新します（middleware は未使用）
- Microsoft Graph の同意が必要な場合、プロフィール情報の取得で案内が出ます
