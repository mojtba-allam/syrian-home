import React, { useMemo, useState } from "react";
import { useShop } from "./store";
import { useReveal } from "./hooks";
import {
  CATEGORIES, GOVERNORATES, HERO_IMAGE, JAM_IMAGE, Product,
  arNum, money, waLink, WHATSAPP_DISPLAY,
} from "./data";
import { Marquee, MARQUEE_ITEMS } from "./ui";
import {
  IArrowDown, ICheese, ICherry, ICheck, IDrop, IHand, IJar, ILeaf,
  IMortar, IOlive, IPlus, IPom, IShield, ITruck, IWheat, IWhats, ISpark, Logo,
} from "./icons";

const CAT_ICON: Record<string, (p: { className?: string }) => React.ReactElement> = {
  cheese: ICheese, jar: IJar, leaf: ILeaf, drop: IDrop, cherry: ICherry, olive: IOlive,
};

/* ============================ الهيرو ============================ */
function Hero() {
  const { addToCart, notify, products } = useShop();
  const oil = products.find((p) => p.id === "p-oil");
  const scrollToShop = () => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden pattern-leaves">
      {/* كلمة مونة خلفية */}
      <div aria-hidden className="absolute -top-8 left-0 right-0 text-center pointer-events-none select-none">
        <span className="font-display text-[34vw] lg:text-[22rem] leading-none text-olive-800/[0.06]">مونة</span>
      </div>
      <div aria-hidden className="absolute top-24 right-6 text-olive-300/50 hidden md:block">
        <IOlive className="w-24 h-24 spin-slow" strokeWidth={1.2} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-10 lg:pt-16 pb-14 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* النص */}
        <div className="lg:col-span-6 order-2 lg:order-1 relative z-10">
          <div className="reveal inline-flex items-center gap-2 rounded-full border-2 border-olive-600/30 bg-paper2/80 px-4 py-1.5 text-olive-700 text-sm font-bold">
            <IPom className="w-4.5 h-4.5 text-pom-500" strokeWidth={2} />
            عائلة سورية من ديالى — صناعة بيتية ١٠٠٪
          </div>

          <h1 className="reveal mt-5 font-display leading-[1.08] text-[13.5vw] sm:text-6xl lg:text-7xl xl:text-[5.4rem] text-ink">
            من قلبِ <span className="text-pom-600">حلب</span>
            <br />
            إلى موائدِ <span className="text-olive-700">العراق</span>
          </h1>

          <p className="reveal mt-5 max-w-lg text-ink2 text-lg leading-relaxed font-medium">
            مونة سورية على أصولها: لبنة بلدية بحبّة البركة، مكدوس بالجوز ودبس الفليفلة، زعتر حلبي،
            دبس رمان، مربيات بيتية… و<strong className="text-ink">زيت الزيتون العفريني</strong> المكفول وعلى التجريب.
          </p>

          <div className="reveal mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToShop}
              className="group flex items-center gap-2.5 bg-pom-600 hover:bg-pom-700 text-paper font-bold px-7 py-3.5 rounded-full shadow-lg shadow-pom-600/30 active:scale-95 transition-all"
            >
              تسوّق رفّ المونة
              <IArrowDown className="w-4.5 h-4.5 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href={waLink("مرحباً البيت السوري 🌿 بدي أستفسر عن المونة")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 border-2 border-olive-700/40 text-olive-800 hover:bg-olive-800 hover:text-paper font-bold px-6 py-3 rounded-full transition-colors"
            >
              <IWhats className="w-5 h-5" />
              <span dir="ltr">{WHATSAPP_DISPLAY}</span>
            </a>
          </div>

          {/* شريط الثقة */}
          <div className="reveal mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["٢٤ ساعة", "توصيل لكل العراق"],
              ["١٨ محافظة", "يوصلك وين ما كنت"],
              ["مكفول", "وعلى التجريب"],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center gap-3">
                <span className="font-display text-3xl text-pom-600 leading-none pt-1">{a}</span>
                <span className="text-sm font-bold text-ink2 leading-tight">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* صورة القوس */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative z-10">
          <div className="reveal relative max-w-md mx-auto">
            <div aria-hidden className="absolute -inset-4 arch border-2 border-dashed border-olive-600/35" />
            <div className="arch relative overflow-hidden border-[6px] border-olive-800 shadow-2xl shadow-ink/25 aspect-[4/5]">
              <img
                src={HERO_IMAGE}
                alt="رف المونة السورية: لبنة ومكدوس وزعتر ودبس رمان وزيت زيتون"
                className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>

            {/* ملصق مكفول */}
            <div className="floaty absolute -top-3 -right-3 lg:-right-8 z-10" style={{ ["--fr" as string]: "8deg" }}>
              <div className="bg-saffron-500 text-olive-950 rounded-2xl px-4 py-2.5 shadow-xl shadow-saffron-600/30 rotate-6 border-2 border-olive-950/15">
                <p className="flex items-center gap-1.5 font-black text-sm">
                  <IShield className="w-4.5 h-4.5" strokeWidth={2.2} /> مكفول وعلى التجريب
                </p>
              </div>
            </div>

            {/* بطاقة الزيت */}
            {oil && (
              <div className="floaty absolute -bottom-5 right-2 lg:-right-6 z-10 w-56 bg-paper rounded-2xl shadow-xl shadow-ink/20 border-2 border-ink/10 p-3 flex items-center gap-3" style={{ ["--fr" as string]: "-2deg", animationDelay: "1.2s" }}>
                <img src={oil.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-[12px] font-black text-pom-600">الأفضل لدينا ★</p>
                  <p className="text-[13px] font-bold text-ink truncate">زيت عفريني — بارد</p>
                  <button
                    onClick={() => { addToCart(oil.id); notify("انضاف زيت عفريني للسلة 🫒"); }}
                    className="mt-1 text-[11px] font-black text-olive-700 hover:text-pom-600 transition-colors"
                  >
                    + ضيفه عالسلة · {money(oil.price)}
                  </button>
                </div>
              </div>
            )}

            {/* طابع العائلة */}
            <div className="absolute top-1/2 -left-4 lg:-left-10 z-10 hidden sm:block">
              <div className="bg-olive-800 text-paper rounded-full w-24 h-24 grid place-items-center text-center rotate-[-8deg] shadow-lg border-4 border-paper">
                <p className="font-display text-sm leading-tight pt-1">صناعة<br />يدنا<br />🌿</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-pom-600 text-paper border-y-4 border-olive-950/80 py-3.5">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
}

