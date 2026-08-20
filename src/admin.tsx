import React, { useMemo, useState } from "react";
import { useShop } from "./store";
import { useLockScroll } from "./hooks";
import {
  arNum, CATEGORIES, fmtDate, fmtDateTime, JAM_IMAGE, money, OrderStatus, ORDER_STATUSES,
  Product,
} from "./data";

/** رابط واتساب مباشر للزبون من رقمه العراقي */
function customerWaLink(phone: string, name: string, no: number, status: OrderStatus): string {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("964") ? digits : digits.startsWith("0") ? "964" + digits.slice(1) : "964" + digits;
  const msg = `مرحباً ${name} 🌿 هذا البيت السوري — بخصوص طلبك رقم #${no} (الحالة الحالية: ${status}).`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
}
import {
  IBag, IBox, IChart, ICheese, ICheck, ICoin, IDoc, IDrop, IEdit, IEye, IJar, ILeaf,
  ILock, IOlive, ICherry, IPlus, ITrash, ITruck, IWhats, IX, Logo,
} from "./icons";

const CAT_ICON: Record<string, (p: { className?: string }) => React.ReactElement> = {
  cheese: ICheese, jar: IJar, leaf: ILeaf, drop: IDrop, cherry: ICherry, olive: IOlive,
};

const ADMIN_PIN = "1234";

/* ==================== تسجيل الدخول ==================== */
function AdminLogin({ onOk }: { onOk: () => void }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const tryPin = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("sh_admin", "1");
      onOk();
    } else {
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
      setPin("");
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4 py-16">
      <div className={`w-full max-w-sm bg-paper rounded-[24px] border-2 border-ink/10 shadow-xl shadow-ink/10 p-8 text-center ${shake ? "animate-[toast-in_0.4s]" : ""}`}>
        <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-olive-800 text-saffron-400 border-4 border-olive-200/70">
          <ILock className="w-8 h-8" />
        </span>
        <h1 className="font-display text-4xl text-ink mt-4">لوحة المدير</h1>
        <p className="text-ink2 font-bold text-sm mt-1">اكتب رمز الدخول لمتابعة إدارة البيت السوري</p>
        <input
          dir="ltr"
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && tryPin()}
          placeholder="• • • •"
          className="mt-5 w-full text-center tracking-[0.6em] text-2xl font-black rounded-2xl border-2 border-ink/15 bg-paper2 px-4 py-3.5 focus:border-olive-600 focus:outline-none"
        />
        <button onClick={tryPin} className="mt-4 w-full py-3.5 rounded-full bg-olive-800 hover:bg-olive-700 text-paper font-black active:scale-[0.98] transition-all">
          دخول
        </button>
        <p className="mt-4 text-[12px] font-bold text-ink2/70">
          للتجربة: <span dir="ltr" className="text-pom-600 font-black">1234</span>
        </p>
      </div>
    </div>
  );
}

