import React, { useState } from "react";
import { IDoc, ISpark } from "./icons";

/* ==================== ERD ==================== */
type Entity = {
  name: string; x: number; y: number; planned?: boolean;
  fields: [string, string][]; // [name, type]
};

const ENTITIES: Entity[] = [
  { name: "admins", x: 40, y: 60, fields: [["id", "uuid PK"], ["username", "varchar(40) UQ"], ["password_hash", "text"], ["role", "enum"], ["created_at", "timestamptz"]] },
  { name: "visits", x: 40, y: 250, fields: [["id", "bigserial PK"], ["visitor_key", "varchar(64)"], ["date", "date"], ["count", "int"], ["user_agent", "text"], ["last_seen", "timestamptz"]] },
  { name: "settings", x: 40, y: 470, fields: [["key", "varchar PK"], ["value", "jsonb"], ["updated_at", "timestamptz"]] },
  { name: "categories", x: 310, y: 60, fields: [["id", "uuid PK"], ["name", "varchar(60)"], ["slug", "varchar(60) UQ"], ["icon", "varchar(30)"], ["created_at", "timestamptz"]] },
  { name: "ledger_entries", x: 310, y: 300, fields: [["id", "uuid PK"], ["admin_id", "uuid FK"], ["order_id", "uuid FK NULL"], ["type", "enum in|out"], ["label", "varchar(140)"], ["amount", "numeric(12,0)"], ["date", "timestamptz"], ["created_at", "timestamptz"]] },
  { name: "products", x: 580, y: 60, fields: [["id", "uuid PK"], ["category_id", "uuid FK"], ["name", "varchar(90)"], ["slug", "varchar(90) UQ"], ["description", "text"], ["price", "numeric(12,0)"], ["currency", "char(3) IQD"], ["size", "varchar(40)"], ["stock", "int"], ["image_url", "text"], ["badge", "varchar(40) NULL"], ["is_featured", "bool"], ["created_at", "timestamptz"]] },
  { name: "order_items", x: 580, y: 400, fields: [["id", "uuid PK"], ["order_id", "uuid FK"], ["product_id", "uuid FK"], ["product_name", "varchar(90)"], ["unit_price", "numeric(12,0)"], ["qty", "int"], ["line_total", "numeric(12,0)"]] },
  { name: "payments", x: 580, y: 630, planned: true, fields: [["id", "uuid PK"], ["order_id", "uuid FK"], ["provider", "enum"], ["amount", "numeric(12,0)"], ["status", "enum"], ["provider_ref", "varchar NULL"], ["created_at", "timestamptz"]] },
  { name: "orders", x: 860, y: 60, fields: [["id", "uuid PK"], ["order_no", "int UQ"], ["customer_name", "varchar(70)"], ["phone", "varchar(15)"], ["governorate", "varchar(30)"], ["address", "text"], ["notes", "text NULL"], ["subtotal", "numeric(12,0)"], ["delivery_fee", "numeric(12,0)"], ["total", "numeric(12,0)"], ["status", "enum"], ["created_at", "timestamptz"], ["delivered_at", "timestamptz NULL"]] },
  { name: "deliveries", x: 860, y: 400, fields: [["id", "uuid PK"], ["order_id", "uuid FK UQ"], ["carrier", "varchar(50)"], ["driver_name", "varchar(60)"], ["driver_phone", "varchar(15)"], ["tracking_no", "varchar(40) NULL"], ["governorate", "varchar(30)"], ["status", "enum"], ["shipped_at", "timestamptz"], ["delivered_at", "timestamptz NULL"]] },
];

const boxH = (e: Entity) => 36 + e.fields.length * 19 + 8;

const RELATIONS: { pts: [number, number][]; l1: string; l2: string; dashed?: boolean }[] = [
  { pts: [[540, 130], [580, 130]], l1: "1", l2: "n" },
  { pts: [[695, 351], [695, 400]], l1: "1", l2: "n" },
  { pts: [[860, 230], [810, 450]], l1: "1", l2: "n" },
  { pts: [[975, 315], [975, 400]], l1: "1", l2: "1" },
  { pts: [[270, 150], [310, 340]], l1: "1", l2: "n" },
  { pts: [[880, 315], [880, 362], [546, 362]], l1: "1", l2: "n" },
  { pts: [[800, 630], [872, 315]], l1: "1", l2: "1", dashed: true },
];

