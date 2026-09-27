import { createHmac, timingSafeEqual } from "node:crypto";

function signature(value) {
  return createHmac("sha256", process.env.ADMIN_ACCESS_TOKEN || "").update(value).digest("hex");
}

export function adminCookie() {
  const expires = String(Date.now() + 3600000);
  return `pair_admin=${expires}.${signature(expires)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`;
}

export function isAdmin(cookie = "") {
  if ((process.env.ADMIN_ACCESS_TOKEN || "").length < 32) return false;
  const value = cookie.split(";").map(item => item.trim()).find(item => item.startsWith("pair_admin="))?.slice(11) || "";
  const [expires, mac] = value.split(".");
  if (!/^\d{13}$/.test(expires || "") || !/^[a-f0-9]{64}$/.test(mac || "")) return false;
  if (Number(expires) <= Date.now() || Number(expires) > Date.now() + 3600000) return false;
  return timingSafeEqual(Buffer.from(signature(expires)), Buffer.from(mac));
}
