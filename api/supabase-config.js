function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.setHeader("Access-Control-Max-Age", "86400");
  return res;
}

function sendJson(res, status, data) {
  applyCors(res);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(status).json(data);
}

function firstEnvValue(...keys) {
  for (const key of keys) {
    const value = String(process.env[key] || "").trim();
    if (value) return value;
  }
  return "";
}

function validSupabaseUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

// Supabase publishable keys are intended for browser clients. All data access
// remains governed by the Row Level Security policies in the migration. Vercel
// environment variables take precedence so this fallback can be rotated there.
const FALLBACK_PUBLIC_CONFIG = {
  url: "https://gzluprbuvpjcplfryifk.supabase.co",
  anonKey: "sb_publishable_upe_aQ0fYHDhHp9Ti8dXYw_P3RdVesH",
};

export default function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return sendJson(res, 405, { error: "Method not allowed" });

  // The browser-safe anon key is intentionally public. Never expose a service-role key here.
  const configuredUrl = firstEnvValue("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const configuredKey = firstEnvValue(
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
  const hasEnvironmentOverride = Boolean(configuredUrl || configuredKey);
  const url = hasEnvironmentOverride ? configuredUrl : FALLBACK_PUBLIC_CONFIG.url;
  const anonKey = hasEnvironmentOverride ? configuredKey : FALLBACK_PUBLIC_CONFIG.anonKey;
  const enabled = validSupabaseUrl(url) && Boolean(anonKey);

  return sendJson(res, 200, {
    enabled,
    url: enabled ? url : "",
    anonKey: enabled ? anonKey : "",
  });
}
