// =====================================================================
//  app.js — shared data + helpers. Loaded after Supabase CDN + config.js.
// =====================================================================
(function () {
  const cfg = window.APP_CONFIG || {};
  if (!window.supabase) { console.error("Supabase CDN not loaded before app.js"); return; }
  window.sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
})();

// ---------------------------------------------------------------------
//  CATEGORY TAXONOMY (Construction). Grouped into families so a long
//  list stays scannable. Slugs are stored in the DB; keep them stable.
// ---------------------------------------------------------------------
window.CATEGORY_GROUPS = [
  { group: "Excavators", items: [
    { slug: "crawler_excavator",      label: "Crawler excavators" },
    { slug: "wheeled_excavator",      label: "Wheeled excavators" },
    { slug: "mini_excavator",         label: "Mini / compact excavators" },
    { slug: "long_reach_excavator",   label: "Long-reach excavators" },
    { slug: "demolition_excavator",   label: "Demolition excavators" },
    { slug: "material_handler",       label: "Material handlers" },
    { slug: "mining_shovel",          label: "Mining excavators / shovels" },
  ]},
  { group: "Loaders", items: [
    { slug: "wheel_loader",           label: "Wheel loaders" },
    { slug: "compact_wheel_loader",   label: "Compact wheel loaders" },
    { slug: "skid_steer_loader",      label: "Skid-steer loaders" },
    { slug: "compact_track_loader",   label: "Compact track loaders" },
    { slug: "backhoe_loader",         label: "Backhoe loaders" },
    { slug: "crawler_loader",         label: "Track / crawler loaders" },
    { slug: "telescopic_wheel_loader",label: "Telescopic wheel loaders" },
  ]},
  { group: "Dozers & Graders", items: [
    { slug: "crawler_dozer",          label: "Crawler dozers (bulldozers)" },
    { slug: "wheel_dozer",            label: "Wheel dozers" },
    { slug: "motor_grader",           label: "Motor graders" },
  ]},
  { group: "Hauling & Dumpers", items: [
    { slug: "articulated_dump_truck", label: "Articulated dump trucks (ADT)" },
    { slug: "rigid_dump_truck",       label: "Rigid dump trucks" },
    { slug: "site_dumper",            label: "Site dumpers" },
    { slug: "motor_scraper",          label: "Scrapers" },
  ]},
  { group: "Cranes & Lifting", items: [
    { slug: "all_terrain_crane",      label: "All-terrain mobile cranes" },
    { slug: "rough_terrain_crane",    label: "Rough-terrain cranes" },
    { slug: "truck_mounted_crane",    label: "Truck-mounted cranes" },
    { slug: "crawler_crane",          label: "Crawler cranes" },
    { slug: "tower_crane",            label: "Tower cranes" },
    { slug: "loader_crane",           label: "Loader / knuckle-boom cranes" },
    { slug: "spider_crane",           label: "Mini / spider cranes" },
    { slug: "gantry_crane",           label: "Gantry & overhead cranes" },
    { slug: "port_crane",             label: "Port / marine cranes" },
  ]},
  { group: "Aerial Access (MEWPs)", items: [
    { slug: "scissor_lift",           label: "Scissor lifts" },
    { slug: "articulating_boom_lift", label: "Articulating boom lifts" },
    { slug: "telescopic_boom_lift",   label: "Telescopic boom lifts" },
    { slug: "spider_lift",            label: "Spider / tracked lifts" },
    { slug: "truck_mounted_platform", label: "Truck-mounted platforms" },
  ]},
  { group: "Material Handling", items: [
    { slug: "telehandler",            label: "Telehandlers" },
    { slug: "rotating_telehandler",   label: "Rotating telehandlers" },
    { slug: "counterbalance_forklift",label: "Counterbalance forklifts" },
    { slug: "rough_terrain_forklift", label: "Rough-terrain forklifts" },
    { slug: "reach_stacker",          label: "Reach stackers" },
    { slug: "container_handler",      label: "Container / empty handlers" },
  ]},
  { group: "Concrete & Cement", items: [
    { slug: "truck_concrete_pump",    label: "Truck-mounted concrete pumps" },
    { slug: "stationary_concrete_pump",label: "Trailer / stationary pumps" },
    { slug: "concrete_mixer_truck",   label: "Concrete mixer trucks" },
    { slug: "batching_plant",         label: "Concrete batching plants" },
    { slug: "placing_boom",           label: "Concrete placing booms" },
    { slug: "power_trowel",           label: "Power trowels / floats" },
  ]},
  { group: "Road Building & Compaction", items: [
    { slug: "asphalt_paver",          label: "Asphalt pavers" },
    { slug: "cold_planer",            label: "Cold planers / milling machines" },
    { slug: "single_drum_roller",     label: "Single-drum rollers" },
    { slug: "tandem_roller",          label: "Tandem rollers" },
    { slug: "pneumatic_roller",       label: "Pneumatic-tyred rollers" },
    { slug: "plate_compactor",        label: "Plate compactors" },
    { slug: "trench_roller",          label: "Trench rollers" },
    { slug: "road_sweeper",           label: "Road sweepers" },
  ]},
  { group: "Drilling & Foundations", items: [
    { slug: "piling_rig",             label: "Piling rigs" },
    { slug: "rotary_drill_rig",       label: "Rotary drilling rigs" },
    { slug: "hdd_rig",                label: "Horizontal directional drills" },
    { slug: "surface_drill",          label: "Blast-hole / surface drills" },
    { slug: "diaphragm_wall_rig",     label: "Diaphragm wall rigs" },
    { slug: "soil_mixing_rig",        label: "Soil-mixing rigs" },
  ]},
  { group: "Crushing & Screening", items: [
    { slug: "jaw_crusher",            label: "Jaw crushers" },
    { slug: "cone_crusher",           label: "Cone crushers" },
    { slug: "impact_crusher",         label: "Impact crushers" },
    { slug: "mobile_screen",          label: "Mobile screens" },
    { slug: "trommel_screen",         label: "Trommel screens" },
    { slug: "stacker_conveyor",       label: "Stackers / conveyors" },
  ]},
  { group: "Power & Site Support", items: [
    { slug: "diesel_generator",       label: "Diesel generators" },
    { slug: "lighting_tower",         label: "Lighting towers" },
    { slug: "air_compressor",         label: "Mobile compressors" },
    { slug: "dewatering_pump",        label: "Dewatering pumps" },
    { slug: "site_cabin",             label: "Site accommodation / cabins" },
  ]},
  { group: "Attachments", items: [
    { slug: "hydraulic_breaker",      label: "Hydraulic breakers / hammers" },
    { slug: "bucket_attachment",      label: "Buckets" },
    { slug: "grapple",                label: "Grapples" },
    { slug: "auger",                  label: "Augers" },
    { slug: "pulveriser_shear",       label: "Pulverisers / shears" },
  ]},
];

