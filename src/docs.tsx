import React, { useState } from "react";
import { useReveal } from "./hooks";

type Endpoint = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  desc: string;
  req?: string;
  res: string;
  auth?: boolean;
};

const GROUPS: { title: string; note: string; endpoints: Endpoint[] }[] = [
  {
    title: "المنتجات والتصنيفات",
    note: "قراءة عامة للجميع، والكتابة تتطلب توكن المدير.",
    endpoints: [
      {
        method: "GET", path: "/api/v1/products",
        desc: "جلب المنتجات مع فلترة وترقيم صفحات. Query: ?category=&search=&page=&limit=",
        res: `{
  "data": [{
    "id": "prd_8fa2", "name": "مكدوس سوري على أصوله",
    "category_id": "cat_pickles", "description": "باذنجان محشو بالجوز...",
    "price_iqd": 10000, "size": "مرطبان ١ كغم",
    "stock": 30, "image_url": "/uploads/makdous.webp",
    "badge": "على أصوله", "is_active": true
  }],
  "meta": { "page": 1, "limit": 20, "total": 12 }
}`,
      },
      {
        method: "GET", path: "/api/v1/products/:id",
        desc: "تفاصيل منتج واحد مع صورته وتصنيفه.",
        res: `{
  "id": "prd_8fa2", "name": "مكدوس سوري على أصوله",
  "category": { "id": "cat_pickles", "name": "مكدوس ومخللات" },
  "price_iqd": 10000, "stock": 30, "image_url": "..."
}`,
      },
      {
        method: "POST", path: "/api/v1/products", auth: true,
        desc: "إضافة منتج جديد (صورة، تصنيف، كمية، حجم، سعر).",
        req: `{
  "name": "لبنة بلدية بحبة البركة",
  "category_id": "cat_dairy",
  "description": "لبنة بلدية معجونة بالزعتر...",
  "price_iqd": 6000, "size": "مرطبان ١ كغم",
  "stock": 40, "badge": "الأكثر طلباً"
}`,
        res: `{ "id": "prd_new1", "created_at": "2025-06-01T10:00:00Z" }`,
      },
      {
        method: "PUT", path: "/api/v1/products/:id", auth: true,
        desc: "تعديل منتج — نفس حقول الإنشاء، كلها اختيارية.",
        req: `{ "price_iqd": 6500, "stock": 35 }`,
        res: `{ "updated": true }`,
      },
      {
        method: "DELETE", path: "/api/v1/products/:id", auth: true,
        desc: "حذف منتج (مع حذف صورته من التخزين).",
        res: `{ "deleted": true }`,
      },
      {
        method: "POST", path: "/api/v1/uploads", auth: true,
        desc: "رفع صورة منتج — multipart/form-data، حد أقصى ٢MB، تُحفظ كـ WebP.",
        req: `Content-Type: multipart/form-data
field "file": <image>`,
        res: `{ "url": "/uploads/labneh_a1b2.webp" }`,
      },
      {
        method: "GET", path: "/api/v1/categories",
        desc: "كل التصنيفات مع عدد منتجاتها.",
        res: `{ "data": [{ "id": "cat_dairy", "name": "ألبان وأجبان بلدية", "count": 2 }] }`,
      },
    ],
  },
  {
    title: "السلة والطلبات",
    note: "الطلب يُنشأ من المتصفح ثم يُرسل تلقائياً إلى واتساب العائلة برسالة منسّخة قابلة للإرسال.",
    endpoints: [
      {
        method: "POST", path: "/api/v1/orders",
        desc: "إنشاء طلب (يخصم الكمية من المخزون فوراً).",
        req: `{
  "customer": {
    "name": "أبو أحمد", "phone": "07881234567",
    "governorate": "ديالى", "address": "بعقوبة — حي المعلمين",
    "notes": "التوصيل مساءً"
  },
  "items": [{ "product_id": "prd_8fa2", "qty": 2 }]
}`,
        res: `{
  "id": "ord_9c41", "order_no": 1042,
  "total_iqd": 20000, "status": "جديد",
  "whatsapp_message": "🌿 *طلب جديد — البيت السوري*\\n..."
}`,
      },
      {
        method: "GET", path: "/api/v1/orders/:id", auth: true,
        desc: "تفاصيل طلب مع أصنافه وزبونه.",
        res: `{
  "id": "ord_9c41", "order_no": 1042, "status": "قيد التوصيل",
  "items": [{ "product": "مكدوس...", "qty": 2, "price_iqd": 10000 }],
  "total_iqd": 20000,
  "customer": { "name": "أبو أحمد", "phone": "0788..." }
}`,
      },
      {
        method: "PATCH", path: "/api/v1/orders/:id/status", auth: true,
        desc: "تحديث حالة الطلب. عند «تم التسليم» يُنشأ قيد وارد تلقائياً في المحاسبة.",
        req: `{ "status": "قيد التوصيل" }`,
        res: `{ "updated": true, "ledger_entry_id": "led_77d1" }`,
      },
      {
        method: "GET", path: "/api/v1/orders?status=جديد", auth: true,
        desc: "قائمة الطلبات مع فلترة بالحالة والتاريخ.",
        res: `{ "data": [ { "id": "ord_9c41", "order_no": 1042, "status": "جديد" } ], "meta": {} }`,
      },
      {
        method: "POST", path: "/api/v1/orders/:id/whatsapp",
        desc: "توليد رسالة واتساب منسّقة بكامل المشتريات والبيانات — قابلة للنسخ واللصق.",
        res: `{
  "message": "🌿 *طلب جديد — البيت السوري*\\n🧾 رقم الطلب: #1042\\n🛒 ...",
  "wa_link": "https://wa.me/9647887356906?text=..."
}`,
      },
    ],
  },
  {
    title: "لوحة المدير: الإحصاءات والمحاسبة",
    note: "كلها محمية بتوكن المدير (انظر المصادقة أعلاه).",
    endpoints: [
      {
        method: "POST", path: "/api/v1/auth/login",
        desc: "تسجيل دخول المدير — يعيد توكن JWT صالحاً لـ ١٢ ساعة.",
        req: `{ "pin": "••••" }`,
        res: `{ "token": "eyJhbGciOiJIUzI1NiJ9..." }`,
      },
      {
        method: "GET", path: "/api/v1/admin/stats", auth: true,
        desc: "نظرة عامة: زوار اليوم والإجمالي، الطلبات حسب الحالة، والإيراد.",
        res: `{
  "visitors_today": 47, "visitors_total": 1285,
  "orders_by_status": { "جديد": 3, "قيد التوصيل": 2 },
  "revenue_iqd": 486000
}`,
      },
      {
        method: "GET", path: "/api/v1/admin/visitors?days=7", auth: true,
        desc: "سلسلة زيارات يومية لمخطط آخر ٧ أيام.",
        res: `{ "series": [{ "date": "2025-05-30", "count": 34 }] }`,
      },
      {
        method: "GET", path: "/api/v1/admin/ledger", auth: true,
        desc: "سجل القيود (وارد/مصروف) مرتباً بالتاريخ.",
        res: `{ "data": [{ "id": "led_77d1", "label": "طلب #1042", "amount": 20000, "type": "in" }] }`,
      },
      {
        method: "POST", path: "/api/v1/admin/ledger", auth: true,
        desc: "إضافة قيد يدوي (وارد أو مصروف).",
        req: `{ "type": "out", "label": "شراء مرطبانات", "amount": 35000 }`,
        res: `{ "id": "led_77d2", "date": "2025-06-01" }`,
      },
      {
        method: "DELETE", path: "/api/v1/admin/ledger/:id", auth: true,
        desc: "حذف قيد من السجل.",
        res: `{ "deleted": true }`,
      },
    ],
  },
];

