// =====================================================================
//  config.js — fill these in, then never commit real keys to a public repo.
//  The anon key is safe for the browser (RLS protects your data),
//  but treat the service_role key as a secret and NEVER put it here.
// =====================================================================
window.APP_CONFIG = {
  // From Supabase dashboard → Project Settings → API
  SUPABASE_URL: "https://qaxdcqynqghwymbncnyl.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_th1ezFhvSLR3d1Vk1p3zww_g6i7H1sh",
  // Storage buckets created by schema.sql — leave as-is unless you renamed them
  PHOTOS_BUCKET: "machinery-photos",
  DOCS_BUCKET: "machinery-docs",
  // Default origin for the landed-cost tool (ISO-2). Most stock ships from KSA.
  DEFAULT_ORIGIN: "SA",
  // Company-facing copy
  BRAND: "Continental Plant Exports",
  CONTACT_EMAIL: "desk@example.com",
};