/* ==================== نظرة عامة ==================== */
function Dashboard({ goTab }: { goTab: (t: Tab) => void }) {
  const { orders, ledger, visitors } = useShop();

  const income = ledger.filter((e) => e.type === "in").reduce((s, e) => s + e.amount, 0);
  const expense = ledger.filter((e) => e.type === "out").reduce((s, e) => s + e.amount, 0);
  const delivering = orders.filter((o) => o.status === "قيد التوصيل").length;
  const todayKey = new Date().toISOString().slice(0, 10);

  /* زيارات آخر ٧ أيام */
  const days = useMemo(() => {
    const out: { label: string; value: number; isToday: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().slice(0, 10);
      out.push({
        label: d.toLocaleDateString("ar-IQ", { weekday: "short" }),
        value: visitors.daily[key] ?? 0,
        isToday: key === todayKey,
      });
    }
    return out;
  }, [visitors.daily, todayKey]);
  const maxDay = Math.max(1, ...days.map((d) => d.value));

  const stats = [
    { icon: IEye, label: "زوار اليوم", value: arNum(visitors.daily[todayKey] ?? 0), sub: `الإجمالي ${arNum(visitors.total)}`, tone: "bg-olive-800 text-saffron-400" },
    { icon: IBag, label: "إجمالي الطلبات", value: arNum(orders.length), sub: `${arNum(orders.filter((o) => o.status === "جديد").length)} جديد بانتظار التأكيد`, tone: "bg-pom-600 text-paper" },
    { icon: ITruck, label: "قيد التوصيل", value: arNum(delivering), sub: "الهدف: ٢٤ ساعة", tone: "bg-saffron-500 text-olive-950" },
    { icon: ICoin, label: "صافي الحساب", value: money(income - expense), sub: `وارد ${money(income)}`, tone: "bg-wa text-white" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-paper rounded-2xl border-2 border-ink/10 p-4 lg:p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10 transition-all">
            <span className={`inline-grid place-items-center w-11 h-11 rounded-xl ${s.tone}`}>
              <s.icon className="w-5.5 h-5.5" />
            </span>
            <p className="mt-3 text-[12px] font-black text-ink2">{s.label}</p>
            <p className="font-display text-[26px] lg:text-3xl text-ink leading-tight tabular" style={{ transitionDelay: `${i * 60}ms` }}>{s.value}</p>
            <p className="text-[11px] font-bold text-ink2/70 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* مخطط الزوار */}
        <div className="lg:col-span-3 bg-paper rounded-2xl border-2 border-ink/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-2xl text-ink flex items-center gap-2"><IChart className="w-5 h-5 text-olive-600" /> زيارات آخر ٧ أيام</h3>
            <span className="text-[11px] font-black text-ink2 bg-paper2 px-3 py-1.5 rounded-full">{arNum(days.reduce((s, d) => s + d.value, 0))} زيارة</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-black text-ink2 opacity-0 group-hover:opacity-100 transition-opacity tabular">{arNum(d.value)}</span>
                <div
                  className={`bar-grow w-full max-w-10 rounded-t-lg transition-colors ${d.isToday ? "bg-pom-500" : "bg-olive-600 group-hover:bg-olive-500"}`}
                  style={{ height: `${Math.max(6, (d.value / maxDay) * 100)}%`, animationDelay: `${i * 70}ms` }}
                />
                <span className={`text-[11px] font-black ${d.isToday ? "text-pom-600" : "text-ink2/70"}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* آخر الطلبات */}
        <div className="lg:col-span-2 bg-paper rounded-2xl border-2 border-ink/10 p-5">
          <h3 className="font-display text-2xl text-ink mb-4">آخر الطلبات</h3>
          <div className="space-y-3">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center gap-3 bg-paper2 rounded-xl px-3.5 py-2.5">
                <span className="font-display text-lg text-pom-600 w-14 shrink-0">#{arNum(o.no)}</span>
                <div className="grow min-w-0">
                  <p className="text-[13px] font-black text-ink truncate">{o.customer.name} — {o.customer.gov}</p>
                  <p className="text-[11px] font-bold text-ink2">{o.items.length} صنف · {money(o.total)}</p>
                </div>
                <StatusChip s={o.status} />
              </div>
            ))}
          </div>
          <button onClick={() => goTab("orders")} className="mt-4 w-full py-2.5 rounded-full border-2 border-olive-700/30 text-olive-800 font-black text-sm hover:bg-olive-800 hover:text-paper transition-colors">
            كل الطلبات ←
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ s }: { s: OrderStatus }) {
  const map: Record<OrderStatus, string> = {
    "جديد": "bg-pom-100 text-pom-700 border-pom-300/50",
    "قيد التجهيز": "bg-saffron-200 text-saffron-600 border-saffron-500/40",
    "قيد التوصيل": "bg-olive-200 text-olive-800 border-olive-500/40",
    "تم التسليم": "bg-[#d8efe2] text-wa-dark border-wa/40",
    "ملغي": "bg-ink/10 text-ink2 border-ink/20",
  };
  return <span className={`shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full border ${map[s]}`}>{s}</span>;
}

/* ==================== المنتجات ==================== */
type PForm = { name: string; category: string; price: string; size: string; stock: string; image: string; desc: string; badge: string };
const emptyForm: PForm = { name: "", category: "dairy", price: "", size: "", stock: "", image: "", desc: "", badge: "" };

function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, notify } = useShop();
  const [form, setForm] = useState<PForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const reset = () => { setForm(emptyForm); setEditingId(null); setOpen(false); };

  const submit = () => {
    if (form.name.trim().length < 2 || !form.price || !form.size) {
      notify("الاسم والسعر والحجم مطلوبين", "warn");
      return;
    }
    const data = {
      name: form.name.trim(), category: form.category,
      price: Number(form.price), size: form.size.trim(),
      stock: Number(form.stock) || 0, image: form.image.trim() || JAM_IMAGE,
      desc: form.desc.trim() || "منتج مونة سورية بيتية الصنع.",
      badge: form.badge.trim() || undefined,
    };
    if (editingId) {
      updateProduct({ ...data, id: editingId } as Product);
      notify("تحدّث المنتج ✓");
    } else {
      addProduct(data);
      notify(`انضاف «${data.name}» للرف ✓`);
    }
    reset();
  };

  const edit = (p: Product) => {
    setForm({
      name: p.name, category: p.category, price: String(p.price), size: p.size,
      stock: String(p.stock), image: p.image, desc: p.desc, badge: p.badge ?? "",
    });
    setEditingId(p.id);
    setOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.size > 400 * 1024) {
      notify("الصورة كبيرة — استخدم رابط أو صورة أصغر من ٤٠٠KB", "warn");
      return;
    }
    const r = new FileReader();
    r.onload = () => setForm((prev) => ({ ...prev, image: String(r.result) }));
    r.readAsDataURL(f);
  };

  const inputCls = "w-full rounded-xl border-2 border-ink/15 bg-paper px-3.5 py-2.5 text-sm font-bold text-ink placeholder:text-ink2/40 focus:border-olive-600 focus:outline-none transition-colors";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-display text-3xl text-ink">إدارة المنتجات ({arNum(products.length)})</h3>
        <button
          onClick={() => (open ? reset() : setOpen(true))}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm transition-all active:scale-95 ${open ? "bg-ink/10 text-ink" : "bg-pom-600 text-paper hover:bg-pom-700 shadow-md shadow-pom-600/25"}`}
        >
          {open ? <IX className="w-4 h-4" /> : <IPlus className="w-4 h-4" />}
          {open ? "إغلاق النموذج" : "إضافة منتج"}
        </button>
      </div>

      {open && (
        <div className="fade-in bg-paper rounded-2xl border-2 border-olive-600/40 p-5 shadow-lg shadow-ink/5">
          <p className="font-display text-2xl text-olive-800 mb-4">{editingId ? "تعديل منتج" : "منتج جديد على الرف"}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <label className="block sm:col-span-2">
              <span className="text-[12px] font-black text-ink2 block mb-1">اسم المنتج *</span>
              <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثال: لبنة بلدية بحبة البركة" />
            </label>
            <label className="block">
              <span className="text-[12px] font-black text-ink2 block mb-1">التصنيف *</span>
              <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[12px] font-black text-ink2 block mb-1">السعر (د.ع) *</span>
              <input dir="ltr" inputMode="numeric" className={`${inputCls} text-left`} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value.replace(/\D/g, "") })} placeholder="7000" />
            </label>
            <label className="block">
              <span className="text-[12px] font-black text-ink2 block mb-1">الحجم / العبوة *</span>
              <input className={inputCls} value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="مرطبان ١ كغم" />
            </label>
            <label className="block">
              <span className="text-[12px] font-black text-ink2 block mb-1">الكمية المتوفرة</span>
              <input dir="ltr" inputMode="numeric" className={`${inputCls} text-left`} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value.replace(/\D/g, "") })} placeholder="25" />
            </label>
            <label className="block">
              <span className="text-[12px] font-black text-ink2 block mb-1">شارة مميزة (اختياري)</span>
              <input className={inputCls} value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="مثال: صناعة يدنا" />
            </label>
            <label className="block sm:col-span-2 lg:col-span-3">
              <span className="text-[12px] font-black text-ink2 block mb-1">وصف قصير</span>
              <textarea rows={2} className={inputCls} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="وصف يفتح النفس…" />
            </label>
            <div className="sm:col-span-2 lg:col-span-3 grid sm:grid-cols-[1fr_auto] gap-3 items-end">
              <label className="block">
                <span className="text-[12px] font-black text-ink2 block mb-1">رابط صورة المنتج</span>
                <input dir="ltr" className={`${inputCls} text-left`} value={form.image.startsWith("data:") ? "" : form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://…" />
              </label>
              <div>
                <span className="text-[12px] font-black text-ink2 block mb-1">أو ارفع صورة</span>
                <label className="flex items-center justify-center gap-2 cursor-pointer rounded-xl border-2 border-dashed border-olive-600/50 bg-paper2 px-5 py-2.5 text-sm font-black text-olive-700 hover:bg-olive-200/50 transition-colors">
                  <IPlus className="w-4 h-4" /> اختيار ملف
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                </label>
              </div>
            </div>
          </div>
          {form.image && (
            <div className="mt-4 flex items-center gap-3">
              <img src={form.image} alt="معاينة" className="w-16 h-16 rounded-xl object-cover border-2 border-ink/10" />
              <span className="text-[12px] font-black text-wa flex items-center gap-1.5"><ICheck className="w-4 h-4" /> معاينة الصورة جاهزة</span>
            </div>
          )}
          <div className="mt-5 flex gap-3">
            <button onClick={submit} className="flex-1 sm:flex-none px-8 py-3 rounded-full bg-olive-800 hover:bg-olive-700 text-paper font-black active:scale-95 transition-all">
              {editingId ? "حفظ التعديلات" : "إضافة للرف"}
            </button>
            <button onClick={reset} className="px-6 py-3 rounded-full border-2 border-ink/15 font-bold text-ink2 hover:border-ink/40 transition-colors">
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="bg-paper rounded-2xl border-2 border-ink/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-right">
            <thead>
              <tr className="bg-olive-900 text-paper text-[12px] font-black">
                <th className="px-4 py-3">المنتج</th>
                <th className="px-4 py-3">التصنيف</th>
                <th className="px-4 py-3">السعر</th>
                <th className="px-4 py-3">الحجم</th>
                <th className="px-4 py-3">الكمية</th>
                <th className="px-4 py-3">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const cat = CATEGORIES.find((c) => c.id === p.category);
                const Ic = cat ? CAT_ICON[cat.icon] ?? IJar : IJar;
                return (
                  <tr key={p.id} className="border-t border-ink/8 hover:bg-paper2/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="w-11 h-11 rounded-lg object-cover border border-ink/10" />
                        <div>
                          <p className="font-black text-[14px] text-ink">{p.name}</p>
                          {p.badge && <p className="text-[11px] font-black text-pom-600">{p.badge}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-black text-olive-700 bg-olive-200/50 px-2.5 py-1 rounded-full">
                        <Ic className="w-3.5 h-3.5" /> {cat?.name ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-black text-pom-600 tabular text-[14px]">{money(p.price)}</td>
                    <td className="px-4 py-3 text-[13px] font-bold text-ink2">{p.size}</td>
                    <td className="px-4 py-3">
                      <span className={`font-black text-[13px] tabular ${p.stock === 0 ? "text-pom-600" : p.stock <= 10 ? "text-saffron-600" : "text-olive-700"}`}>
                        {arNum(p.stock)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => edit(p)} aria-label="تعديل" className="grid place-items-center w-9 h-9 rounded-full bg-olive-200/60 text-olive-800 hover:bg-olive-800 hover:text-paper transition-colors">
                          <IEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { if (window.confirm(`حذف «${p.name}» نهائياً؟`)) { deleteProduct(p.id); notify("انشال المنتج من الرف", "warn"); } }}
                          aria-label="حذف"
                          className="grid place-items-center w-9 h-9 rounded-full bg-pom-100 text-pom-600 hover:bg-pom-600 hover:text-paper transition-colors"
                        >
                          <ITrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==================== الطلبات والتوصيلات ==================== */
function AdminOrders() {
  const { orders, updateOrderStatus, notify } = useShop();
  const [filter, setFilter] = useState<OrderStatus | "الكل">("الكل");
  const list = filter === "الكل" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-display text-3xl text-ink">الطلبات والتوصيلات ({arNum(orders.length)})</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {(["الكل", ...ORDER_STATUSES] as (OrderStatus | "الكل")[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-black border-2 transition-all ${
              filter === s ? "bg-olive-800 text-paper border-olive-800" : "bg-paper border-ink/15 text-ink2 hover:border-olive-600"
            }`}
          >
            {s} ({arNum(s === "الكل" ? orders.length : orders.filter((o) => o.status === s).length)})
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {list.map((o) => (
          <div key={o.id} className="bg-paper rounded-2xl border-2 border-ink/10 p-5 hover:border-olive-600/40 transition-colors">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="font-display text-2xl text-pom-600 leading-none">طلب #{arNum(o.no)}</p>
                <p className="text-[12px] font-bold text-ink2 mt-1.5">{fmtDateTime(o.date)}</p>
              </div>
              <StatusChip s={o.status} />
            </div>

            <div className="mt-4 bg-paper2 rounded-xl p-3.5 space-y-2">
              {o.items.map((it, i) => (
                <div key={i} className="flex justify-between text-[13px] font-bold">
                  <span className="text-ink">{it.name} <span className="text-ink2">× {arNum(it.qty)}</span></span>
                  <span className="tabular text-ink2">{money(it.price * it.qty)}</span>
                </div>
              ))}
              <div className="ticket-edge" />
              <div className="flex justify-between">
                <span className="font-black text-ink">المجموع</span>
                <span className="font-display text-xl text-pom-600">{money(o.total)}</span>
              </div>
            </div>

            <div className="mt-4 text-[13px] font-bold text-ink2 space-y-1">
              <p>👤 {o.customer.name} · <span dir="ltr">{o.customer.phone}</span></p>
              <p>📍 {o.customer.gov} — {o.customer.address}</p>
              {o.customer.notes && <p>📝 {o.customer.notes}</p>}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <select
                value={o.status}
                onChange={(e) => { updateOrderStatus(o.id, e.target.value as OrderStatus); notify(`تحول الطلب #${arNum(o.no)} إلى «${e.target.value}»`); }}
                className="rounded-full border-2 border-ink/15 bg-paper px-4 py-2 text-[13px] font-black text-ink focus:border-olive-600 focus:outline-none"
              >
                {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <a
                href={customerWaLink(o.customer.phone, o.customer.name, o.no, o.status)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-wa/12 text-wa-dark border-2 border-wa/30 px-4 py-2 text-[13px] font-black hover:bg-wa hover:text-white transition-colors"
              >
                <IWhats className="w-4 h-4" /> مراسلة الزبون
              </a>
              {o.status === "تم التسليم" && o.recorded && (
                <span className="text-[12px] font-black text-wa flex items-center gap-1"><ICheck className="w-4 h-4" /> مقيد بالحساب</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <div className="text-center py-14 text-ink2 font-bold bg-paper rounded-2xl border-2 border-ink/10">
          <ITruck className="w-10 h-10 mx-auto text-olive-300" />
          <p className="mt-3">ماكو طلبات بهالحالة حالياً</p>
        </div>
      )}
    </div>
  );
}

/* ==================== المحاسبة ==================== */
function AdminLedger() {
  const { ledger, addLedger, deleteLedger, notify } = useShop();
  const [form, setForm] = useState({ type: "in" as "in" | "out", label: "", amount: "" });

  const income = ledger.filter((e) => e.type === "in").reduce((s, e) => s + e.amount, 0);
  const expense = ledger.filter((e) => e.type === "out").reduce((s, e) => s + e.amount, 0);

  const submit = () => {
    if (form.label.trim().length < 2 || !form.amount) {
      notify("البيان والمبلغ مطلوبين", "warn");
      return;
    }
    addLedger({ type: form.type, label: form.label.trim(), amount: Number(form.amount) });
    notify("تسجل القيد ✓");
    setForm({ type: form.type, label: "", amount: "" });
  };

  const inputCls = "w-full rounded-xl border-2 border-ink/15 bg-paper px-3.5 py-2.5 text-sm font-bold text-ink placeholder:text-ink2/40 focus:border-olive-600 focus:outline-none transition-colors";

  return (
    <div className="space-y-5">
      <h3 className="font-display text-3xl text-ink">المحاسبة المصغرة</h3>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "الوارد", value: money(income), cls: "text-wa-dark bg-[#d8efe2] border-wa/30" },
          { label: "المصروف", value: money(expense), cls: "text-pom-700 bg-pom-100 border-pom-300/40" },
          { label: "الصافي", value: money(income - expense), cls: "text-olive-950 bg-saffron-200 border-saffron-500/40" },
        ].map((c) => (
          <div key={c.label} className={`rounded-2xl border-2 p-3.5 lg:p-5 ${c.cls}`}>
            <p className="text-[12px] font-black opacity-80">{c.label}</p>
            <p className="font-display text-xl lg:text-[26px] leading-tight tabular mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-paper rounded-2xl border-2 border-ink/10 p-5">
        <p className="font-black text-ink mb-3 flex items-center gap-2"><ICoin className="w-5 h-5 text-olive-600" /> قيد جديد</p>
        <div className="grid sm:grid-cols-[auto_1fr_auto_auto] gap-3 items-end">
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "in" | "out" })} className={`${inputCls} sm:w-28`}>
            <option value="in">وارد</option>
            <option value="out">مصروف</option>
          </select>
          <input className={inputCls} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="البيان — مثال: شراء مرطبانات" />
          <input dir="ltr" inputMode="numeric" className={`${inputCls} sm:w-36 text-left`} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value.replace(/\D/g, "") })} placeholder="المبلغ" />
          <button onClick={submit} className="px-6 py-2.5 rounded-xl bg-olive-800 hover:bg-olive-700 text-paper font-black text-sm active:scale-95 transition-all">
            تسجيل
          </button>
        </div>
      </div>

      <div className="bg-paper rounded-2xl border-2 border-ink/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-right">
            <thead>
              <tr className="bg-olive-900 text-paper text-[12px] font-black">
                <th className="px-4 py-3">التاريخ</th>
                <th className="px-4 py-3">البيان</th>
                <th className="px-4 py-3">النوع</th>
                <th className="px-4 py-3">المبلغ</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((e) => (
                <tr key={e.id} className="border-t border-ink/8 hover:bg-paper2/70 transition-colors">
                  <td className="px-4 py-3 text-[13px] font-bold text-ink2 whitespace-nowrap">{fmtDate(e.date)}</td>
                  <td className="px-4 py-3 text-[14px] font-black text-ink">{e.label}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${e.type === "in" ? "bg-[#d8efe2] text-wa-dark" : "bg-pom-100 text-pom-700"}`}>
                      {e.type === "in" ? "وارد" : "مصروف"}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-black tabular ${e.type === "in" ? "text-wa-dark" : "text-pom-600"}`}>
                    {e.type === "in" ? "+" : "−"} {money(e.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { if (window.confirm("حذف هالقيد؟")) { deleteLedger(e.id); notify("انشال القيد", "warn"); } }}
                      aria-label="حذف القيد"
                      className="grid place-items-center w-8 h-8 rounded-full text-ink2/50 hover:bg-pom-100 hover:text-pom-600 transition-colors"
                    >
                      <ITrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[12px] font-bold text-ink2/80">💡 الطلبات الموصولة (تم التسليم) تنقيد تلقائياً كـ«وارد» عند تغيير حالتها من تبويب الطلبات.</p>
    </div>
  );
}

