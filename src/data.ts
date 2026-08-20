/* ============ الأنواع والبيانات الأساسية ============ */

export const WHATSAPP_NUMBER = "9647887356906";
export const WHATSAPP_DISPLAY = "+964 788 735 6906";

export type Category = { id: string; name: string; icon: string };

export type Product = {
  id: string;
  name: string;
  category: string; // category id
  desc: string;
  price: number; // دينار عراقي
  size: string;
  stock: number;
  image: string;
  badge?: string;
  featured?: boolean;
};

export type CartItem = { id: string; qty: number };

export type OrderStatus = "جديد" | "قيد التجهيز" | "قيد التوصيل" | "تم التسليم" | "ملغي";
export const ORDER_STATUSES: OrderStatus[] = ["جديد", "قيد التجهيز", "قيد التوصيل", "تم التسليم", "ملغي"];

export type Order = {
  id: string;
  no: number;
  items: { id: string; name: string; size: string; price: number; qty: number }[];
  total: number;
  customer: { name: string; phone: string; gov: string; address: string; notes?: string };
  status: OrderStatus;
  date: string; // ISO
  recorded?: boolean; // سُجّل في المحاسبة
};

export type LedgerEntry = {
  id: string;
  type: "in" | "out";
  label: string;
  amount: number;
  date: string; // ISO
};

export const GOVERNORATES = [
  "ديالى", "بغداد", "الأنبار", "بابل", "البصرة", "دهوك", "أربيل", "السليمانية",
  "ذي قار", "القادسية", "كربلاء", "كركوك", "ميسان", "المثنى", "النجف", "نينوى",
  "صلاح الدين", "واسط",
];

export const CATEGORIES: Category[] = [
  { id: "dairy", name: "ألبان وأجبان", icon: "cheese" },
  { id: "mouneh", name: "مكدوس ومونة", icon: "jar" },
  { id: "zaatar", name: "زعتر وبهارات", icon: "leaf" },
  { id: "dibs", name: "دبس وخل", icon: "drop" },
  { id: "jam", name: "مربيات بيتية", icon: "cherry" },
  { id: "oil", name: "زيوت أصيلة", icon: "olive" },
];