// flat lookup map (slug -> label) built once
window.CAT_LABEL = (function () {
  const m = {};
  window.CATEGORY_GROUPS.forEach(g => g.items.forEach(i => { m[i.slug] = i.label; }));
  return m;
})();

window.MODES = [
  { slug: "sea",  label: "Sea freight" },
  { slug: "air",  label: "Air freight" },
  { slug: "road", label: "Road freight" },
];

// Rough size classes replace asking the user for tonnes/m³.
// Each carries a representative weight + volume used by the freight model.
window.SIZE_CLASSES = [
  { id: "compact",    label: "Compact / small — fits a container (≈ up to 5 t)", tonnes: 4,  cbm: 25 },
  { id: "medium",     label: "Medium — single low-loader (≈ 5–18 t)",            tonnes: 12, cbm: 45 },
  { id: "large",      label: "Large — heavy low-loader (≈ 18–35 t)",             tonnes: 28, cbm: 70 },
  { id: "heavy",      label: "Heavy — multi-axle / flat-rack (≈ 35–60 t)",       tonnes: 48, cbm: 110 },
  { id: "superheavy", label: "Super-heavy / abnormal load (≈ 60 t+)",            tonnes: 80, cbm: 160 },
];

// GCC origin cities (mapped to an ISO-2 country for rate lookup).
window.GCC_ORIGINS = [
  { country: "SA", country_name: "Saudi Arabia", items: [
    { id: "jeddah",   country: "SA", label: "Jeddah (Jeddah Islamic Port)" },
    { id: "dammam",   country: "SA", label: "Dammam (King Abdulaziz Port)" },
    { id: "jubail",   country: "SA", label: "Jubail Commercial Port" },
    { id: "yanbu",    country: "SA", label: "Yanbu Commercial Port" },
    { id: "kap",      country: "SA", label: "King Abdullah Port (Rabigh)" },
    { id: "riyadh",   country: "SA", label: "Riyadh (dry port / inland)" },
  ]},
  { country: "AE", country_name: "United Arab Emirates", items: [
    { id: "jebelali", country: "AE", label: "Jebel Ali (Dubai)" },
    { id: "dubai",    country: "AE", label: "Dubai (Port Rashid)" },
    { id: "abudhabi", country: "AE", label: "Abu Dhabi (Khalifa Port)" },
    { id: "sharjah",  country: "AE", label: "Sharjah / Khorfakkan" },
    { id: "fujairah", country: "AE", label: "Fujairah" },
  ]},
  { country: "BH", country_name: "Bahrain", items: [
    { id: "hidd",     country: "BH", label: "Hidd (Khalifa Bin Salman Port)" },
    { id: "manama",   country: "BH", label: "Manama" },
  ]},
  { country: "QA", country_name: "Qatar", items: [
    { id: "hamad",    country: "QA", label: "Hamad Port" },
    { id: "doha",     country: "QA", label: "Doha" },
  ]},
];

