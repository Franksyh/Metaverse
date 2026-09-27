import { createHash, timingSafeEqual } from "node:crypto";
import { adminCookie, isAdmin } from "../admin-auth.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", "pair_admin=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0");
    return res.status(200).json({ loggedOut: true });
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const secret = process.env.ADMIN_ACCESS_TOKEN || "";
  if (secret.length < 32) return res.status(503).json({ error: "管理者登入尚未設定，請先設定伺服器 ADMIN_ACCESS_TOKEN（至少 32 字元）。" });
  const authorization = req.headers?.authorization || "";
  const supplied = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const digest = value => createHash("sha256").update(value).digest();
  const tokenValid = supplied && timingSafeEqual(digest(secret), digest(supplied));
  if (!tokenValid && !isAdmin(req.headers?.cookie)) {
    return res.status(401).json({ error: "管理者憑證錯誤。" });
  }
  if (tokenValid) res.setHeader("Set-Cookie", adminCookie());
  // Do not infer provider approval or settlement from local configuration.
  return res.status(200).json({
    memberAccess: true,
    payments: "尚未啟用",
    bank: "請至金流官方後台綁定；本站尚未取得綁定狀態",
    orders: "尚未串接訂單資料庫",
    settlement: "尚未串接撥款查詢",
  });
}
