export type Locale = "ja" | "en";

export const defaultLocale: Locale = "ja";

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

export const resources = {
  ja: {
    siteTitle: "MSAL ログインデモ",
    siteTagline: "Microsoft Entra ID と Azure SDK を使ったミニマム構成",
    navHome: "トップ",
    navAbout: "このアプリについて",
    navItems: "ストレージ",
    navSettings: "設定",
    navLogin: "ログイン",
    navLogout: "ログアウト",
    languageLabel: "言語",
    heroTitle: "静かなログイン体験を、確かな UI で。",
    heroSubtitle:
      "MSAL.js を使ったサインインと Azure Storage 連携を、1 コンテナ構成でまとめました。",
    heroCtaPrimary: "ログインページへ",
    heroCtaSecondary: "ストレージを確認",
    loginTitle: "ログイン",
    loginLead: "Microsoft Entra ID でサインインしてアカウント情報を表示します。",
    loginButton: "Microsoft でログイン",
    loginSuccess: "ログイン済みです。",
    loginError: "ログインに失敗しました。",
    accountTitle: "アカウント情報",
    accountSignedOut: "現在は未ログインです。",
    accountSignedIn: "ログイン済みアカウント",
    accountTenant: "テナント ID",
    accountUsername: "ユーザー名",
    accountName: "表示名",
    accountBackHome: "トップページへ戻る",
    aboutTitle: "このアプリについて",
    aboutBody:
      "Next.js App Router で複数ページ構成を作成し、MSAL.js と Azure SDK を統合しています。",
    itemsTitle: "Azure Storage",
    itemsLead:
      "DefaultAzureCredential で Blob コンテナ一覧を取得します。",
    itemsLoading: "読み込み中...",
    itemsEmpty: "コンテナが見つかりませんでした。",
    itemsError: "コンテナ一覧の取得に失敗しました。",
    settingsTitle: "設定",
    settingsBody:
      "言語設定やログイン状態は Cookie とローカルストレージで保持されます。",
    footerNote: "Azure Container Apps を前提とした 1 コンテナ構成",
    footerCopyright: "© 2026 MSAL App Template",
  },
  en: {
    siteTitle: "MSAL Login Demo",
    siteTagline: "Minimal MSAL.js + Azure SDK setup",
    navHome: "Home",
    navAbout: "About",
    navItems: "Storage",
    navSettings: "Settings",
    navLogin: "Login",
    navLogout: "Logout",
    languageLabel: "Language",
    heroTitle: "Quiet login flow, confident UI.",
    heroSubtitle:
      "A single-container build that pairs MSAL.js sign-in with Azure Storage integration.",
    heroCtaPrimary: "Go to login",
    heroCtaSecondary: "Check storage",
    loginTitle: "Login",
    loginLead: "Sign in with Microsoft Entra ID to show your account details.",
    loginButton: "Sign in with Microsoft",
    loginSuccess: "You are signed in.",
    loginError: "Login failed.",
    accountTitle: "Account details",
    accountSignedOut: "You are currently signed out.",
    accountSignedIn: "Signed-in account",
    accountTenant: "Tenant ID",
    accountUsername: "Username",
    accountName: "Display name",
    accountBackHome: "Back to home",
    aboutTitle: "About this app",
    aboutBody:
      "Built with Next.js App Router, integrating MSAL.js and the Azure SDK.",
    itemsTitle: "Azure Storage",
    itemsLead:
      "Lists Blob containers with DefaultAzureCredential.",
    itemsLoading: "Loading...",
    itemsEmpty: "No containers were found.",
    itemsError: "Failed to load containers.",
    settingsTitle: "Settings",
    settingsBody:
      "Language selection uses a cookie; MSAL uses local storage for auth state.",
    footerNote: "Single-container build ready for Azure Container Apps",
    footerCopyright: "© 2026 MSAL App Template",
  },
} as const;

export type ResourceKey = keyof typeof resources.ja;

export const getDictionary = (locale: Locale) => resources[locale] ?? resources[defaultLocale];
