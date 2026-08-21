import React, { useState } from "react";
import { useShop } from "./store";
import { useLockScroll, Route } from "./hooks";
import { WHATSAPP_DISPLAY, waLink } from "./data";
import { IBag, IDoc, IMenu, IWhats, IX, Logo, IUser, ISpark } from "./icons";

/* ================= التوست ================= */
export function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="fixed bottom-24 lg:bottom-8 inset-x-0 z-[99] flex flex-col items-center gap-2 px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-in pointer-events-auto rounded-full px-5 py-2.5 text-sm font-bold shadow-xl shadow-ink/20 border ${
            t.tone === "ok"
              ? "bg-olive-800 text-paper border-olive-600"
              : "bg-pom-600 text-paper border-pom-700"
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}

/* ================= زر واتساب العائم ================= */
export function FloatingWA() {
  return (
    <a
      href={waLink("مرحباً البيت السوري 🌿 عندي استفسار عن المونة")}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر واتساب"
      className="wa-pulse fixed bottom-5 left-5 z-[80] grid place-items-center w-14 h-14 rounded-full bg-wa text-white shadow-xl shadow-wa/40 hover:scale-110 active:scale-95 transition-transform"
    >
      <IWhats className="w-7 h-7" />
    </a>
  );
}

/* ================= شريط متحرك ================= */
export function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-3 px-3 whitespace-nowrap">
          <ISpark className="w-3.5 h-3.5 text-saffron-400 shrink-0" />
          <span className="font-display text-lg lg:text-xl leading-none pt-1.5">{it}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div dir="ltr" className={`overflow-hidden ${className}`}>
      <div dir="rtl" className={`flex w-max ${reverse ? "marquee-track2" : "marquee-track"}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

export const MARQUEE_ITEMS = [
  "لبنة بلدية بحبّة البركة",
  "مكدوس على أصوله",
  "زعتر حلبي أصلي",
  "دبس رمان طبيعي",
  "خل تفاح عضوي مكفول",
  "مربيات بيتية",
  "جبنة بلدية",
  "دبس فليفلة حلبي",
  "زيت عفريني معصور على البارد",
  "مكفول وعلى التجريب",
];

/* ================= الهيدر ================= */
const NAV = [
  { id: "shop", label: "رفّ المونة" },
  { id: "story", label: "حكايتنا" },
  { id: "why", label: "ليش نحنا" },
  { id: "delivery", label: "التوصيل" },
];

export function Header({ route, nav }: { route: Route; nav: (r: Route) => void }) {
  const { cartCount, setCartOpen } = useShop();
  const [open, setOpen] = useState(false);
  useLockScroll(open);

  const go = (id: string) => {
    setOpen(false);
    if (route !== "home") {
      nav("home");
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-[70] bg-paper/90 backdrop-blur border-b-2 border-ink/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 lg:h-[72px] flex items-center gap-3">
        <a href="#/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 group">
          <Logo className="w-10 h-10 lg:w-11 lg:h-11 group-hover:rotate-6 transition-transform" />
          <span className="leading-none">
            <span className="block font-display text-[26px] lg:text-3xl text-pom-600">البيت السوري</span>
            <span className="block text-[10px] lg:text-[11px] font-bold text-olive-600 tracking-wide mt-0.5">
              مونة سورية أصيلة · ديالى — العراق
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1 mr-6">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="px-3.5 py-2 rounded-full text-sm font-bold text-ink2 hover:text-pom-600 hover:bg-pom-100/60 transition-colors"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => nav("docs")}
            className={`px-3.5 py-2 rounded-full text-sm font-bold inline-flex items-center gap-1.5 transition-colors ${
              route === "docs" ? "text-paper bg-olive-800" : "text-ink2 hover:text-olive-800 hover:bg-olive-200/50"
            }`}
          >
            <IDoc className="w-4 h-4" /> التوثيق
          </button>
        </nav>

        <div className="flex items-center gap-2 mr-auto">
          <a
            href="#/admin"
            aria-label="لوحة المدير"
            title="لوحة المدير"
            className="grid place-items-center w-10 h-10 rounded-full border-2 border-ink/10 text-ink2 hover:text-olive-800 hover:border-olive-600 hover:bg-olive-200/40 transition-colors"
          >
            <IUser className="w-5 h-5" />
          </a>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 h-10 px-4 rounded-full bg-olive-800 text-paper font-bold text-sm hover:bg-olive-700 active:scale-95 transition-all"
          >
            <IBag className="w-5 h-5" />
            <span className="hidden sm:inline">السلة</span>
            {cartCount > 0 && (
              <span className="pop absolute -top-1.5 -left-1.5 min-w-5 h-5 px-1 rounded-full bg-pom-500 text-paper text-[11px] font-black grid place-items-center border-2 border-paper">
                {cartCount.toLocaleString("ar-EG")}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="القائمة"
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full border-2 border-ink/10 text-ink"
          >
            <IMenu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {open && (
        <div className="fixed inset-0 z-[85] lg:hidden">
          <div className="absolute inset-0 bg-ink/50 fade-in" onClick={() => setOpen(false)} />
          <div className="drawer-in absolute inset-y-0 left-0 w-[78%] max-w-xs bg-olive-900 text-paper p-6 flex flex-col pattern-stars">
            <div className="flex items-center justify-between mb-8">
              <span className="flex items-center gap-2">
                <Logo className="w-9 h-9" />
                <span className="font-display text-2xl">البيت السوري</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="إغلاق" className="w-9 h-9 grid place-items-center rounded-full border border-paper/20">
                <IX className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="text-right px-4 py-3 rounded-xl font-display text-2xl text-paper/90 hover:bg-paper/10 hover:text-saffron-400 transition-colors"
                >
                  {n.label}
                </button>
              ))}
              <button
                onClick={() => { setOpen(false); nav("docs"); }}
                className="text-right px-4 py-3 rounded-xl font-display text-2xl text-paper/90 hover:bg-paper/10 hover:text-saffron-400 transition-colors"
              >
                التوثيق API و ERD
              </button>
              <button
                onClick={() => { setOpen(false); nav("admin"); }}
                className="text-right px-4 py-3 rounded-xl font-display text-2xl text-paper/90 hover:bg-paper/10 hover:text-saffron-400 transition-colors"
              >
                لوحة المدير
              </button>
            </nav>
            <div className="mt-auto pt-6 border-t border-paper/15">
              <p className="text-sm text-paper/60 mb-2">للطلب والاستفسار</p>
              <a
                href={waLink("مرحباً البيت السوري 🌿")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-wa font-bold text-white"
              >
                <IWhats className="w-5 h-5" /> {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= الفوتر ================= */
export function Footer({ nav }: { nav: (r: Route) => void }) {
  const go = (id: string) => {
    nav("home");
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
  };
  return (
    <footer className="relative bg-olive-950 text-paper overflow-hidden grain">
      <div className="absolute inset-0 pattern-stars opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-12 h-12" />
              <div>
                <p className="font-display text-3xl leading-none">البيت السوري</p>
                <p className="text-olive-300 text-sm font-bold mt-1">مونة سورية على أصولها</p>
              </div>
            </div>
            <p className="text-paper/70 leading-relaxed text-[15px] max-w-xs">
              عائلة سورية من سكان ديالى — العراق. نصنع المونة البلدية بأيدينا: لبنة، مكدوس، زعتر، دبس، مربيات،
              وزيت الزيتون العفريني المكفول وعلى التجريب.
            </p>
          </div>

          <div>
            <p className="font-display text-xl text-saffron-400 mb-4">روابط سريعة</p>
            <ul className="space-y-2.5 text-[15px]">
              {[
                ["رفّ المونة", () => go("shop")],
                ["حكايتنا", () => go("story")],
                ["التوصيل والمحافظات", () => go("delivery")],
              ].map(([label, fn]) => (
                <li key={label as string}>
                  <button onClick={fn as () => void} className="text-paper/75 hover:text-saffron-400 transition-colors font-medium">
                    {label as string}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => nav("docs")} className="text-paper/75 hover:text-saffron-400 transition-colors font-medium inline-flex items-center gap-1.5">
                  <IDoc className="w-4 h-4" /> توثيق الـ API ومخطط ERD
                </button>
              </li>
              <li>
                <button onClick={() => nav("admin")} className="text-paper/75 hover:text-saffron-400 transition-colors font-medium inline-flex items-center gap-1.5">
                  <IUser className="w-4 h-4" /> لوحة مدير الموقع
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xl text-saffron-400 mb-4">تواصل واطلب</p>
            <a
              href={waLink("مرحباً البيت السوري 🌿 بدي أطلب مونة")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-wa hover:bg-wa-dark text-white font-bold transition-colors"
            >
              <IWhats className="w-5 h-5" />
              <span dir="ltr">{WHATSAPP_DISPLAY}</span>
            </a>
            <p className="text-paper/60 text-sm mt-4 leading-relaxed">
              التوصيل خلال <b className="text-saffron-400">٢٤ ساعة</b> لكل محافظات العراق.
              <br />
              الدفع عند الاستلام حالياً — والدفع الإلكتروني عبر الموقع <b className="text-paper/85">قريباً</b>.
            </p>
          </div>
        </div>

        <div className="ticket-edge my-10 opacity-40" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-paper/50">
          <p>© {new Date().getFullYear().toLocaleString("ar-EG").replace(/[٬,]/g, "")} البيت السوري — صُنع بحُب في ديالى 🌿</p>
          <p className="font-display text-base text-paper/60">لسنا الوحيدين… لكننا الأفضل</p>
        </div>
      </div>
    </footer>
  );
}
