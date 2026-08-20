import React, { useMemo, useState } from "react";
import { useShop } from "./store";
import { useLockScroll } from "./hooks";
import { arNum, buildWhatsAppMessage, GOVERNORATES, money, Order, waLink, WHATSAPP_DISPLAY } from "./data";
import { IBag, ICheck, ICopy, IMinus, IPlus, ITrash, ITruck, IWhats, IX } from "./icons";

type Step = "cart" | "info" | "done";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, products, setCartQty, removeFromCart, placeOrder, notify } = useShop();
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({ name: "", phone: "", gov: "ديالى", address: "", notes: "" });
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [placed, setPlaced] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  useLockScroll(cartOpen);

  const detailed = useMemo(
    () =>
      cart
        .map((ci) => {
          const p = products.find((p) => p.id === ci.id);
          return p ? { ...p, qty: ci.qty } : null;
        })
        .filter(Boolean) as (typeof products[number] & { qty: number })[],
    [cart, products]
  );
  const total = detailed.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = placed ? buildWhatsAppMessage(placed) : "";
  const link = placed ? waLink(msg) : "";

  const close = () => {
    setCartOpen(false);
    window.setTimeout(() => {
      setStep("cart");
      setErrs({});
      setCopied(false);
      if (step === "done") setPlaced(null);
    }, 350);
  };

  const submitInfo = () => {
    const e: Record<string, boolean> = {};
    if (form.name.trim().length < 2) e.name = true;
    if (!/^07\d{9}$/.test(form.phone.replace(/\s/g, "")) && form.phone.trim().length < 8) e.phone = true;
    if (form.address.trim().length < 5) e.address = true;
    setErrs(e);
    if (Object.keys(e).length) {
      notify("كمّل بيانات التوصيل رجاءً", "warn");
      return;
    }
    const order = placeOrder({ ...form, name: form.name.trim(), address: form.address.trim() });
    setPlaced(order);
    setStep("done");
    notify(`تم تجهيز طلبك رقم #${arNum(order.no)} ✅`);
  };

  const copyMsg = async () => {
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = msg;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  if (!cartOpen) return null;

  const Field = ({ label, children, err }: { label: string; children: React.ReactNode; err?: boolean }) => (
    <label className="block">
      <span className="block text-[13px] font-black text-ink2 mb-1.5">{label}</span>
      <div className={err ? "[&_input]:border-pom-500 [&_input]:bg-pom-100/40" : ""}>{children}</div>
    </label>
  );

  const inputCls =
    "w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-[15px] font-bold text-ink placeholder:text-ink2/40 focus:border-olive-600 focus:outline-none transition-colors";

  return (
    <div className="fixed inset-0 z-[95]">
      <div className="absolute inset-0 bg-ink/55 fade-in" onClick={close} />

      {/* الدرج — ينزلق من اليسار في RTL */}
      <aside className="drawer-in absolute inset-y-0 left-0 w-full max-w-md bg-paper2 shadow-2xl flex flex-col" role="dialog" aria-label="سلة المشتريات">
        <header className="bg-olive-900 text-paper px-5 py-4 flex items-center gap-3">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-paper/10">
            <IBag className="w-5 h-5" />
          </span>
          <div className="grow">
            <h2 className="font-display text-2xl leading-none pt-0.5">سلة المونة</h2>
            <p className="text-[12px] text-paper/60 font-bold mt-1">
              {step === "cart" && (detailed.length ? `${arNum(detailed.reduce((s, i) => s + i.qty, 0))} قطعة` : "فاضية حالياً")}
              {step === "info" && "بيانات التوصيل"}
              {step === "done" && "رسالتك جاهزة 🎉"}
            </p>
          </div>
          {/* خطوات */}
          <div className="flex items-center gap-1.5">
            {(["cart", "info", "done"] as Step[]).map((s, i) => (
              <span key={s} className={`w-2 h-2 rounded-full transition-colors ${step === s ? "bg-saffron-400" : i < ["cart", "info", "done"].indexOf(step) ? "bg-wa" : "bg-paper/25"}`} />
            ))}
          </div>
          <button onClick={close} aria-label="إغلاق السلة" className="grid place-items-center w-10 h-10 rounded-full bg-paper/10 hover:bg-pom-600 transition-colors">
            <IX className="w-5 h-5" />
          </button>
        </header>

        {/* ===== الخطوة ١: السلة ===== */}
        {step === "cart" && (
          <>
            <div className="grow overflow-y-auto px-5 py-4 space-y-3">
              {detailed.length === 0 && (
                <div className="text-center py-16">
                  <IBag className="w-14 h-14 mx-auto text-olive-300" />
                  <p className="font-display text-2xl text-ink mt-4">السلة فاضية</p>
                  <p className="text-ink2 text-sm font-bold mt-1">عبّيها من رفّ المونة وارجع لنا 🫙</p>
                  <button onClick={close} className="mt-5 px-6 py-2.5 rounded-full bg-olive-800 text-paper font-bold text-sm">
                    يلا نتسوّق
                  </button>
                </div>
              )}
              {detailed.map((it) => (
                <div key={it.id} className="bg-paper rounded-2xl border-2 border-ink/10 p-3 flex gap-3 items-center">
                  <img src={it.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="grow min-w-0">
                    <p className="font-extrabold text-[14px] text-ink truncate">{it.name}</p>
                    <p className="text-[11px] font-bold text-ink2 mt-0.5">{it.size} · {money(it.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setCartQty(it.id, it.qty + 1)} aria-label="زيادة" className="grid place-items-center w-7 h-7 rounded-full bg-olive-800 text-paper hover:bg-olive-700 active:scale-90 transition-all">
                        <IPlus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-black text-ink tabular">{arNum(it.qty)}</span>
                      <button onClick={() => setCartQty(it.id, it.qty - 1)} aria-label="إنقاص" className="grid place-items-center w-7 h-7 rounded-full border-2 border-ink/15 text-ink hover:border-pom-500 hover:text-pom-500 active:scale-90 transition-all">
                        <IMinus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-display text-lg text-pom-600 leading-none">{money(it.price * it.qty)}</p>
                    <button onClick={() => { removeFromCart(it.id); notify(`انشال «${it.name}» من السلة`, "warn"); }} aria-label="حذف" className="text-ink2/60 hover:text-pom-600 transition-colors">
                      <ITrash className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {detailed.length > 0 && (
              <footer className="border-t-2 border-ink/10 bg-paper px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-ink2">المجموع</span>
                  <span className="font-display text-3xl text-pom-600">{money(total)}</span>
                </div>
                <p className="text-[12px] font-bold text-ink2/80 flex items-center gap-1.5 mb-3">
                  <ITruck className="w-4 h-4 text-olive-600" /> أجرة التوصيل تُتّفق حسب المحافظة عبر واتساب — الدفع عند الاستلام
                </p>
                <button
                  onClick={() => setStep("info")}
                  className="w-full py-4 rounded-full bg-pom-600 hover:bg-pom-700 text-paper font-black text-lg shadow-lg shadow-pom-600/25 active:scale-[0.98] transition-all"
                >
                  كمّل الطلب ←
                </button>
              </footer>
            )}
          </>
        )}

        {/* ===== الخطوة ٢: البيانات ===== */}
        {step === "info" && (
          <>
            <div className="grow overflow-y-auto px-5 py-5 space-y-4">
              <Field label="الاسم الكريم *" err={errs.name}>
                <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثال: أبو أحمد" />
              </Field>
              <Field label="رقم الهاتف *" err={errs.phone}>
                <input dir="ltr" className={`${inputCls} text-left`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07XX XXX XXXX" />
              </Field>
              <Field label="المحافظة *">
                <select className={inputCls} value={form.gov} onChange={(e) => setForm({ ...form, gov: e.target.value })}>
                  {GOVERNORATES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </Field>
              <Field label="العنوان بالتفصيل *" err={errs.address}>
                <input className={inputCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="الحي، الشارع، أقرب نقطة دالة" />
              </Field>
              <Field label="ملاحظات (اختياري)">
                <textarea rows={2} className={inputCls} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="مثال: بدون بصل، التوصيل مساءً…" />
              </Field>
              <div className="ticket-edge" />
              <div className="text-[13px] font-bold text-ink2 space-y-1">
                {detailed.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>{it.name} × {arNum(it.qty)}</span>
                    <span className="tabular">{money(it.price * it.qty)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-ink pt-1">
                  <span className="font-black">المجموع</span>
                  <span className="font-display text-xl text-pom-600">{money(total)}</span>
                </div>
              </div>
            </div>
            <footer className="border-t-2 border-ink/10 bg-paper px-5 py-4 flex gap-3">
              <button onClick={() => setStep("cart")} className="px-5 py-3.5 rounded-full border-2 border-ink/15 font-bold text-ink2 hover:border-ink/40 transition-colors">
                → رجوع
              </button>
              <button
                onClick={submitInfo}
                className="grow flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-wa hover:bg-wa-dark text-white font-black shadow-lg shadow-wa/30 active:scale-[0.98] transition-all"
              >
                <IWhats className="w-5 h-5" /> أكّد عبر واتساب
              </button>
            </footer>
          </>
        )}

        {/* ===== الخطوة ٣: الرسالة جاهزة ===== */}
        {step === "done" && placed && (
          <>
            <div className="grow overflow-y-auto px-5 py-5">
              <div className="text-center">
                <span className="pop inline-grid place-items-center w-16 h-16 rounded-full bg-wa/15 border-2 border-wa/40 text-wa">
                  <ICheck className="w-8 h-8" />
                </span>
                <h3 className="font-display text-3xl text-ink mt-3">تم تجهيز طلبك!</h3>
                <p className="text-ink2 font-bold text-sm mt-1">رقم الطلب <span className="text-pom-600">#{arNum(placed.no)}</span> — انسخ الرسالة وابعثها لنا، أو اضغط الزر الأخضر وبتفتح جاهزة.</p>
              </div>

              <div dir="ltr" className="mt-5 text-right">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => notify("فتحنا لك واتساب — بس ابعت الرسالة 🙌")}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-wa hover:bg-wa-dark text-white font-black text-lg shadow-lg shadow-wa/30 active:scale-[0.98] transition-all"
                >
                  <IWhats className="w-6 h-6" /> ابعث الطلب عبر واتساب
                </a>
                <button
                  onClick={copyMsg}
                  className="mt-3 flex items-center justify-center gap-2 w-full py-3.5 rounded-full border-2 border-olive-700/40 text-olive-800 font-black hover:bg-olive-800 hover:text-paper transition-colors"
                >
                  {copied ? <ICheck className="w-5 h-5 text-wa" /> : <ICopy className="w-5 h-5" />}
                  {copied ? "اننسخت ✓" : "انسخ رسالة الطلب"}
                </button>
              </div>

              <div className="mt-5 bg-olive-900 text-paper/90 rounded-2xl p-4 text-[12.5px] leading-relaxed font-medium whitespace-pre-wrap" dir="rtl">
                {msg}
              </div>
              <p className="text-center text-[12px] font-bold text-ink2/70 mt-3">
                أو اتصل بينا مباشرة: <span dir="ltr" className="text-olive-700">{WHATSAPP_DISPLAY}</span>
              </p>
            </div>
            <footer className="border-t-2 border-ink/10 bg-paper px-5 py-4">
              <button onClick={close} className="w-full py-3.5 rounded-full bg-olive-800 text-paper font-black hover:bg-olive-700 transition-colors">
                تمام، شكرًا 🌿
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