const IMG = {
  labneh: "https://image.qwenlm.ai/generated-images/7bd6233b-6933-43bd-b3d1-85b1fac6235f/_result.png",
  cheese: "https://image.qwenlm.ai/generated-images/a0aab9de-36f3-40a3-acc3-7dbb08f3b011/_result.png",
  makdous: "https://image.qwenlm.ai/generated-images/cdec1318-8a41-4455-9b8a-774f6aa41ddf/_result.png",
  pepper: "https://image.qwenlm.ai/generated-images/446f89d9-dcf6-4b96-8b42-920c00782649/_result.png",
  zaatar: "https://image.qwenlm.ai/generated-images/33af2858-c67c-4ad1-8999-99290c83c3f2/_result.png",
  pom: "https://image.qwenlm.ai/generated-images/35af0e4c-2bc0-468b-b0e9-25de3ea0c2f9/_result.png",
  vinegar: "https://image.qwenlm.ai/generated-images/a592baf3-c412-4640-ae04-9c9ad63b96bd/_result.png",
  jam: "https://image.qwenlm.ai/generated-images/207b5648-4b86-44f1-96bf-927a4278282a/_result.png",
  oil: "https://image.qwenlm.ai/generated-images/3d8e253d-1c7b-40ff-8780-85eb8f39f035/_result.png",
};

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/b44c835a-280b-4970-b50c-13d1910a86d1/_result.png";
export const JAM_IMAGE = IMG.jam;

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p-labneh", name: "لبنة بلدية بحبّة البركة", category: "dairy",
    desc: "لبنة سورية مصفاية على الطريقة البلدية، بزيت الزيتون وحبّة البركة (الحبّة السودا) والزعتر والبهارات الحلبية.",
    price: 7000, size: "مرطبان ١ كغم", stock: 40, image: IMG.labneh, badge: "صناعة يدنا", featured: true,
  },
  {
    id: "p-cheese", name: "جبنة بلدية سورية", category: "dairy",
    desc: "جبنة بلدية معتّقة بماء الملح، مرشوشة بحبّة البركة، تنفع للفطور والعشا ومع زيت الزيتون العفريني.",
    price: 9000, size: "مرطبان ١ كغم", stock: 25, image: IMG.cheese,
  },
  {
    id: "p-makdous", name: "مكدوس سوري على أصوله", category: "mouneh",
    desc: "باذنجان مكدوس بالحشوة الأصلية: جوز ودبس فليفلة وزيت زيتون، معتّق ومتشرب على مهله.",
    price: 14000, size: "مرطبان ١ كغم", stock: 30, image: IMG.makdous, badge: "على أصوله", featured: true,
  },
  {
    id: "p-pepper", name: "دبس فليفلة حلبي معجون", category: "mouneh",
    desc: "معجون فليفلة حمرا حلبي، معجونة ومشمّسة، لكل طبخة ولكل سحارة مونة.",
    price: 6500, size: "مرطبان ٥٠٠ غ", stock: 35, image: IMG.pepper,
  },
  {
    id: "p-zaatar", name: "زعتر حلبي أصلي", category: "zaatar",
    desc: "الزعتر الحلبي الأصلي بخلطته السرية: صعتر بري، سمسم محمّص، وسماق — ريحته بتفتح النفس.",
    price: 5000, size: "كيس ٥٠٠ غ", stock: 50, image: IMG.zaatar, badge: "الأكثر طلباً", featured: true,
  },
  {
    id: "p-pom", name: "دبس الرمان الطبيعي", category: "dibs",
    desc: "دبس رمان طبيعي ١٠٠٪ بلا سكر مضاف ولا ملوّنات، عصير رمان معتّق بس.",
    price: 7500, size: "قنينة ٧٥٠ مل", stock: 28, image: IMG.pom,
  },
  {
    id: "p-vinegar", name: "خل التفاح العضوي المكفول", category: "dibs",
    desc: "خل تفاح عضوي معتّق، معتّم ومكفول — للطبخ وللصحة، ومضمون على التجريب.",
    price: 6000, size: "قنينة ١ لتر", stock: 22, image: IMG.vinegar,
  },
  {
    id: "p-jam-cherry", name: "مربى الكرز", category: "jam",
    desc: "كرز حموي معتّق بالسكر على نار هادية، حبات طايبة وشراب غليظ.",
    price: 5500, size: "مرطبان ٥٠٠ غ", stock: 18, image: IMG.jam, badge: "بيتي",
  },
  {
    id: "p-jam-apricot", name: "مربى المشمش", category: "jam",
    desc: "مشمش مشمشي ذهبي، مربى بيتية من فواكه الموسم، طعم childhood بكل ملعقة.",
    price: 5500, size: "مرطبان ٥٠٠ غ", stock: 14, image: IMG.jam,
  },
  {
    id: "p-jam-fig", name: "مربى التين", category: "jam",
    desc: "تين ناضج معقود مع شوية حَبّة البركة والسمسم، مربى فاخرة على الطريقة الشامية.",
    price: 6000, size: "مرطبان ٥٠٠ غ", stock: 12, image: IMG.jam,
  },
  {
    id: "p-jam-quince", name: "مربى السفرجل", category: "jam",
    desc: "سفرجل معتّق لونه عنبري وريحته عطر، من أصناف المربى اللي انقرضت من الأسواق.",
    price: 6000, size: "مرطبان ٥٠٠ غ", stock: 10, image: IMG.jam,
  },
  {
    id: "p-oil", name: "زيت الزيتون العفريني الأصلي", category: "oil",
    desc: "أفضل صنف لدينا: زيت عفرين معصور على البارد، بكورة الموسم، مكفول وعلى التجريب.",
    price: 15000, size: "قنينة ١ لتر", stock: 45, image: IMG.oil, badge: "الأفضل لدينا", featured: true,
  },
];