// ISO-2 country list (trade-relevant; alphabetical handled at render).
window.COUNTRIES = [
  {code:"AF",name:"Afghanistan"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},{code:"AO",name:"Angola"},
  {code:"AR",name:"Argentina"},{code:"AM",name:"Armenia"},{code:"AU",name:"Australia"},{code:"AT",name:"Austria"},
  {code:"AZ",name:"Azerbaijan"},{code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BY",name:"Belarus"},
  {code:"BE",name:"Belgium"},{code:"BJ",name:"Benin"},{code:"BO",name:"Bolivia"},{code:"BA",name:"Bosnia & Herzegovina"},
  {code:"BW",name:"Botswana"},{code:"BR",name:"Brazil"},{code:"BN",name:"Brunei"},{code:"BG",name:"Bulgaria"},
  {code:"BF",name:"Burkina Faso"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},{code:"CA",name:"Canada"},
  {code:"TD",name:"Chad"},{code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CO",name:"Colombia"},
  {code:"CG",name:"Congo (Rep.)"},{code:"CD",name:"Congo (DRC)"},{code:"CR",name:"Costa Rica"},{code:"CI",name:"Côte d'Ivoire"},
  {code:"HR",name:"Croatia"},{code:"CU",name:"Cuba"},{code:"CY",name:"Cyprus"},{code:"CZ",name:"Czechia"},
  {code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},
  {code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},{code:"EE",name:"Estonia"},
  {code:"ET",name:"Ethiopia"},{code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GA",name:"Gabon"},
  {code:"GE",name:"Georgia"},{code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GR",name:"Greece"},
  {code:"GT",name:"Guatemala"},{code:"GN",name:"Guinea"},{code:"GY",name:"Guyana"},{code:"HN",name:"Honduras"},
  {code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},{code:"IN",name:"India"},
  {code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},{code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},
  {code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},{code:"JP",name:"Japan"},
  {code:"JO",name:"Jordan"},{code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KW",name:"Kuwait"},
  {code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Laos"},{code:"LV",name:"Latvia"},{code:"LB",name:"Lebanon"},
  {code:"LY",name:"Libya"},{code:"LT",name:"Lithuania"},{code:"LU",name:"Luxembourg"},{code:"MG",name:"Madagascar"},
  {code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},
  {code:"MR",name:"Mauritania"},{code:"MU",name:"Mauritius"},{code:"MX",name:"Mexico"},{code:"MD",name:"Moldova"},
  {code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},
  {code:"MM",name:"Myanmar"},{code:"NA",name:"Namibia"},{code:"NP",name:"Nepal"},{code:"NL",name:"Netherlands"},
  {code:"NZ",name:"New Zealand"},{code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},
  {code:"MK",name:"North Macedonia"},{code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},
  {code:"PA",name:"Panama"},{code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},
  {code:"PH",name:"Philippines"},{code:"PL",name:"Poland"},{code:"PT",name:"Portugal"},{code:"QA",name:"Qatar"},
  {code:"RO",name:"Romania"},{code:"RU",name:"Russia"},{code:"RW",name:"Rwanda"},{code:"SA",name:"Saudi Arabia"},
  {code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},
  {code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},
  {code:"KR",name:"South Korea"},{code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},
  {code:"SD",name:"Sudan"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},{code:"SY",name:"Syria"},
  {code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},{code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},
  {code:"TG",name:"Togo"},{code:"TT",name:"Trinidad & Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Türkiye"},
  {code:"TM",name:"Turkmenistan"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},{code:"AE",name:"United Arab Emirates"},
  {code:"GB",name:"United Kingdom"},{code:"US",name:"United States"},{code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},
  {code:"VE",name:"Venezuela"},{code:"VN",name:"Vietnam"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},
  {code:"ZW",name:"Zimbabwe"},
];

// ---------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------
window.CURRENCIES = [
  { code: "SAR", label: "🇸🇦 SAR" }, { code: "AED", label: "🇦🇪 AED" }, { code: "BHD", label: "🇧🇭 BHD" },
  { code: "GBP", label: "🇬🇧 GBP" }, { code: "EUR", label: "🇪🇺 EUR" }, { code: "USD", label: "🇺🇸 USD" },
];

const App = {
  catLabel(slug) {
    if (!slug) return "—";
    const m = window.CAT_LABEL || {};
    if (m[slug]) return m[slug];
    return String(slug).replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  },
  countryName(code) { const c = (window.COUNTRIES||[]).find(x => x.code === code); return c ? c.name : code; },
  sizeClass(id) { return (window.SIZE_CLASSES||[]).find(s => s.id === id) || null; },

  // ---- currency / FX (base = SAR) ----
  fxRates: null,
  async loadFx() {
    if (App.fxRates) return App.fxRates;
    try {
      const c = JSON.parse(sessionStorage.getItem("cpe_fx") || "null");
      if (c && (Date.now() - c.t) < 6 * 3600 * 1000 && c.rates) { App.fxRates = c.rates; return App.fxRates; }
    } catch (_) {}
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/SAR", { cache: "no-store" });
      const j = await r.json();
      if (j && j.rates) { App.fxRates = j.rates; try { sessionStorage.setItem("cpe_fx", JSON.stringify({ t: Date.now(), rates: j.rates })); } catch (_) {} }
    } catch (_) { App.fxRates = null; }
    return App.fxRates;
  },
  _ccyResolved: null,
  async resolveCcy() {
    if (App._ccyResolved) return App._ccyResolved;
    let c = null; try { c = localStorage.getItem("cpe_ccy"); } catch (_) {}
    if (!c) { const code = await App.detectCountryCode(); c = App.defaultCcyFor(code || ""); }
    App._ccyResolved = c; return c;
  },
  ccy() { return App._ccyResolved || (function(){ try { return localStorage.getItem("cpe_ccy"); } catch(_) { return null; } })() || "SAR"; },
  setCcy(c) { App._ccyResolved = c; try { localStorage.setItem("cpe_ccy", c); } catch (_) {} },
  defaultCcyFor(code) {
    const EU = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"];
    if (code === "SA") return "SAR"; if (code === "AE") return "AED"; if (code === "BH") return "BHD";
    if (code === "GB") return "GBP"; if (code === "US") return "USD"; if (EU.includes(code)) return "EUR";
    return "USD";
  },
  // convert an SAR amount into a currency; null if no rate
  convertSar(amtSar, ccy) {
    ccy = ccy || App.ccy();
    if (ccy === "SAR") return amtSar;
    if (!App.fxRates || !App.fxRates[ccy]) return null;
    return amtSar * App.fxRates[ccy];
  },
  // convert an amount in some currency back to SAR
  toSar(amt, fromCcy) {
    if (!fromCcy || fromCcy === "SAR") return amt;
    if (!App.fxRates || !App.fxRates[fromCcy]) return null;
    return amt / App.fxRates[fromCcy];
  },
  // format an SAR amount in the active currency (falls back to SAR)
  fmtSar(amtSar, ccy) {
    ccy = ccy || App.ccy();
    const v = App.convertSar(amtSar, ccy);
    if (v == null) return App.money(amtSar, "SAR");
    return App.money(v, ccy);
  },
  // highest discount fraction whose min-qty <= qty
  discountRate(tiers, qty) {
    if (!tiers || typeof tiers !== "object") return 0;
    let best = 0;
    for (const k in tiers) { if (qty >= Number(k)) best = Math.max(best, Number(tiers[k]) || 0); }
    return best;
  },
  // WhatsApp click-to-chat link, or null if no number configured
  waLink(text) {
    const num = (window.APP_CONFIG && APP_CONFIG.CONTACT_WHATSAPP || "").replace(/[^0-9]/g, "");
    if (!num) return null;
    return `https://wa.me/${num}?text=${encodeURIComponent(text || "")}`;
  },


  money(n, ccy = "GBP") {
    if (n == null || isNaN(n)) return "—";
    try { return new Intl.NumberFormat("en-GB", { style: "currency", currency: ccy, maximumFractionDigits: 0 }).format(n); }
    catch (_) { return ccy + " " + Math.round(n).toLocaleString(); }
  },
  pct(r) { return (r == null ? 0 : r * 100).toFixed((r * 100) % 1 ? 1 : 0) + "%"; },
  date(s) { return s ? new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"; },
  esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); },
  toast(msg, isErr) {
    const t = document.createElement("div");
    t.className = "toast" + (isErr ? " err" : ""); t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 3800);
  },

  // ---- select builders ----
  fillCategorySelect(sel, opts) {
    opts = opts || {};
    let html = opts.includeAll ? '<option value="">All categories</option>' : '<option value="">Select category…</option>';
    html += window.CATEGORY_GROUPS.map(g =>
      `<optgroup label="${App.esc(g.group)}">` +
      g.items.map(i => `<option value="${i.slug}">${App.esc(i.label)}</option>`).join("") +
      `</optgroup>`).join("");
    sel.innerHTML = html;
  },
  fillModeSelect(sel) { sel.innerHTML = window.MODES.map(m => `<option value="${m.slug}">${m.label}</option>`).join(""); },
  fillSizeSelect(sel) {
    sel.innerHTML = '<option value="">Select rough size…</option>' +
      window.SIZE_CLASSES.map(s => `<option value="${s.id}">${App.esc(s.label)}</option>`).join("");
  },
  fillOriginSelect(sel) {
    sel.innerHTML = window.GCC_ORIGINS.map(g =>
      `<optgroup label="${App.esc(g.country_name)}">` +
      g.items.map(i => `<option value="${i.id}" data-country="${i.country}">${App.esc(i.label)}</option>`).join("") +
      `</optgroup>`).join("");
  },
  fillCountrySelect(sel, opts) {
    opts = opts || {};
    const list = window.COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
    let html = opts.includeBlank ? '<option value="">Select…</option>' : "";
    if (opts.topCode) {
      const top = list.find(c => c.code === opts.topCode);
      if (top) html += `<option value="${top.code}" selected>${App.esc(top.name)}</option><option disabled>──────────</option>`;
    }
    html += list.map(c => `<option value="${c.code}">${App.esc(c.name)}</option>`).join("");
    sel.innerHTML = html;
  },

  // Best-effort IP -> ISO-2 country code (runs in the visitor's browser).
  async detectCountryCode() {
    const grab = async (url, key) => {
      try { const r = await fetch(url, { cache: "no-store" }); if (!r.ok) return null; const j = await r.json(); return ((j[key]||"")+"").toUpperCase() || null; }
      catch (_) { return null; }
    };
    return (await grab("https://ipapi.co/json/", "country")) ||
           (await grab("https://ipwho.is/", "country_code")) || null;
  },

  // ---- auth ----
  async session() { const { data } = await window.sb.auth.getSession(); return data.session || null; },
  async profile() {
    const s = await this.session(); if (!s) return null;
    const { data } = await window.sb.from("profiles").select("*").eq("id", s.user.id).single();
    return data || null;
  },
  async signOut() { await window.sb.auth.signOut(); location.reload(); },

  // ---- chrome ----
  nav(current) {
    const b = (window.APP_CONFIG && window.APP_CONFIG.BRAND) || "Machinery Desk";
    const link = (href, label, id) => `<a href="${href}" ${id === current ? 'aria-current="page"' : ""}>${label}</a>`;
    return `
      <header class="nav"><div class="wrap">
        <a class="brand" href="index.html">${App.esc(b)}<small>European-origin plant · export desk</small></a>
        <nav>
          ${link("index.html","Buy","buy")}
          ${link("sell.html","Sell","sell")}
          ${link("country-cost.html","Landed cost","cost")}
          <a href="basket.html" id="nav-basket" ${current === "basket" ? 'aria-current="page"' : ""}>Basket</a>
          ${link("account.html","Account","account")}
          <span id="nav-admin"></span>
          <select id="nav-ccy" class="nav-ccy" aria-label="Currency"></select>
          <span id="nav-auth"></span>
        </nav>
      </div></header>`;
  },
  async paintNavAuth() {
    App.paintBasketCount();
    App.loadFx();
    App.mountWhatsApp();
    const cc = document.getElementById("nav-ccy");
    if (cc && !cc.dataset.ready) {
      cc.dataset.ready = "1";
      cc.innerHTML = window.CURRENCIES.map(c => `<option value="${c.code}">${App.esc(c.label)}</option>`).join("");
      cc.value = await App.resolveCcy();
      cc.onchange = () => { App.setCcy(cc.value); location.reload(); };
    }
    const el = document.getElementById("nav-auth"); if (!el) return;
    const s = await this.session();
    const adm = document.getElementById("nav-admin");
    if (s) { el.innerHTML = `<a href="#" id="nav-signout">Sign out</a>`;
      document.getElementById("nav-signout").onclick = (e) => { e.preventDefault(); App.signOut(); };
      if (adm) { const p = await App.profile(); adm.innerHTML = (p && p.role === "admin") ? `<a href="admin.html">Admin</a>` : ""; }
    }
    else { el.innerHTML = ""; if (adm) adm.innerHTML = ""; }
  },
  paintBasketCount() {
    const el = document.getElementById("nav-basket"); if (!el) return;
    const n = window.Basket ? Basket.count() : 0;
    el.textContent = n ? `Basket (${n})` : "Basket";
  },

  // Shared landed-cost math (mirrors country-cost.html) for ONE unit.
  // rate may be null (freight omitted). Returns the cost components.
  landed(value, rule, rate, sz, cat) {
    value = Number(value) || 0;
    const tonnes = sz ? sz.tonnes : 0, cbm = sz ? sz.cbm : 0;
    let freight = 0;
    if (rate) freight = Number(rate.base_cost||0) + Number(rate.per_ton||0) * tonnes + Number(rate.per_cbm||0) * cbm;
    const insurance = value * 0.01;
    const cif = value + freight + insurance;
    const duties = (rule && rule.duty_rates) || {};
    const dutyRate = (cat in duties) ? Number(duties[cat]) : (("default" in duties) ? Number(duties.default) : 0);
    const duty = cif * dutyRate;
    const vatRate = (rule && Number(rule.import_vat_rate)) || 0;
    const vat = (cif + duty) * vatRate;
    return { freight, insurance, cif, dutyRate, duty, vatRate, vat, total: cif + duty + vat };
  },
  mountWhatsApp() {
    if (document.getElementById("wa-float")) return;
    const link = App.waLink("Hello, I have an enquiry about your machinery.");
    if (!link) return;
    const a = document.createElement("a");
    a.id = "wa-float"; a.href = link; a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "Contact us on WhatsApp");
    a.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9999;width:54px;height:54px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.25);text-decoration:none";
    a.innerHTML = `<svg width="30" height="30" viewBox="0 0 32 32" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.8.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.8 1 1-4.7-.2-.4C5.5 18.4 5 16.7 5 15c0-6.1 4.9-11 11-11s11 4.9 11 11-4.9 9.8-11 9.8zm5.4-7.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3z"/></svg>`;
    document.body.appendChild(a);
  },
  footer() {
    const email = (window.APP_CONFIG && window.APP_CONFIG.CONTACT_EMAIL) || "desk@example.com";
    return `<footer class="footer"><div class="wrap">
        <strong>Indicative information only.</strong> Listings are summaries and landed-cost figures are
        estimates, not a customs ruling, tax advice or a binding quote. Confirm duty, VAT, conformity
        and export-control status with a licensed customs broker before you contract.<br><br>
        Contact <a href="mailto:${App.esc(email)}">${App.esc(email)}</a>.
        We do not publish seller identities or buyer contact details.
      </div></footer>`;
  },
};
window.App = App;

// ---- Basket (localStorage; persists on the visitor's device) ----------
window.Basket = {
  KEY: "cpe_basket",
  get() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (_) { return []; } },
  save(items) { try { localStorage.setItem(this.KEY, JSON.stringify(items)); } catch (_) {} if (window.App) App.paintBasketCount(); },
  add(item) {
    const items = this.get();
    const ex = items.find(i => i.id === item.id);
    const max = item.max || 99;
    if (ex) ex.qty = Math.min((ex.qty || 1) + (item.qty || 1), max);
    else items.push({ id: item.id, model: item.model, title: item.title, category: item.category,
                      transport_class: item.transport_class, qty: Math.min(item.qty || 1, max), max });
    this.save(items);
  },
  setQty(id, qty) {
    const items = this.get(); const it = items.find(i => i.id === id);
    if (it) it.qty = Math.max(0, Math.min(qty, it.max || 99));
    this.save(items.filter(i => i.qty > 0));
  },
  remove(id) { this.save(this.get().filter(i => i.id !== id)); },
  clear() { this.save([]); },
  count() { return this.get().reduce((n, i) => n + (i.qty || 0), 0); },
};
