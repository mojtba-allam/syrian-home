import React, { useEffect, useState } from "react";
import { useShop } from "./store";
import { useLockScroll } from "./hooks";
import { arNum, CATEGORIES, money, Product, waLink } from "./data";
import { IBag, IBox, ICheck, IMinus, IPlus, IShield, ITruck, IWhats, IX, IZoom } from "./icons";

/** عرض تفاصيل المنتج — صورة كبيرة قابلة للتكبير + كل التفاصيل + صور من نفس الرف */
export default function ProductModal({
  product,
  onClose,
  onOpen,
}: {
  product: Product;
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  const { products, addToCart, notify, setCartOpen } = useShop();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 40%");
  useLockScroll(true);

  /* إعادة الضبط عند تبديل المنتج من شريط الصور */
  useEffect(() => {
    setQty(1);
    setAdded(false);
    setZoom(false);
  }, [product.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cat = CATEGORIES.find((c) => c.id === product.category);
  const out = product.stock <= 0;
  const maxQty = Math.max(1, Math.min(product.stock, 20));

  const related = [...products.filter((p) => p.category === product.category && p.id !== product.id)];
  if (related.length < 4) {
    const others = products.filter((p) => p.category !== product.category && p.id !== product.id && !related.some((r) => r.id === p.id));
    related.push(...others);
  }
  const photoStrip = related.slice(0, 5);

  const toggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) {
      const r = e.currentTarget.getBoundingClientRect();
      setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    }
    setZoom(!zoom);
  };

  const add = () => {
    if (out) return;
    addToCart(product.id, qty);
    setAdded(true);
    notify(`انضاف «${product.name}» ×${arNum(qty)} للسلة`);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const stockPct = Math.min(100, (product.stock / 40) * 100);

  return (
    <div className="fixed inset-0 z-[85] overflow-y-auto overscroll-contain">
      <div className="absolute inset-0 bg-olive-950/70 fade-in" onClick={onClose} />

      <div className="relative min-h-full flex items-start md:items-center justify-center p-0 md:p-6">
        <div
          className="fade-in relative w-full max-w-4xl bg-paper md:rounded-[26px] border-2 border-ink/15 md:shadow-2xl md:shadow-ink/40 overflow-hidden"
          role="dialog"
          aria-label={`تفاصيل ${product.name}`}
        >
          {/* شريط علوي */}
          <div className="sticky top-0 z-20 flex items-center justify-between bg-olive-900 text-paper px-5 py-3">
            <span className="text-[12px] font-black text-paper/60">تفاصيل المنتج · البيت السوري</span>
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="grid place-items-center w-9 h-9 rounded-full bg-paper/10 hover:bg-pom-600 active:scale-90 transition-all"
            >
              <IX className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2">
            {/* ===== الصورة ===== */}
            <div className="relative bg-olive-950 pattern-stars">
              <div
                className={`relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={toggleZoom}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  style={{ transform: zoom ? "scale(1.9)" : "scale(1)", transformOrigin: origin }}
                />
                {!zoom && <div className="absolute inset-0 bg-gradient-to-t from-olive-950/50 via-transparent to-transparent md:bg-gradient-to-l md:from-olive-950/20" />}
              </div>

              {/* شارة الزوم */}
              <span
                className={`absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full border transition-colors pointer-events-none ${
                  zoom ? "bg-pom-600 border-pom-500 text-paper" : "bg-paper/90 border-ink/10 text-olive-800"
                }`}
              >
                <IZoom className="w-3.5 h-3.5" strokeWidth={2.2} />
                {zoom ? "اضغط للتصغير" : "اضغط على الصورة للتكبير"}
              </span>

              {product.badge && (
                <span className="absolute top-3 right-3 z-10 bg-saffron-500 text-olive-950 text-[12px] font-black px-3.5 py-1.5 rounded-full shadow-lg rotate-2 border-2 border-olive-950/15">
                  {product.badge}
                </span>
              )}
              {out && (
                <div className="absolute inset-0 z-10 bg-ink/60 grid place-items-center">
                  <span className="bg-paper text-pom-600 font-black px-5 py-2.5 rounded-full border-2 border-pom-600 -rotate-3">نفدت الكمية</span>
                </div>
              )}
            </div>

            {/* ===== التفاصيل ===== */}
            <div className="p-6 md:p-7 flex flex-col">
              {cat && (
                <p className="text-[12px] font-black text-olive-600 tracking-wide flex items-center gap-1.5">
                  <IBox className="w-4 h-4" /> تصنيف: {cat.name}
                </p>
              )}
              <h2 className="font-display text-4xl md:text-[42px] leading-[1.1] text-ink mt-1.5">{product.name}</h2>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-display text-4xl text-pom-600 leading-none">{money(product.price)}</span>
                <span className="text-[13px] font-black text-ink2">{product.size}</span>
              </div>

              <p className="mt-4 text-ink2 leading-relaxed font-medium text-[15px]">{product.desc}</p>

              {/* المواصفات */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between bg-paper2 rounded-xl px-4 py-3">
                  <span className="text-[13px] font-black text-ink2">المتوفر حالياً</span>
                  {!out ? (
                    <span className="flex items-center gap-2.5">
                      <span className="w-24 h-2 rounded-full bg-ink/10 overflow-hidden">
                        <span
                          className={`block h-full rounded-full transition-all ${product.stock <= 10 ? "bg-saffron-500" : "bg-olive-600"}`}
                          style={{ width: `${stockPct}%` }}
                        />
                      </span>
                      <span className={`text-[13px] font-black ${product.stock <= 10 ? "text-saffron-600" : "text-olive-700"}`}>
                        {arNum(product.stock)} قطعة
                      </span>
                    </span>
                  ) : (
                    <span className="text-[13px] font-black text-pom-600">نفدت مؤقتاً</span>
                  )}
                </div>
                <div className="flex items-center justify-between bg-paper2 rounded-xl px-4 py-3">
                  <span className="text-[13px] font-black text-ink2">الحجم / العبوة</span>
                  <span className="text-[13px] font-black text-ink">{product.size}</span>
                </div>
                <div className="flex items-center justify-between bg-paper2 rounded-xl px-4 py-3">
                  <span className="text-[13px] font-black text-ink2">الضمان</span>
                  <span className="text-[13px] font-black text-olive-700 flex items-center gap-1.5">
                    <IShield className="w-4 h-4 text-olive-600" strokeWidth={2} /> مكفول وعلى التجريب
                  </span>
                </div>
              </div>

              {/* الكمية + الإضافة */}
              <div className="mt-6 flex items-stretch gap-3">
                <div className={`flex items-center gap-1 rounded-full border-2 p-1 ${out ? "border-ink/10 opacity-40" : "border-ink/15"}`}>
                  <button
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={out || qty >= maxQty}
                    aria-label="زيادة الكمية"
                    className="grid place-items-center w-9 h-9 rounded-full bg-olive-800 text-paper hover:bg-olive-700 active:scale-90 transition-all disabled:opacity-40"
                  >
                    <IPlus className="w-4 h-4" />
                  </button>
                  <span className="w-9 text-center font-display text-2xl text-ink tabular">{arNum(qty)}</span>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={out || qty <= 1}
                    aria-label="إنقاص الكمية"
                    className="grid place-items-center w-9 h-9 rounded-full border-2 border-ink/15 text-ink hover:border-pom-500 hover:text-pom-500 active:scale-90 transition-all disabled:opacity-40"
                  >
                    <IMinus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={add}
                  disabled={out}
                  className={`grow flex items-center justify-center gap-2.5 rounded-full font-black text-[15px] px-4 active:scale-[0.97] transition-all ${
                    out
                      ? "bg-sand text-ink2/50 cursor-not-allowed"
                      : added
                      ? "bg-wa text-white"
                      : "bg-pom-600 hover:bg-pom-700 text-paper shadow-lg shadow-pom-600/25"
                  }`}
                >
                  {added ? <ICheck className="w-5 h-5" strokeWidth={2.4} /> : <IBag className="w-5 h-5" />}
                  {out ? "غير متوفر" : added ? "انضاف ✓" : `أضف للسلة · ${money(product.price * qty)}`}
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => { onClose(); setCartOpen(true); }}
                  className="text-[13px] font-black text-olive-700 hover:text-pom-600 transition-colors underline decoration-2 decoration-olive-600/30 underline-offset-4"
                >
                  عرض السلة
                </button>
                <span className="w-1 h-1 rounded-full bg-ink/20" />
                <a
                  href={waLink(`مرحباً البيت السوري 🌿 بدي أطلب: ${product.name} (${product.size}) — الكمية ${arNum(qty)} — السعر ${money(product.price * qty)}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] font-black text-wa-dark hover:text-wa transition-colors flex items-center gap-1.5"
                >
                  <IWhats className="w-4 h-4" /> اطلبه مباشرة عبر واتساب
                </a>
              </div>

              <div className="ticket-edge mt-5" />
              <p className="mt-4 text-[12px] font-bold text-ink2 flex items-center gap-2">
                <ITruck className="w-4.5 h-4.5 text-olive-600 shrink-0" />
                توصيل خلال ٢٤ ساعة لكل محافظات العراق — الدفع عند الاستلام
              </p>
            </div>
          </div>

          {/* ===== من نفس الرف ===== */}
          {photoStrip.length > 0 && (
            <div className="border-t-2 border-ink/10 bg-paper2 px-5 py-4 md:px-7">
              <p className="text-[13px] font-black text-ink2 mb-3">من نفس الرف — تصفّح المزيد 🫙</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {photoStrip.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onOpen(r.id)}
                    className="group shrink-0 w-24 text-right"
                    aria-label={`عرض ${r.name}`}
                  >
                    <span className="block relative rounded-xl overflow-hidden border-2 border-ink/10 group-hover:border-pom-500 transition-colors aspect-square">
                      <img src={r.image} alt={r.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <span className="absolute inset-0 bg-olive-950/0 group-hover:bg-olive-950/20 transition-colors grid place-items-center">
                        <IZoom className="w-5 h-5 text-paper opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2.2} />
                      </span>
                    </span>
                    <span className="block mt-1.5 text-[11px] font-black text-ink leading-tight truncate group-hover:text-pom-600 transition-colors">{r.name}</span>
                    <span className="block text-[11px] font-bold text-ink2">{money(r.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