const ENTITIES: { name: string; cols: [string, string][] }[] = [
  { name: "users", cols: [["id", "UUID · PK"], ["name", "TEXT"], ["phone", "TEXT"], ["role", "enum(admin, staff)"], ["password_hash", "TEXT"]] },
  { name: "categories", cols: [["id", "UUID · PK"], ["name", "TEXT"], ["icon", "TEXT"], ["sort_order", "INT"]] },
  { name: "products", cols: [["id", "UUID · PK"], ["category_id", "UUID · FK"], ["name", "TEXT"], ["description", "TEXT"], ["price_iqd", "INT"], ["size", "TEXT"], ["stock", "INT"], ["image_url", "TEXT"], ["badge", "TEXT?"], ["is_active", "BOOL"]] },
  { name: "orders", cols: [["id", "UUID · PK"], ["order_no", "SERIAL"], ["customer_name", "TEXT"], ["customer_phone", "TEXT"], ["governorate", "TEXT"], ["address", "TEXT"], ["notes", "TEXT?"], ["total_iqd", "INT"], ["status", "ENUM"], ["created_at", "TIMESTAMPTZ"]] },
  { name: "order_items", cols: [["id", "UUID · PK"], ["order_id", "UUID · FK"], ["product_id", "UUID · FK"], ["qty", "INT"], ["unit_price_iqd", "INT"]] },
  { name: "visits", cols: [["id", "UUID · PK"], ["date", "DATE"], ["count", "INT"], ["UNIQUE", "(date)"]] },
  { name: "ledger_entries", cols: [["id", "UUID · PK"], ["order_id", "UUID · FK?"], ["type", "enum(in, out)"], ["label", "TEXT"], ["amount_iqd", "INT"], ["date", "TIMESTAMPTZ"]] },
];