function Erd() {
  return (
    <div dir="ltr" className="overflow-x-auto rounded-2xl border-2 border-ink/10 bg-olive-950">
      <svg viewBox="0 0 1130 820" className="min-w-[860px] w-full h-auto">
        <defs>
          <pattern id="erdots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#55663c" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="1130" height="820" fill="url(#erdots)" />

        {RELATIONS.map((r, i) => {
          const d = r.pts.map((p, j) => `${j === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
          const [sx, sy] = r.pts[0];
          const [ex, ey] = r.pts[r.pts.length - 1];
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={r.dashed ? "#d99c2b" : "#a9b584"} strokeWidth="2" strokeDasharray={r.dashed ? "7 6" : undefined} />
              <circle cx={sx} cy={sy} r="4" fill={r.dashed ? "#d99c2b" : "#a9b584"} />
              <circle cx={ex} cy={ey} r="4" fill={r.dashed ? "#d99c2b" : "#a9b584"} />
              <text x={sx + 8} y={sy - 6} fill="#e5b356" fontSize="13" fontWeight="800" fontFamily="Tajawal">{r.l1}</text>
              <text x={ex + 8} y={ey + 16} fill="#e5b356" fontSize="13" fontWeight="800" fontFamily="Tajawal">{r.l2}</text>
            </g>
          );
        })}

        {ENTITIES.map((e) => {
          const h = boxH(e);
          return (
            <g key={e.name}>
              <rect x={e.x} y={e.y} width="230" height={h} rx="12" fill="#202816" stroke={e.planned ? "#d99c2b" : "#6f8050"} strokeWidth={e.planned ? 2 : 1.5} strokeDasharray={e.planned ? "8 5" : undefined} />
              <rect x={e.x} y={e.y} width="230" height="36" rx="12" fill={e.planned ? "#3a2f10" : "#2c371f"} />
              <rect x={e.x} y={e.y + 24} width="230" height="12" fill={e.planned ? "#3a2f10" : "#2c371f"} />
              <text x={e.x + 14} y={e.y + 24} fill={e.planned ? "#e5b356" : "#f3ddb0"} fontSize="15" fontWeight="800" fontFamily="ui-monospace, monospace">{e.name}</text>
              {e.planned && (
                <text x={e.x + 216} y={e.y + 23} fill="#d99c2b" fontSize="10" fontWeight="800" fontFamily="Tajawal" textAnchor="end">قريباً</text>
              )}
              {e.fields.map(([f, t], i) => (
                <g key={f}>
                  <text x={e.x + 14} y={e.y + 55 + i * 19} fill={t.includes("PK") || t.includes("FK") ? "#e5b356" : "#c8d1a9"} fontSize="12.5" fontWeight="700" fontFamily="ui-monospace, monospace">{f}</text>
                  <text x={e.x + 216} y={e.y + 55 + i * 19} fill="#8a9a6b" fontSize="10.5" fontWeight="600" fontFamily="ui-monospace, monospace" textAnchor="end">{t}</text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ==================== مواصفات الـ API ==================== */
type Ep = {
  m: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  auth: "عام" | "مدير";
  desc: string;
  req?: string;
  res: string;
  planned?: boolean;
};

type Group = { id: string; title: string; icon?: string; eps: Ep[] };

const j = (o: unknown) => JSON.stringify(o, null, 2);

const GROUPS: Group[] = [
  {
    id: "api-auth", title: "المصادقة — Auth",
    eps: [
      {
        m: "POST", path: "/api/v1/auth/login", auth: "عام",
        desc: "دخول مدير الموقع. يرجع رمز JWT لمدة ١٥ دقيقة مع refresh token.",
        req: j({ username: "admin", password: "••••••••" }),
        res: j({ ok: true, data: { token: "eyJhbGciOi…", refresh_token: "rt_8f2…", expires_in: 900, admin: { id: "uuid", username: "admin", role: "owner" } } }),
      },
      {
        m: "POST", path: "/api/v1/auth/refresh", auth: "عام",
        desc: "تجديد رمز الوصول باستخدام refresh token.",
        req: j({ refresh_token: "rt_8f2…" }),
        res: j({ ok: true, data: { token: "eyJhbGciOi…", expires_in: 900 } }),
      },
      {
        m: "POST", path: "/api/v1/auth/logout", auth: "مدير",
        desc: "إبطال الـ refresh token الحالي.",
        res: j({ ok: true, data: null }),
      },
    ],
  },
  {
    id: "api-catalog", title: "الكتالوج — Categories & Products",
    eps: [
      {
        m: "GET", path: "/api/v1/categories", auth: "عام",
        desc: "كل التصنيفات مع عدد منتجاتها.",
        res: j({ ok: true, data: [{ id: "uuid", name: "ألبان وأجبان", slug: "dairy", icon: "cheese", products_count: 2 }] }),
      },
      {
        m: "POST", path: "/api/v1/categories", auth: "مدير",
        desc: "إضافة تصنيف جديد.",
        req: j({ name: "مخللات", icon: "jar" }),
        res: j({ ok: true, data: { id: "uuid", name: "مخللات", slug: "pickles", icon: "jar" } }),
      },
      { m: "PATCH", path: "/api/v1/categories/:id", auth: "مدير", desc: "تعديل اسم أو أيقونة التصنيف.", res: j({ ok: true, data: { id: "uuid", name: "مخللات بلدية" } }) },
      { m: "DELETE", path: "/api/v1/categories/:id", auth: "مدير", desc: "حذف تصنيف (يفشل إذا فيه منتجات — 409).", res: j({ ok: false, error: { code: "CATEGORY_NOT_EMPTY", message: "انقل منتجات التصنيف قبل حذفه" } }) },
      {
        m: "GET", path: "/api/v1/products?category=dairy&search=لبنة&page=1&limit=12", auth: "عام",
        desc: "قائمة منتجات مع فلترة وبحث وترقيم صفحات.",
        res: j({
          ok: true,
          data: [{ id: "uuid", slug: "labneh-baladi", name: "لبنة بلدية بحبة البركة", category: { id: "uuid", slug: "dairy" }, price: 7000, currency: "IQD", size: "مرطبان ١ كغم", stock: 40, image_url: "https://cdn.bait-souri.iq/p/labneh.webp", badge: "صناعة يدنا", is_featured: true }],
          meta: { page: 1, limit: 12, total: 12, pages: 1 },
        }),
      },
      { m: "GET", path: "/api/v1/products/:slug", auth: "عام", desc: "تفاصيل منتج واحد مع منتجات مقترحة من نفس التصنيف.", res: j({ ok: true, data: { "…": "كائن المنتج + related: []" } }) },
      {
        m: "POST", path: "/api/v1/products", auth: "مدير",
        desc: "إضافة منتج. الصورة تُرفع multipart/form-data (حقل image) أو كرابط (image_url).",
        req: `Content-Type: multipart/form-data
name = "مكدوس سوري على أصوله"
category_id = "uuid"
price = 14000
size = "مرطبان ١ كغم"
stock = 30
description = "…"
image = <file: makdous.webp>`,
        res: j({ ok: true, data: { id: "uuid", slug: "makdous-souri", image_url: "https://cdn.bait-souri.iq/p/makdous.webp" } }),
      },
      { m: "PATCH", path: "/api/v1/products/:id", auth: "مدير", desc: "تعديل أي حقل من حقول المنتج (جزئي).", req: j({ price: 13000, badge: "عرض الأسبوع" }), res: j({ ok: true, data: { "…": "المنتج بعد التعديل" } }) },
      { m: "PATCH", path: "/api/v1/products/:id/stock", auth: "مدير", desc: "تعديل المخزون بزيادة أو نقصان نسبي (delta).", req: j({ delta: -2 }), res: j({ ok: true, data: { id: "uuid", stock: 28 } }) },
      { m: "DELETE", path: "/api/v1/products/:id", auth: "مدير", desc: "حذف منتج (soft delete — is_archived).", res: j({ ok: true, data: null }) },
    ],
  },
  {
    id: "api-orders", title: "الطلبات — Orders (واتساب)",
    eps: [
      {
        m: "POST", path: "/api/v1/orders", auth: "عام",
        desc: "إنشاء طلب من سلة الزبون. يتحقق من المخزون والأسعار خادمياً، يخصم الكمية، ويرجع رابط واتساب برسالة الطلب كاملة جاهزة للنسخ.",
        req: j({
          items: [{ product_id: "uuid", qty: 2 }],
          customer: { name: "أبو أحمد", phone: "07701234567", governorate: "ديالى", address: "بعقوبة — حي المعلمين", notes: "" },
        }),
        res: j({
          ok: true,
          data: {
            id: "uuid", order_no: 104, status: "new",
            items: [{ product_id: "uuid", product_name: "مكدوس سوري", unit_price: 14000, qty: 2, line_total: 28000 }],
            subtotal: 28000, total: 28000, currency: "IQD",
            whatsapp: { phone: "9647887356906", message: "🧺 *طلب جديد — البيت السوري*\n…", deep_link: "https://wa.me/9647887356906?text=…" },
          },
        }),
      },
      { m: "GET", path: "/api/v1/orders?status=new&from=2025-01-01&to=2025-01-31&page=1", auth: "مدير", desc: "قائمة الطلبات مع فلترة بالحالة والتاريخ.", res: j({ ok: true, data: ["…"], meta: { page: 1, total: 104 } }) },
      { m: "GET", path: "/api/v1/orders/:id", auth: "مدير", desc: "تفاصيل طلب مع أصنافه وحالة توصيله وقيده المحاسبي.", res: j({ ok: true, data: { "…": "order + items + delivery + ledger_entry" } }) },
      {
        m: "PATCH", path: "/api/v1/orders/:id/status", auth: "مدير",
        desc: "تغيير حالة الطلب: new → preparing → delivering → delivered | cancelled. عند delivered يُنشأ قيد «وارد» تلقائياً في المحاسبة.",
        req: j({ status: "delivered" }),
        res: j({ ok: true, data: { id: "uuid", status: "delivered", delivered_at: "2025-01-30T14:20:00Z", ledger_entry_id: "uuid" } }),
      },
    ],
  },
  {
    id: "api-deliveries", title: "التوصيلات — Deliveries",
    eps: [
      { m: "GET", path: "/api/v1/deliveries?status=delivering", auth: "مدير", desc: "قائمة التوصيلات: السائق، المحافظة، رقم التتبع، والحالة.", res: j({ ok: true, data: [{ id: "uuid", order_no: 103, carrier: "توصيل ذاتي", driver_name: "أبو علي", governorate: "بغداد", status: "delivering", shipped_at: "…" }] }) },
      {
        m: "POST", path: "/api/v1/orders/:id/delivery", auth: "مدير",
        desc: "إنشاء توصيلة لطلب — تحوّل حالة الطلب إلى delivering تلقائياً.",
        req: j({ carrier: "سفرة ديالى", driver_name: "أبو علي", driver_phone: "07709876543", tracking_no: "DL-2231" }),
        res: j({ ok: true, data: { id: "uuid", order_id: "uuid", status: "delivering" } }),
      },
      { m: "PATCH", path: "/api/v1/deliveries/:id", auth: "مدير", desc: "تحديث حالة التوصيلة. عند delivered يتحدّث الطلب والمحاسبة معاً.", req: j({ status: "delivered" }), res: j({ ok: true, data: { id: "uuid", status: "delivered", delivered_at: "…" } }) },
    ],
  },
  {
    id: "api-stats", title: "الزوار والإحصاء — Visits & Stats",
    eps: [
      {
        m: "POST", path: "/api/v1/visits", auth: "عام",
        desc: "Beacon يسجل الزيارة (مرة لكل visitor_key في اليوم). يُستدعى من المتصفح عبر sendBeacon مع rate limit.",
        req: j({ visitor_key: "v_9f31ab" }),
        res: "204 No Content",
      },
      {
        m: "GET", path: "/api/v1/stats/overview", auth: "مدير",
        desc: "أرقام لوحة التحكم الرئيسية.",
        res: j({ ok: true, data: { visitors_total: 1284, visitors_today: 37, orders_total: 104, orders_new: 3, delivering: 1, revenue_iqd: 465000, expenses_iqd: 175000, net_iqd: 290000 } }),
      },
      { m: "GET", path: "/api/v1/stats/visits?days=7", auth: "مدير", desc: "سلسلة زيارات يومية لمخطط الأعمدة.", res: j({ ok: true, data: [{ date: "2025-01-24", count: 22 }, { date: "2025-01-25", count: 31 }] }) },
    ],
  },
  {
    id: "api-ledger", title: "المحاسبة المصغرة — Ledger",
    eps: [
      { m: "GET", path: "/api/v1/ledger?type=in&from=&to=", auth: "مدير", desc: "سجل القيود (وارد/مصروف) مع فلترة.", res: j({ ok: true, data: [{ id: "uuid", type: "in", label: "طلب #١٠٢ — تم التسليم", amount: 28000, date: "…" }] }) },
      { m: "POST", path: "/api/v1/ledger", auth: "مدير", desc: "قيد يدوي جديد.", req: j({ type: "out", label: "شراء مرطبانات", amount: 35000 }), res: j({ ok: true, data: { id: "uuid" } }) },
      { m: "DELETE", path: "/api/v1/ledger/:id", auth: "مدير", desc: "حذف قيد يدوي (القيود التلقائية المربوطة بطلبات لا تُحذف).", res: j({ ok: true, data: null }) },
      { m: "GET", path: "/api/v1/ledger/summary", auth: "مدير", desc: "إجماليات الوارد والمصروف والصافي للفترة.", res: j({ ok: true, data: { income: 465000, expense: 175000, net: 290000, currency: "IQD" } }) },
    ],
  },
  {
    id: "api-uploads", title: "رفع الصور — Uploads",
    eps: [
      {
        m: "POST", path: "/api/v1/uploads", auth: "مدير",
        desc: "رفع صورة (webp/jpg/png حتى 2MB) — تُحسّن وتُرفع إلى CDN ويرجع رابطها.",
        req: `Content-Type: multipart/form-data
file = <image>`,
        res: j({ ok: true, data: { url: "https://cdn.bait-souri.iq/p/abc.webp", width: 1024, height: 1024 } }),
      },
    ],
  },
  {
    id: "api-payments", title: "الدفع الإلكتروني — Payments (قريباً)",
    eps: [
      {
        m: "POST", path: "/api/v1/payments/init", auth: "عام", planned: true,
        desc: "بدء عملية دفع لطلب (زين كاش / كي كارد / فاست بي). حالياً الموقع بلا دفع — الطلب يكتمل عبر واتساب والدفع عند الاستلام.",
        req: j({ order_id: "uuid", provider: "zaincash" }),
        res: j({ ok: true, data: { payment_id: "uuid", redirect_url: "https://pay.zaincash.iq/…" } }),
      },
      { m: "GET", path: "/api/v1/payments/:id", auth: "عام", planned: true, desc: "الاستعلام عن حالة دفعة.", res: j({ ok: true, data: { id: "uuid", status: "pending | paid | failed" } }) },
      { m: "POST", path: "/api/v1/webhooks/payments", auth: "عام", planned: true, desc: "Webhook من مزوّد الدفع — يوقّع بـ HMAC ويُحدّث حالة الطلب والمحاسبة.", res: "200 OK" },
    ],
  },
];

const METHOD_CLS: Record<Ep["m"], string> = {
  GET: "bg-[#d8efe2] text-[#157347]",
  POST: "bg-saffron-200 text-saffron-600",
  PATCH: "bg-olive-200 text-olive-800",
  DELETE: "bg-pom-100 text-pom-700",
};

function Endpoint({ ep }: { ep: Ep }) {
  const [openEx, setOpenEx] = useState(false);
  return (
    <div className={`rounded-2xl border-2 bg-paper p-4 lg:p-5 transition-colors ${ep.planned ? "border-dashed border-saffron-500/60" : "border-ink/10 hover:border-olive-600/40"}`}>
      <div className="flex items-center gap-2.5 flex-wrap">
        <span dir="ltr" className={`${METHOD_CLS[ep.m]} text-[12px] font-black px-3 py-1.5 rounded-lg tabular`}>{ep.m}</span>
        <code dir="ltr" className="text-[13px] lg:text-[14px] font-bold text-ink bg-paper2 px-3 py-1.5 rounded-lg break-all">{ep.path}</code>
        <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${ep.auth === "مدير" ? "border-pom-300/60 text-pom-700 bg-pom-100/50" : "border-olive-500/40 text-olive-700 bg-olive-200/40"}`}>
          {ep.auth === "مدير" ? "🔒 مدير" : "🌐 عام"}
        </span>
        {ep.planned && <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-saffron-200 text-saffron-600 border border-saffron-500/40">قريباً</span>}
      </div>
      <p className="mt-2.5 text-[14px] text-ink2 leading-relaxed font-medium">{ep.desc}</p>
      <button onClick={() => setOpenEx(!openEx)} className="mt-2 text-[13px] font-black text-olive-700 hover:text-pom-600 transition-colors">
        {openEx ? "▲ إخفاء المثال" : "▼ مثال الطلب والاستجابة"}
      </button>
      {openEx && (
        <div className="fade-in mt-3 grid lg:grid-cols-2 gap-3" dir="ltr">
          {ep.req && (
            <div>
              <p className="text-[11px] font-black text-ink2 mb-1.5">REQUEST {ep.m !== "GET" && "BODY"}</p>
              <pre className="bg-olive-950 text-olive-200 text-[12px] leading-relaxed p-4 rounded-xl overflow-x-auto font-mono">{ep.req}</pre>
            </div>
          )}
          <div className={ep.req ? "" : "lg:col-span-2"}>
            <p className="text-[11px] font-black text-ink2 mb-1.5">RESPONSE</p>
            <pre className="bg-olive-950 text-olive-200 text-[12px] leading-relaxed p-4 rounded-xl overflow-x-auto font-mono">{ep.res}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== الصفحة ==================== */
const TOC = [
  { id: "overview", label: "نظرة عامة" },
  { id: "conventions", label: "الاتفاقيات والأساس" },
  { id: "erd", label: "مخطط ERD" },
  { id: "entities", label: "جداول قاعدة البيانات" },
  ...GROUPS.map((g) => ({ id: g.id, label: g.title })),
  { id: "errors", label: "صيغة الأخطاء" },
];

export default function DocsPage() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="bg-paper pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
        {/* رأس الصفحة */}
        <div className="relative overflow-hidden rounded-[26px] bg-olive-950 text-paper p-8 lg:p-12 grain">
          <div className="absolute inset-0 pattern-stars opacity-50" />
          <div className="relative z-10">
            <p className="flex items-center gap-2 text-saffron-400 font-black text-sm">
              <IDoc className="w-5 h-5" /> للمطوّرين · v1.0
            </p>
            <h1 className="font-display text-5xl lg:text-6xl mt-2 leading-tight">توثيق الـ <span className="text-saffron-400">API</span> ومخطط البيانات</h1>
            <p className="mt-4 max-w-2xl text-paper/75 leading-relaxed font-medium">
              الخلفية الكاملة لموقع البيت السوري: REST API مبني على <b className="text-paper">Node.js + Express + PostgreSQL</b>،
              مصادقة JWT للمدير، طلبات الزبائن تتحول لرسائل واتساب جاهزة، مع نظام محاسبة مصغر وعدّاد زوار.
              هذه الوثيقة هي العقد بين الواجهة الحالية (التي تعمل محلياً) والخادم المخطط له.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["REST · JSON", "JWT Auth", "PostgreSQL 16", " multer / CDN", "WhatsApp Deep Links", "sendBeacon Analytics"].map((t) => (
                <span key={t} dir="ltr" className="text-[12px] font-bold px-3.5 py-1.5 rounded-full border border-paper/25 text-paper/85">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* فهرس */}
          <aside className="lg:sticky lg:top-24 rounded-2xl border-2 border-ink/10 bg-paper p-4 max-lg:order-2">
            <p className="font-display text-xl text-ink mb-3">الفهرس</p>
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar">
              {TOC.map((t) => (
                <button key={t.id} onClick={() => go(t.id)} className="shrink-0 text-right text-[13px] font-bold text-ink2 hover:text-pom-600 hover:bg-pom-100/50 px-3 py-2 rounded-lg transition-colors">
                  {t.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-14 max-lg:order-1 min-w-0">
            {/* نظرة عامة */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="font-display text-4xl text-ink flex items-center gap-2"><ISpark className="w-5 h-5 text-pom-500" /> نظرة عامة على المعمارية</h2>
              <p className="mt-3 text-ink2 leading-relaxed font-medium max-w-3xl">
                الواجهة (هذا الموقع) React تعمل الآن بمنطق محلي كامل — والوثيقة تصف الخادم الذي ستنتقل إليه نفس العمليات.
                تدفق الطلب الأساسي: الزبون يعبّي السلة ← الموقع يبني رسالة الطلب ← تنفتح واتساب بالرسالة جاهزة ←
                الخادم يسجل الطلب ويخصم المخزون ← المدير يتابع من اللوحة ← عند التسليم يتقيد المبلغ كمردود تلقائياً.
              </p>
              <div dir="ltr" className="mt-6 grid sm:grid-cols-5 gap-2 items-center text-center">
                {["المتصفح React", "REST /api/v1", "Node + Express", "PostgreSQL", "WhatsApp / CDN"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className="rounded-xl border-2 border-olive-600/40 bg-paper px-2 py-4 font-black text-[13px] text-olive-800">{s}</div>
                    {i < 4 && <span className="hidden sm:block text-olive-500 font-black">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* الاتفاقيات */}
            <section id="conventions" className="scroll-mt-24">
              <h2 className="font-display text-4xl text-ink">الاتفاقيات والأساس</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 border-ink/10 bg-paper p-5">
                  <p className="font-black text-ink mb-2">🌍 الأساس والترميز</p>
                  <pre dir="ltr" className="text-[12.5px] font-bold text-ink2 leading-relaxed font-mono">{`Base URL:  https://api.bait-souri.iq/api/v1
Encoding:  UTF-8 (عربي كامل)
Currency:  IQD — دينار عراقي (أرقام صحيحة)
Dates:     ISO 8601 — Asia/Baghdad`}</pre>
                </div>
                <div className="rounded-2xl border-2 border-ink/10 bg-paper p-5">
                  <p className="font-black text-ink mb-2">🔑 المصادقة</p>
                  <p className="text-[14px] text-ink2 font-medium leading-relaxed">
                    كل نقاط <b>«مدير»</b> تحتاج ترويسة:
                  </p>
                  <pre dir="ltr" className="mt-2 text-[12.5px] font-bold text-ink2 font-mono bg-paper2 p-3 rounded-lg">{`Authorization: Bearer <JWT>`}</pre>
                  <p className="mt-2 text-[13px] text-ink2 font-medium">الرمز يعيش ١٥ دقيقة ويتجدد عبر refresh token. محاولات الدخول محدودة بـ ٥ في الساعة لكل IP.</p>
                </div>
                <div className="rounded-2xl border-2 border-ink/10 bg-paper p-5">
                  <p className="font-black text-ink mb-2">📄 المغلف الموحّد</p>
                  <pre dir="ltr" className="text-[12.5px] font-bold text-ink2 leading-relaxed font-mono">{`{
  "ok": true,
  "data": { … },
  "meta": { "page": 1, "total": 12 }  // للقوائم فقط
}`}</pre>
                </div>
                <div className="rounded-2xl border-2 border-ink/10 bg-paper p-5">
                  <p className="font-black text-ink mb-2">⏱ الحدود والفرز</p>
                  <p className="text-[14px] text-ink2 font-medium leading-relaxed">
                    عام: <b dir="ltr">60 طلب/دقيقة</b> لكل IP · نقاط الإنشاء: <b dir="ltr">10/دقيقة</b>.
                    <br />الفرز الافتراضي <span dir="ltr" className="font-mono font-bold">created_at DESC</span>، ويدعم <span dir="ltr" className="font-mono font-bold">?sort=price&order=asc</span>.
                  </p>
                </div>
              </div>
            </section>

            {/* ERD */}
            <section id="erd" className="scroll-mt-24">
              <h2 className="font-display text-4xl text-ink">مخطط علاقة الكيانات ERD</h2>
              <p className="mt-3 text-ink2 font-medium leading-relaxed max-w-3xl">
                عشر كيانات: الكتالوج (تصنيفات ← منتجات)، دورة الطلب (طلبات ← أصناف ← توصيلة)، المحاسبة (قيود مربوطة بالطلبات والمدراء)،
                الزوار، الإعدادات، وجدول المدفوعات <b className="text-saffron-600">(المخطط — قريباً)</b>. مرّر أفقياً على الموبايل.
              </p>
              <div className="mt-5">
                <Erd />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-[12px] font-black text-ink2">
                <span className="flex items-center gap-2"><span className="w-6 h-0.5 bg-[#a9b584] inline-block" /> علاقة فعلية</span>
                <span className="flex items-center gap-2"><span className="w-6 h-0.5 inline-block border-t-2 border-dashed border-saffron-500" /> مخطط (قريباً)</span>
                <span className="flex items-center gap-2"><span className="text-saffron-600 font-mono">PK/FK</span> مفاتيح</span>
              </div>
            </section>

            {/* الجداول */}
            <section id="entities" className="scroll-mt-24">
              <h2 className="font-display text-4xl text-ink">جداول قاعدة البيانات</h2>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                {ENTITIES.map((e) => (
                  <div key={e.name} className={`rounded-2xl border-2 bg-paper p-5 ${e.planned ? "border-dashed border-saffron-500/60" : "border-ink/10"}`}>
                    <p dir="ltr" className="text-right font-mono font-black text-[15px] text-olive-800 flex items-center justify-between">
                      {e.planned && <span className="text-[11px] font-sans font-black text-saffron-600 bg-saffron-200 px-2.5 py-1 rounded-full">قريباً</span>}
                      {e.name}
                    </p>
                    <div className="mt-3 space-y-1.5">
                      {e.fields.map(([f, t]) => (
                        <div key={f} dir="ltr" className="flex justify-between text-[12.5px] font-mono border-b border-dashed border-ink/10 pb-1.5">
                          <span className={t.includes("PK") || t.includes("FK") ? "font-black text-saffron-600" : "font-bold text-ink"}>{f}</span>
                          <span className="text-ink2/80">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* مجموعات الـ API */}
            {GROUPS.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-24">
                <h2 className="font-display text-4xl text-ink">{g.title}</h2>
                <div className="mt-4 space-y-3.5">
                  {g.eps.map((ep) => <Endpoint key={ep.path + ep.m} ep={ep} />)}
                </div>
              </section>
            ))}

            {/* الأخطاء */}
            <section id="errors" className="scroll-mt-24">
              <h2 className="font-display text-4xl text-ink">صيغة الأخطاء</h2>
              <div className="mt-4 rounded-2xl border-2 border-ink/10 bg-paper p-5">
                <pre dir="ltr" className="text-[12.5px] leading-relaxed font-mono text-ink2 overflow-x-auto">{j({
                  ok: false,
                  error: { code: "VALIDATION_FAILED", message: "بيانات الطلب ناقصة", details: [{ field: "customer.phone", issue: "رقم عراقي مطلوب (07XXXXXXXXX)" }] },
                })}</pre>
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[13px] font-bold">
                  {[
                    ["400", "VALIDATION_FAILED — بيانات ناقصة"],
                    ["401", "UNAUTHENTICATED — رمز ناقص/منتهي"],
                    ["403", "FORBIDDEN — صلاحية مدير مطلوبة"],
                    ["404", "NOT_FOUND — المنتج/الطلب مو موجود"],
                    ["409", "CONFLICT — كمية غير كافية / حذف تصنيف مشغول"],
                    ["429", "RATE_LIMITED — خفف شوي 🙏"],
                  ].map(([c, t]) => (
                    <div key={c} className="flex items-center gap-2.5 bg-paper2 rounded-xl px-3.5 py-2.5">
                      <span dir="ltr" className={`font-black px-2.5 py-1 rounded-lg ${+c < 404 ? "bg-saffron-200 text-saffron-600" : +c === 429 ? "bg-olive-200 text-olive-800" : "bg-pom-100 text-pom-700"}`}>{c}</span>
                      <span className="text-ink2">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-8 text-center font-display text-2xl text-ink2">— نهاية الوثيقة · البيت السوري 🌿 —</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