/* ==================== الصفحة ==================== */
type Tab = "dash" | "products" | "orders" | "ledger";

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("sh_admin") === "1");
  const [tab, setTab] = useState<Tab>("dash");
  useLockScroll(false);

  if (!authed) return <AdminLogin onOk={() => setAuthed(true)} />;

  const tabs: { id: Tab; label: string; icon: (p: { className?: string }) => React.ReactElement }[] = [
    { id: "dash", label: "نظرة عامة", icon: IChart },
    { id: "products", label: "المنتجات", icon: IBox },
    { id: "orders", label: "الطلبات", icon: IBag },
    { id: "ledger", label: "المحاسبة", icon: ICoin },
  ];

  return (
    <main className="min-h-screen bg-paper2 pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-10">
        <div className="flex items-center gap-3 flex-wrap">
          <Logo className="w-11 h-11" />
          <div className="grow">
            <h1 className="font-display text-3xl lg:text-4xl text-ink leading-none">لوحة البيت السوري</h1>
            <p className="text-[12px] font-black text-ink2 mt-1">إدارة المنتجات · متابعة الطلبات والتوصيلات · المحاسبة</p>
          </div>
          <a href="#/" className="flex items-center gap-1.5 text-sm font-black text-ink2 hover:text-pom-600 transition-colors">
            <IDoc className="w-4 h-4" /> رجوع للموقع
          </a>
          <button
            onClick={() => { sessionStorage.removeItem("sh_admin"); setAuthed(false); }}
            className="text-sm font-black text-pom-600 border-2 border-pom-300/50 px-4 py-2 rounded-full hover:bg-pom-600 hover:text-paper transition-colors"
          >
            خروج
          </button>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black border-2 transition-all ${
                tab === t.id ? "bg-olive-900 text-paper border-olive-900 shadow-lg shadow-olive-900/20" : "bg-paper border-ink/12 text-ink2 hover:border-olive-600"
              }`}
            >
              <t.icon className="w-4.5 h-4.5" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 fade-in" key={tab}>
          {tab === "dash" && <Dashboard goTab={setTab} />}
          {tab === "products" && <AdminProducts />}
          {tab === "orders" && <AdminOrders />}
          {tab === "ledger" && <AdminLedger />}
        </div>
      </div>
    </main>
  );
}