const STATUS_FLOW = ["جديد", "قيد التجهيز", "قيد التوصيل", "تم التسليم"];

const METHOD_CLS: Record<Endpoint["method"], string> = {
  GET: "bg-olive-700",
  POST: "bg-wa-dark",
  PUT: "bg-saffron-600",
  PATCH: "bg-saffron-600",
  DELETE: "bg-pom-600",
};

function MethodBadge({ m }: { m: Endpoint["method"] }) {
  return (
    <span dir="ltr" className={`${METHOD_CLS[m]} text-paper text-[11px] font-black px-2.5 py-1 rounded-md tracking-wide shrink-0`}>
      {m}
    </span>
  );
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setOk(true);
    window.setTimeout(() => setOk(false), 1500);
  };
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between bg-olive-950 text-paper/50 rounded-t-xl px-4 py-2 border border-olive-800 border-b-0">
        <span dir="ltr" className="text-[11px] font-black tracking-wide">{title}</span>
        <button onClick={copy} className="text-[11px] font-black text-saffron-400 hover:text-saffron-300 transition-colors">
          {ok ? "✓ اننسخ" : "نسخ"}
        </button>
      </div>
      <pre dir="ltr" className="text-left bg-olive-950 text-olive-100 rounded-b-xl border border-olive-800 p-4 text-[12px] leading-relaxed overflow-x-auto no-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointRow({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-ink/10 rounded-2xl overflow-hidden bg-paper hover:border-olive-600/40 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 text-right">
        <MethodBadge m={ep.method} />
        <code dir="ltr" className="text-[13px] lg:text-[14px] font-black text-ink truncate">{ep.path}</code>
        {ep.auth && (
          <span className="shrink-0 text-[10px] font-black text-saffron-600 bg-saffron-200/70 px-2 py-0.5 rounded-full border border-saffron-500/40">
            مدير فقط
          </span>
        )}
        <span className={`mr-auto shrink-0 text-ink2 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="px-4 pb-4 fade-in">
          <p className="text-[14px] font-bold text-ink2 leading-relaxed">{ep.desc}</p>
          {ep.req && <CodeBlock code={ep.req} title="Request" />}
          <CodeBlock code={ep.res} title="Response · 200" />
        </div>
      )}
    </div>
  );
}

/* ===== مخطط ERD ===== */
function ErdDiagram() {
  const boxes: { name: string; x: number; y: number; cols: [string, string][]; tone: string }[] = [
    { name: "users", x: 540, y: 20, tone: "#59713A", cols: ENTITIES[0].cols },
    { name: "categories", x: 20, y: 60, tone: "#59713A", cols: ENTITIES[1].cols },
    { name: "products", x: 20, y: 300, tone: "#A93227", cols: ENTITIES[2].cols },
    { name: "orders", x: 300, y: 440, tone: "#A93227", cols: ENTITIES[3].cols },
    { name: "order_items", x: 20, y: 560, tone: "#D29B2E", cols: ENTITIES[4].cols },
    { name: "visits", x: 560, y: 300, tone: "#59713A", cols: ENTITIES[5].cols },
    { name: "ledger_entries", x: 560, y: 480, tone: "#D29B2E", cols: ENTITIES[6].cols },
  ];
  const boxH = (cols: [string, string][]) => 40 + cols.length * 21 + 8;
  /* وصلات: من، إلى، نوع */
  const rels: [number, number, "1" | "n"][] = [
    [1, 2, "1"],
    [2, 4, "1"],
    [3, 4, "1"],
    [3, 6, "1"],
  ];
  const edge = (b: { x: number; y: number; cols: [string, string][] }, side: "top" | "bottom" | "left" | "right") => {
    const h = boxH(b.cols);
    if (side === "left") return { x: b.x, y: b.y + h / 2 };
    if (side === "right") return { x: b.x + 220, y: b.y + h / 2 };
    if (side === "top") return { x: b.x + 110, y: b.y };
    return { x: b.x + 110, y: b.y + h };
  };

  return (
    <div dir="ltr" className="overflow-x-auto no-scrollbar rounded-2xl border-2 border-olive-800 bg-olive-950 pattern-stars">
      <svg viewBox="0 0 800 770" className="min-w-[680px] w-full h-auto">
        {rels.map(([a, b, type], i) => {
          const from = boxes[a];
          const to = boxes[b];
          const p1 = edge(from, from.x > to.x ? "left" : "bottom");
          const p2 = edge(to, to.x > from.x ? "right" : "top");
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          return (
            <g key={i}>
              <path
                d={`M ${p1.x} ${p1.y} C ${p1.x} ${my}, ${p2.x} ${my}, ${p2.x} ${p2.y}`}
                fill="none"
                stroke={type === "n" ? "#E3B44A" : "#AEBE8A"}
                strokeWidth="2.5"
                strokeDasharray={type === "n" ? "7 5" : undefined}
              />
              <circle cx={p1.x} cy={p1.y} r="4" fill="#AEBE8A" />
              <circle cx={p2.x} cy={p2.y} r="4" fill="#AEBE8A" />
              <text x={mx} y={my - 6} textAnchor="middle" fontSize="13" fontWeight="800" fill={type === "n" ? "#E3B44A" : "#AEBE8A"} fontFamily="Tajawal, sans-serif">
                {type === "n" ? "N : 1" : "1 : 1"}
              </text>
            </g>
          );
        })}

        {boxes.map((b) => (
          <g key={b.name}>
            <rect x={b.x} y={b.y} width="220" height={boxH(b.cols)} rx="12" fill="#232D18" stroke="#485C2F" strokeWidth="1.5" />
            <rect x={b.x} y={b.y} width="220" height="32" rx="12" fill={b.tone} />
            <rect x={b.x} y={b.y + 18} width="220" height="14" fill={b.tone} />
            <text x={b.x + 110} y={b.y + 21} textAnchor="middle" fontSize="14" fontWeight="900" fill="#F7F0E2" fontFamily="ui-monospace, monospace">
              {b.name}
            </text>
            {b.cols.map(([c, t], i) => (
              <g key={c}>
                <text x={b.x + 12} y={b.y + 52 + i * 21} fontSize="11.5" fontWeight="700" fill={t.includes("PK") ? "#E3B44A" : t.includes("FK") ? "#AEBE8A" : "#EFE5CF"} fontFamily="ui-monospace, monospace">
                  {c}
                </text>
                <text x={b.x + 208} y={b.y + 52 + i * 21} textAnchor="end" fontSize="10" fill="#8d997a" fontFamily="ui-monospace, monospace">
                  {t}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ===== الصفحة ===== */
export default function DocsPage() {
  useReveal([]);
  const [copied, setCopied] = useState(false);

  const copyBase = async () => {
    try {
      await navigator.clipboard.writeText("https://albayt-alsyrian.iq/api/v1");
    } catch { /* تجاهل */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="relative pattern-leaves">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* الترويسة */}
        <div className="reveal">
          <p className="flex items-center gap-2 text-pom-600 font-black text-sm">
            <span className="inline-block w-8 h-0.5 bg-pom-600" /> توثيق تقني · للمطورين
          </p>
          <h1 className="font-display text-6xl lg:text-7xl text-ink mt-2 leading-none">
            Backend API <span className="text-olive-700">&amp; ERD</span>
          </h1>
          <p className="mt-4 text-ink2 font-medium max-w-2xl leading-relaxed text-lg">
            التوثيق الكامل لواجهات البيت السوري الخلفية: كل نقطة نهاية تحتاجها النسخة الحالية من الموقع
            (المنتجات، السلة، الطلبات، واتساب، الإحصاءات، المحاسبة) مع مخطط قاعدة البيانات والعلاقات.
          </p>
        </div>

        {/* الأساسيات */}
        <div className="reveal mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-olive-900 text-paper rounded-2xl p-5 pattern-stars relative overflow-hidden">
            <p className="text-[12px] font-black text-saffron-400">Base URL</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <code dir="ltr" className="text-[13px] font-bold text-olive-100 truncate">albayt-alsyrian.iq/api/v1</code>
              <button onClick={copyBase} className="shrink-0 text-[11px] font-black text-saffron-400 hover:text-saffron-300 transition-colors">
                {copied ? "✓ اننسخ" : "نسخ"}
              </button>
            </div>
          </div>
          <div className="bg-paper border-2 border-ink/10 rounded-2xl p-5">
            <p className="text-[12px] font-black text-olive-600">المصادقة</p>
            <p className="mt-2 text-[13px] font-bold text-ink2 leading-relaxed">
              نقاط المدير محمية بـ <code dir="ltr" className="text-ink">Bearer JWT</code> يُستخرج من <code dir="ltr" className="text-ink">/auth/login</code>. نقاط المتجر مفتوحة للجميع.
            </p>
          </div>
          <div className="bg-paper border-2 border-ink/10 rounded-2xl p-5">
            <p className="text-[12px] font-black text-olive-600">الترميز والأخطاء</p>
            <p className="mt-2 text-[13px] font-bold text-ink2 leading-relaxed">
              كل الأجسام <code dir="ltr" className="text-ink">JSON · UTF-8</code>. الأخطاء بصيغة موحّدة: <code dir="ltr" className="text-ink">{"{ error: { code, message } }"}</code>
            </p>
          </div>
        </div>

        {/* دورة الطلب */}
        <div className="reveal mt-10 bg-paper border-2 border-ink/10 rounded-2xl p-5 lg:p-6">
          <h2 className="font-display text-3xl text-ink">دورة حياة الطلب</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {STATUS_FLOW.map((s, i) => (
              <React.Fragment key={s}>
                <span className="px-4 py-2 rounded-full bg-olive-800 text-paper text-[13px] font-black">{s}</span>
                {i < STATUS_FLOW.length - 1 && <span className="text-olive-500 font-black text-lg">←</span>}
              </React.Fragment>
            ))}
            <span className="text-ink2 font-black text-lg mx-1">/</span>
            <span className="px-4 py-2 rounded-full bg-ink/10 text-ink2 text-[13px] font-black">ملغي</span>
          </div>
          <p className="mt-3 text-[13px] font-bold text-ink2">
            💡 عند الانتقال إلى «تم التسليم» يُنشأ قيد وارد تلقائياً في <code dir="ltr" className="text-ink">ledger_entries</code> مرتبطة بـ <code dir="ltr" className="text-ink">order_id</code> — وهذا ما تراه لوحة المحاسبة.
          </p>
        </div>

        {/* مخطط ERD */}
        <div className="reveal mt-14">
          <h2 className="font-display text-4xl lg:text-5xl text-ink leading-none">مخطط قاعدة البيانات <span className="text-pom-600">ERD</span></h2>
          <p className="mt-3 text-ink2 font-medium max-w-2xl">سبع جداول بعلاقات واضحة: المنتجات تنتمي لتصنيف، الطلب يتكون من أصناف، والتسليم يولّد قيداً محاسبياً.</p>
          <div className="mt-6">
            <ErdDiagram />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-black text-ink2">
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-pom-600 inline-block" /> جوهر المتجر</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-olive-600 inline-block" /> كتالوج ومستخدمون</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-saffron-500 inline-block" /> عمليات ومالية</span>
            <span className="flex items-center gap-2"><span className="inline-block w-6 border-t-[3px] border-dashed border-saffron-500" /> N : 1</span>
            <span className="flex items-center gap-2"><span className="inline-block w-6 border-t-[3px] border-olive-300" /> 1 : 1</span>
          </div>
        </div>

        {/* الجداول */}
        <div className="reveal mt-12">
          <h2 className="font-display text-4xl text-ink leading-none">الجداول <span className="text-olive-700">Entities</span></h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENTITIES.map((e) => (
              <div key={e.name} className="bg-paper border-2 border-ink/10 rounded-2xl overflow-hidden hover:border-olive-600/40 hover:-translate-y-1 transition-all">
                <p dir="ltr" className="text-left bg-olive-800 text-paper font-black text-[13px] px-4 py-2.5 tracking-wide font-mono">{e.name}</p>
                <ul className="p-3.5 space-y-1.5">
                  {e.cols.map(([c, t]) => (
                    <li key={c} dir="ltr" className="text-left flex items-baseline justify-between gap-2 text-[12px]">
                      <code className={`font-bold ${t.includes("PK") ? "text-pom-600" : t.includes("FK") ? "text-olive-700" : "text-ink"}`}>{c}</code>
                      <span className="text-ink2 font-medium text-[11px]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* نقاط النهاية */}
        <div className="mt-14 space-y-12">
          {GROUPS.map((g, gi) => (
            <div key={g.title} className="reveal" style={{ transitionDelay: `${gi * 60}ms` }}>
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-pom-600 text-paper font-display text-lg leading-none pt-1">{gi + 1}</span>
                <h2 className="font-display text-4xl text-ink leading-none">{g.title}</h2>
              </div>
              <p className="mt-2 text-[14px] font-bold text-ink2 mr-12">{g.note}</p>
              <div className="mt-5 space-y-3">
                {g.endpoints.map((ep) => (
                  <EndpointRow key={ep.method + ep.path} ep={ep} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ملاحظات النشر */}
        <div className="reveal mt-14 bg-olive-900 text-paper rounded-[24px] p-6 lg:p-8 pattern-stars relative overflow-hidden grain">
          <h2 className="font-display text-3xl text-saffron-400">ملاحظات النشر</h2>
          <ul className="mt-4 space-y-2.5 text-[14px] font-medium text-paper/85 leading-relaxed">
            <li>• النسخة الحالية من الموقع تعمل بالكامل من المتصفح (LocalStorage) كنموذج أولي — هذا التوثيق هو خطة الـ Backend الجاهزة للتنفيذ.</li>
            <li>• الدفع الإلكتروني عبر الموقع <b className="text-saffron-400">قريباً</b>: يُضاف جدول <code dir="ltr" className="text-paper">payments</code> مربوط بـ <code dir="ltr" className="text-paper">orders</code> مع بوابة دفع عراقية.</li>
            <li>• عدّاد الزوار يُحدّث عبر <code dir="ltr" className="text-paper">visits</code> بواقع صف واحد لكل يوم (UPSERT على التاريخ).</li>
            <li>• الصور تُرفع عبر <code dir="ltr" className="text-paper">/uploads</code> وتُحفظ بصيغة WebP مع نسخ مصغّرة للبطاقات.</li>
          </ul>
        </div>

        <p className="text-center mt-10 text-[13px] font-bold text-ink2">
          البيت السوري — لسنا الوحيدين… لكننا الأفضل 🌿
        </p>
      </div>
    </main>
  );
}