export const SEED_ORDERS: Order[] = [
  {
    id: "o-seed-3", no: 103,
    items: [
      { id: "p-oil", name: "زيت الزيتون العفريني الأصلي", size: "قنينة ١ لتر", price: 15000, qty: 2 },
      { id: "p-zaatar", name: "زعتر حلبي أصلي", size: "كيس ٥٠٠ غ", price: 5000, qty: 1 },
    ],
    total: 35000,
    customer: { name: "أم يوسف", phone: "07701234567", gov: "بغداد", address: "المنصور، شارع ١٤ رمضان" },
    status: "قيد التوصيل", date: new Date(Date.now() - 86400000 * 0.4).toISOString(), recorded: false,
  },
  {
    id: "o-seed-2", no: 102,
    items: [{ id: "p-makdous", name: "مكدوس سوري على أصوله", size: "مرطبان ١ كغم", price: 14000, qty: 2 }],
    total: 28000,
    customer: { name: "أبو كريم", phone: "07811112222", gov: "ديالى", address: "بعقوبة، حي المعلمين" },
    status: "تم التسليم", date: new Date(Date.now() - 86400000 * 1.6).toISOString(), recorded: true,
  },
  {
    id: "o-seed-1", no: 101,
    items: [
      { id: "p-labneh", name: "لبنة بلدية بحبّة البركة", size: "مرطبان ١ كغم", price: 7000, qty: 1 },
      { id: "p-pom", name: "دبس الرمان الطبيعي", size: "قنينة ٧٥٠ مل", price: 7500, qty: 1 },
    ],
    total: 14500,
    customer: { name: "سارة العاني", phone: "07901234567", gov: "الأنبار", address: "الرمادي، شارع ٢٠" },
    status: "جديد", date: new Date(Date.now() - 3600000 * 5).toISOString(), recorded: false,
  },
];

export const SEED_LEDGER: LedgerEntry[] = [
  { id: "l-1", type: "in", label: "مبيعات الأسبوع — توصيل مباشر", amount: 285000, date: new Date(Date.now() - 86400000 * 6).toISOString() },
  { id: "l-2", type: "out", label: "شراء زيتون عفريني خام (بكورة)", amount: 120000, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "l-3", type: "out", label: "مرطبانات وتغليف وملصقات", amount: 35000, date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: "l-4", type: "in", label: "طلبية جملة — بغداد / الكرادة", amount: 160000, date: new Date(Date.now() - 86400000 * 2.5).toISOString() },
  { id: "l-5", type: "out", label: "أجور توصيل ديالى وبغداد", amount: 20000, date: new Date(Date.now() - 86400000 * 1.2).toISOString() },
  { id: "l-6", type: "in", label: "طلب #١٠٢ — أبو كريم (تم التسليم)", amount: 28000, date: new Date(Date.now() - 86400000 * 1.5).toISOString() },
];

/* ============ أدوات التنسيق ============ */

/** أرقام عربية مشرقية */
export const arNum = (n: number) => n.toLocaleString("ar-EG");
export const money = (n: number) => `${arNum(n)} د.ع`;
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ar-IQ", { day: "numeric", month: "short" });
export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleDateString("ar-IQ", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

/* ============ رسالة الواتساب ============ */

export function buildWhatsAppMessage(order: Pick<Order, "items" | "total" | "customer">): string {
  const lines: string[] = [];
  lines.push("🧺 *طلب جديد — البيت السوري*");
  lines.push("━━━━━━━━━━━━━━");
  order.items.forEach((it, i) => {
    lines.push(`${i + 1}) ${it.name}`);
    lines.push(`   ${it.size} × ${arNum(it.qty)} = ${money(it.price * it.qty)}`);
  });
  lines.push("━━━━━━━━━━━━━━");
  lines.push(`💰 *المجموع: ${money(order.total)}*`);
  lines.push("🚚 التوصيل خلال ٢٤ ساعة (الأجرة تُتّفق حسب المحافظة)");
  lines.push("");
  lines.push(`👤 الاسم: ${order.customer.name}`);
  lines.push(`📱 الهاتف: ${order.customer.phone}`);
  lines.push(`📍 المحافظة: ${order.customer.gov}`);
  lines.push(`🏠 العنوان: ${order.customer.address}`);
  if (order.customer.notes) lines.push(`📝 ملاحظات: ${order.customer.notes}`);
  lines.push("");
  lines.push("أُرسل هذا الطلب تلقائياً من موقع البيت السوري 🌿");
  return lines.join("\n");
}

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
