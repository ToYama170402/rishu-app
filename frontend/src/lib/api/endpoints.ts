/** 志望者数（抽選）API エンドポイント（本番） */
export const LECTURES_API_URL =
  process.env.NEXT_PUBLIC_LECTURES_API_URL ?? "https://kurisyushien.org/api";

/** 志望者数デモデータ（ブラウザ側） */
export const LECTURES_DEMO_URL_BROWSER =
  "http://localhost:1313/dammy-data.tsv";

/** 志望者数デモデータ（サーバー側 SSR） */
export const LECTURES_DEMO_URL_SERVER = "http://mock-page:1313/dammy-data.tsv";

/** シラバス API ベース URL（サーバー側 SSR） */
export const SYLLABUS_API_URL =
  process.env.SYLLABUS_API_URL ?? "http://syllabus-backend:8080";

/** シラバス API ベース URL（ブラウザ側 CSR） */
export const SYLLABUS_API_URL_PUBLIC =
  process.env.NEXT_PUBLIC_SYLLABUS_API_URL ?? "http://localhost:8080";
