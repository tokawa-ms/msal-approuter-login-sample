# ドキュメント

日本語 | [English](README-en.md)

## 目的

本ドキュメントは、現時点の実装内容・認証フロー・必要な設定を体系的に整理したものです。

## 実装概要

- Next.js App Router を使った MPA（`/`, `/login`, `/about`, `/items`, `/settings`）
- API ルート
  - `/api/health`: ヘルスチェック
  - `/api/lang`: 言語切り替え用 Cookie 設定（proxy）
  - `/api/items`: 旧 API の代替で 410 を返す（Graph はクライアントから取得）
- MSAL.js + Microsoft Graph API を同一コンテナで提供
- UI は Tailwind CSS で構築

## 認証フロー（Microsoft Entra ID）

1. `AppProviders` が `PublicClientApplication` を初期化し、`handleRedirectPromise()` でリダイレクト結果を処理します。
2. `/login` から `loginRedirect()` を実行し、Entra ID のサインインに遷移します。
3. サインイン後、MSAL が `sessionStorage` にトークンを保存し、`activeAccount` を設定します。
4. `/items` で `acquireTokenSilent()` を試行し、Microsoft Graph API (`/me`) を呼び出します。
5. `interaction_required` が発生した場合は `acquireTokenRedirect()` と `prompt: "consent"` で追加同意を促します。
6. ログアウトは `logoutRedirect()` で実施します。

## 言語切り替えフロー

- `LanguageSwitcher` が `/api/lang?lang=...&redirect=...` に遷移します。
- `/api/lang` が `app_lang` Cookie を設定し、指定ページへリダイレクトします。
- middleware を使わず proxy で切り替えを実装しています。

## 設定・環境変数

クライアント・サーバー共通で起動時に Zod による検証を行います。

| 変数                                    | 用途                                                | 必須 |
| --------------------------------------- | --------------------------------------------------- | ---- |
| `PORT`                                  | HTTP 待ち受けポート                                 | ✅   |
| `NODE_ENV`                              | `development` / `production` / `test`               | ✅   |
| `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`        | Entra ID アプリ (クライアント) ID                   | ✅   |
| `NEXT_PUBLIC_AZURE_AD_TENANT_ID`        | Entra ID ディレクトリ (テナント) ID                 | ✅   |
| `NEXT_PUBLIC_AZURE_AD_REDIRECT_URI`     | リダイレクト URI                                    | ✅   |
| `NEXT_PUBLIC_DEBUG_TOKEN`               | トークン表示デバッグ ("1" で有効)                  | 任意 |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | Application Insights 送信用接続文字列              | 任意 |

## Microsoft Entra ID / Graph 設定

- Entra ID でアプリ登録を作成し、リダイレクト URI に `/auth/popup.html` を登録します。
- Microsoft Graph の `User.Read` を許可します。
- 追加同意が必要な場合、`/items` で許可ボタンを表示します。

## 補足

- 実装は 1 コンテナ (`next start`) で動作する構成です。
- `NEXT_PUBLIC_DEBUG_TOKEN=1` のとき、`/items` にトークン情報のデバッグ表示が出ます（共有禁止）。

## 関連ファイル

- `src/components/providers/AppProviders.tsx`
- `src/components/login/LoginClient.tsx`
- `src/components/items/ItemsClient.tsx`
- `src/lib/msal/config.ts`
- `src/lib/config/client-env.ts`
- `src/lib/config/server-env.ts`