/* ============================ بطاقة منتج ============================ */
function ProductCard({ p, i }: { p: Product; i: number }) {
  const { addToCart, notify } = useShop();
  const [added, setAdded] = useState(false);
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const out = p.stock <= 0;

  const add = () => {
    if (out) return;
    addToCart(p.id);
    setAdded(true);
    notify(`انضاف «${p.name}» للسلة`);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className="reveal group relative bg-paper rounded-[20px] border-2 border-ink/10 hover:border-olive-600/50 shadow-sm hover:shadow-xl hover:shadow-ink/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
      style={{ transitionDelay: `${(i % 4) * 70}ms` }}
    >
      <div className="relative overflow-hidden aspect-square bg-paper2">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07] group-hover:rotate-1"
        />
        {p.badge && (
          <span className="absolute top-3 right-3 bg-pom-600 text-paper text-[11px] font-black px-3 py-1.5 rounded-full shadow-md rotate-2">
            {p.badge}
          </span>
        )}
        {out && (
          <div className="absolute inset-0 bg-ink/55 grid place-items-center">
            <span className="bg-paper text-pom-600 font-black px-4 py-2 rounded-full border-2 border-pom-600 -rotate-3">
              نفدت الكمية
            </span>
          </div>
        )}
        {!out && p.stock <= 10 && (
          <span className="absolute bottom-3 right-3 bg-olive-900/85 text-saffron-400 text-[11px] font-bold px-2.5 py-1 rounded-full">
            باقي {arNum(p.stock)} بس
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-extrabold text-ink text-[17px] leading-snug">{p.name}</h3>
        </div>
        {cat && (
          <p className="mt-1 text-[11px] font-black text-olive-600 tracking-wide">{cat.name}</p>
        )}
        <p className="mt-1.5 text-[13px] text-ink2 leading-relaxed line-clamp-2">{p.desc}</p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <div>
            <p className="font-display text-[22px] text-pom-600 leading-none">{money(p.price)}</p>
            <p className="text-[11px] font-bold text-ink2 mt-1">{p.size}</p>
          </div>
          <button
            onClick={add}
            disabled={out}
            aria-label={`أضف ${p.name} إلى السلة`}
            className={`flex items-center gap-1.5 h-11 px-4 rounded-full font-black text-sm transition-all active:scale-90 ${
              out
                ? "bg-sand text-ink2/50 cursor-not-allowed"
                : added
                ? "bg-wa text-white"
                : "bg-olive-800 text-paper hover:bg-pom-600 shadow-md shadow-olive-800/25"
            }`}
          >
            {added ? <ICheck className="w-4.5 h-4.5" /> : <IPlus className="w-4.5 h-4.5" />}
            {added ? "انضاف" : "للسلة"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ============================ قسم المتجر ============================ */
function ShopSection() {
  const { products } = useShop();
  const [cat, setCat] = useState<string>("all");
  useReveal([cat]);

  const list = useMemo(
    () => (cat === "all" ? products : products.filter((p) => p.category === cat)),
    [products, cat]
  );

  return (
    <section id="shop" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="reveal">
          <p className="flex items-center gap-2 text-pom-600 font-black text-sm">
            <IJar className="w-5 h-5" /> افتح المرطبان وشمّ
          </p>
          <h2 className="font-display text-5xl lg:text-6xl text-ink mt-2 leading-none">
            رفّ <span className="text-olive-700">المونة</span>
          </h2>
        </div>
        <p className="reveal text-ink2 font-medium text-sm max-w-xs leading-relaxed">
          كل شي معمول بالبيت، على الطريقة السورية الأصلية. اختار تصنيف أو تصفّح الكل.
        </p>
      </div>

      {/* فلاتر التصنيف */}
      <div className="reveal mt-8 flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <button
          onClick={() => setCat("all")}
          className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-black border-2 transition-all ${
            cat === "all"
              ? "bg-olive-800 text-paper border-olive-800 shadow-md"
              : "bg-paper border-ink/15 text-ink2 hover:border-olive-600 hover:text-olive-700"
          }`}
        >
          الكل ({arNum(products.length)})
        </button>
        {CATEGORIES.map((c) => {
          const Ic = CAT_ICON[c.icon] ?? IJar;
          const n = products.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black border-2 transition-all ${
                cat === c.id
                  ? "bg-olive-800 text-paper border-olive-800 shadow-md"
                  : "bg-paper border-ink/15 text-ink2 hover:border-olive-600 hover:text-olive-700"
              }`}
            >
              <Ic className="w-4.5 h-4.5" />
              {c.name} ({arNum(n)})
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 lg:gap-5">
        {list.map((p, i) => (
          <ProductCard key={p.id} p={p} i={i} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="text-center py-16 text-ink2">
          <IJar className="w-12 h-12 mx-auto text-olive-300" />
          <p className="font-bold mt-3">ماكو منتجات بهالتصنيف حالياً</p>
        </div>
      )}
    </section>
  );
}

/* ============================ الحكاية ============================ */
const STORY = [
  {
    icon: IPom,
    title: "عائلة حلبية… ساكنة ديالى",
    text: "نحنا عائلة سورية من سكان العراق — محافظة ديالى. حملنا معنا من حلب وشام الذاكرة: وصفات الستات، وطريقة التعتيق، وصبر المونة.",
  },
  {
    icon: IMortar,
    title: "نصنع بأيدينا، مو مصانع",
    text: "اللبنة بلدية باللحبة السودا والزعتر والبهارات الحلبية، والمكدوس على أصوله بالجوز ودبس الفليفلة وزيت الزيتون. كل مرطبان يمرّ بإيدينا.",
  },
  {
    icon: IShield,
    title: "مكفول… وعلى التجريب",
    text: "ما نطلب منك تثق فينا بالكلام. جرّب أول مرطبان، وإذا ما عجبك — حقك علينا. زيتنا العفريني معصور على البارد ومضمون قبل أي شي.",
  },
];

function StorySection() {
  return (
    <section id="story" className="relative bg-olive-900 text-paper overflow-hidden scroll-mt-16 grain">
      <div className="absolute inset-0 pattern-stars opacity-60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-28 grid lg:grid-cols-2 gap-12">
        <div className="lg:sticky lg:top-28 self-start">
          <p className="reveal flex items-center gap-2 text-saffron-400 font-black text-sm">
            <IHand className="w-5 h-5" /> من إيدهم لإيدك
          </p>
          <h2 className="reveal font-display text-6xl lg:text-7xl leading-[1.05] mt-3">
            حكاية
            <br />
            <span className="text-saffron-400">بيتِنا</span>
          </h2>
          <p className="reveal mt-5 text-paper/70 max-w-md leading-relaxed text-lg">
            المونة عندنا مو تجارة وبس — هي الطريقة اللي كبرنا فيها. وهي الطريقة اللي نربي فيها ولادنا.
          </p>
          <div className="reveal mt-8 flex items-center gap-3 text-saffron-400">
            <Logo className="w-12 h-12" />
            <p className="font-display text-2xl leading-tight pt-1">لسنا الوحيدين…<br />لكننا الأفضل</p>
          </div>
        </div>

        <div className="space-y-6">
          {STORY.map((s, i) => (
            <div
              key={s.title}
              className="reveal relative bg-olive-800/70 border-2 border-paper/10 rounded-[22px] p-6 lg:p-8 hover:border-saffron-500/50 transition-colors"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="absolute -top-5 left-6 font-display text-7xl text-paper/10 leading-none select-none">
                {arNum(i + 1).padStart(2, "٠")}
              </span>
              <div className="relative flex items-start gap-4">
                <span className="shrink-0 grid place-items-center w-13 h-13 rounded-2xl bg-saffron-500/15 border border-saffron-500/40 text-saffron-400 p-3">
                  <s.icon className="w-7 h-7" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-display text-3xl text-paper leading-tight">{s.title}</h3>
                  <p className="mt-2.5 text-paper/70 leading-relaxed text-[15px]">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ ليش نحنا ============================ */
const WHY = [
  { icon: IShield, title: "مكفول وعلى التجريب", text: "جرّب قبل ما تحكم — كل منتج مضمون من عائلتنا لعائلتك." },
  { icon: IMortar, title: "صناعة بيتية بالكامل", text: "بلا مواد حافظة ولا نكهات صناعية. نفس الطريقة اللي منعمل فيها لأهل البيت." },
  { icon: ITruck, title: "توصيل خلال ٢٤ ساعة", text: "لكل محافظات العراق — من زاخو للفاو، يوصلك الطلب طازة." },
  { icon: IWheat, title: "مواد أولية منتقاة", text: "زيتون عفرين، رمان معتّق، فليفلة مشمّسة، وجوز بلدي. الأفضل بس." },
];

function WhySection() {
  const { products, addToCart, notify } = useShop();
  const oil = products.find((p) => p.id === "p-oil");

  return (
    <section id="why" className="relative scroll-mt-20 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="reveal text-center max-w-2xl mx-auto">
        <p className="flex items-center justify-center gap-2 text-pom-600 font-black text-sm">
          <ISpark className="w-4 h-4" /> مو حكي فاضي
        </p>
        <h2 className="font-display text-5xl lg:text-6xl text-ink mt-2 leading-none">ليش <span className="text-pom-600">البيت السوري؟</span></h2>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-x-16 gap-y-10">
        {WHY.map((w, i) => (
          <div
            key={w.title}
            className={`reveal flex items-start gap-5 ${i % 2 === 1 ? "md:translate-y-8" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="shrink-0 grid place-items-center w-14 h-14 rounded-full bg-olive-800 text-saffron-400 border-4 border-olive-200/60">
              <w.icon className="w-7 h-7" strokeWidth={1.7} />
            </span>
            <div className="border-b-2 border-dashed border-olive-600/25 pb-6 grow">
              <h3 className="font-extrabold text-xl text-ink">{w.title}</h3>
              <p className="mt-1.5 text-ink2 leading-relaxed text-[15px]">{w.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* أضواء على الزيت العفريني */}
      {oil && (
        <div className="reveal mt-16 lg:mt-24 relative overflow-hidden rounded-[28px] bg-olive-950 text-paper grain">
          <div className="absolute inset-0 pattern-stars opacity-50" />
          <div className="relative z-10 grid md:grid-cols-2 items-center">
            <div className="p-8 lg:p-12">
              <p className="inline-flex items-center gap-2 bg-saffron-500 text-olive-950 text-xs font-black px-3.5 py-1.5 rounded-full">
                <ISpark className="w-3.5 h-3.5" /> أفضل صنف لدينا
              </p>
              <h3 className="font-display text-4xl lg:text-5xl mt-4 leading-tight">
                زيت الزيتون <span className="text-saffron-400">العفريني</span> الأصلي
              </h3>
              <ul className="mt-5 space-y-2.5 text-paper/80 font-medium text-[15px]">
                {["معصور على البارد — بكورة الموسم", "من كروم عفرين مباشرة", "مكفول وعلى التجريب قبل الشراء", "قنينة ١ لتر بتوصلك بخلال ٢٤ ساعة"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <ICheck className="w-4.5 h-4.5 text-saffron-400 shrink-0" strokeWidth={2.6} /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => { addToCart(oil.id); notify("انضاف الزيت العفريني للسلة 🫒"); }}
                  className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-olive-950 font-black px-6 py-3.5 rounded-full active:scale-95 transition-all shadow-lg shadow-saffron-500/25"
                >
                  <IPlus className="w-4.5 h-4.5" strokeWidth={2.6} />
                  ضيفه للسلة · {money(oil.price)}
                </button>
                <span className="text-paper/60 text-sm font-bold">{oil.size} · باقي {arNum(oil.stock)} قنينة</span>
              </div>
            </div>
            <div className="relative h-72 md:h-full min-h-[280px]">
              <img src={oil.image} alt="زيت الزيتون العفريني معصور على البارد" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-olive-950 via-olive-950/20 to-transparent hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-950 via-transparent to-transparent md:hidden" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================ التوصيل ============================ */
function DeliverySection() {
  return (
    <section id="delivery" className="relative bg-pom-600 text-paper overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 opacity-10 pattern-leaves" style={{ filter: "invert(1)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-16 h-16 rounded-full bg-paper/15 border-2 border-paper/30">
                <ITruck className="w-8 h-8" strokeWidth={1.6} />
              </span>
              <h2 className="font-display text-4xl lg:text-5xl leading-tight">
                خلال <span className="text-saffron-400">٢٤ ساعة</span>
                <br /> لوين ما كنت بالعراق
              </h2>
            </div>
            <p className="mt-4 text-paper/85 leading-relaxed font-medium">
              نوصّل لكل المحافظات الـ١٨. اطلب عبر واتساب وخلّي الباقي علينا — والدفع عند الاستلام،
              والدفع الإلكتروني عبر الموقع <b className="text-saffron-400">قريباً إن شاء الله</b>.
            </p>
          </div>
          <div className="lg:col-span-7 reveal" style={{ transitionDelay: "120ms" }}>
            <div className="flex flex-wrap gap-2">
              {GOVERNORATES.map((g, i) => (
                <span
                  key={g}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors hover:bg-paper hover:text-pom-600 cursor-default ${
                    g === "ديالى" ? "bg-saffron-500 text-olive-950 border-saffron-400" : "border-paper/35 text-paper/90"
                  }`}
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {g} {g === "ديالى" && "🏠"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ الصفحة الرئيسية ============================ */
export default function HomePage() {
  useReveal([JAM_IMAGE]);
  return (
    <main>
      <Hero />
      <ShopSection />
      <StorySection />
      <WhySection />
      <DeliverySection />
    </main>
  );
}
