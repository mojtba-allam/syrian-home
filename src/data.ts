/* ============ الأنواع ============ */
export type Category = { id: string; name: string; icon: string };

export type Product = {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: number;
  size: string;
  stock: number;
  image: string;
  badge?: string;
};

export type CartItem = { id: string; qty: number };

export type CustomerInfo = { name: string; phone: string; gov: string; address: string; notes: string };

export type OrderStatus = "جديد" | "قيد التجهيز" | "قيد التوصيل" | "تم التسليم" | "ملغي";

export type Order = {
  id: string;
  no: number;
  date: string;
  customer: CustomerInfo;
  items: { id: string; name: string; qty: number; price: number; size: string }[];
  total: number;
  status: OrderStatus;
  recorded?: boolean;
};

export type LedgerEntry = { id: string; date: string; label: string; amount: number; type: "in" | "out" };

export type VisitorData = { total: number; daily: Record<string, number> };

export const ORDER_STATUSES: OrderStatus[] = ["جديد", "قيد التجهيز", "قيد التوصيل", "تم التسليم", "ملغي"];

/* ============ ثوابت ============ */
export const WHATSAPP_NUMBER = "9647887356906";
export const WHATSAPP_DISPLAY = "+964 788 735 6906";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const HERO_IMAGE = "https://image.qwenlm.ai/generated-images/707f4707-b88c-483a-a49a-d7b10b318c65/_result.png";
export const LABNEH_IMAGE = "https://image.qwenlm.ai/generated-images/6ce15598-57d7-4439-bd31-34a36f428a1d/_result.png";
export const MAKDOUS_IMAGE = "https://image.qwenlm.ai/generated-images/894564e0-0794-4c50-93d8-1f02f9a3e27a/_result.png";
export const ZAATAR_IMAGE = "https://image.qwenlm.ai/generated-images/a35815b7-d659-4f2c-823b-2f57768120c9/_result.png";
export const POMEGRANATE_IMAGE = "https://image.qwenlm.ai/generated-images/c6c049be-a9c8-464d-be15-0316ffdcf76a/_result.png";
export const JAM_IMAGE = "https://image.qwenlm.ai/generated-images/24a414e2-bce9-4c9d-be73-48b2adc52224/_result.png";
export const CHEESE_IMAGE = "https://image.qwenlm.ai/generated-images/9de91e4d-b6a9-431c-a8ee-df55733ea7e8/_result.png";
export const PEPPER_IMAGE = "https://image.qwenlm.ai/generated-images/6a6edc92-6547-4f78-8dd3-2d9eafc42f1e/_result.png";
export const OIL_IMAGE = "https://image.qwenlm.ai/generated-images/575192e5-91db-409d-961c-31f806f716c8/_result.png";

export const CATEGORIES: Category[] = [
  { id: "dairy", name: "ألبان وأجبان بلدية", icon: "cheese" },
  { id: "pickles", name: "مكدوس ومخللات", icon: "jar" },
  { id: "herbs", name: "زعتر وبهارات", icon: "leaf" },
  { id: "dibs", name: "دبس وخل", icon: "drop" },
  { id: "jams", name: "مربيات بيتية", icon: "cherry" },
  { id: "oil", name: "زيت الزيتون العفريني", icon: "olive" },
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p-labneh", name: "لبنة بلدية بحبّة البركة", category: "dairy",
    desc: "لبنة بلدية معتّقة، معجونة بالزعتر والبهارات الحلبية ومكلّلة بحبّة البركة وزيت الزيتون. فطور ما بعده فطور.",
    price: 6000, size: "مرطبان ١ كغم", stock: 40, image: LABNEH_IMAGE, badge: "الأكثر طلباً",
  },
  {
    id: "p-cheese", name: "جبنة بلدية بحبّة البركة", category: "dairy",
    desc: "جبنة بلدية سورية على الطريقة القديمة، محفوظة بمائها المملّح ومنكّهة بحبّة البركة. طعم يردّك لبيت جدتك.",
    price: 8000, size: "مرطبان ١ كغم", stock: 25, image: CHEESE_IMAGE,
  },
  {
    id: "p-makdous", name: "مكدوس سوري على أصوله", category: "pickles",
    desc: "باذنجان حبّ صغير محشو بالجوز ودبس الفليفلة، معرّق بزيت الزيتون ومعتّق على مهله. الوصفة الحلبية الأصلية بدون أي اختصار.",
    price: 10000, size: "مرطبان ١ كغم", stock: 30, image: MAKDOUS_IMAGE, badge: "على أصوله",
  },
  {
    id: "p-zaatar", name: "زعتر حلبي أصلي", category: "herbs",
    desc: "خلطة الزعتر الحلبي الأصلي: زعتر بري مجروش، سمسم محمّص، سماق بلدي وملح صخري. مع زيتنا العفريني تصير معجزة.",
    price: 5000, size: "كيس ٥٠٠ غم", stock: 60, image: ZAATAR_IMAGE,
  },
  {
    id: "p-pomegranate", name: "دبس رمان طبيعي", category: "dibs",
    desc: "رمان معتّق على النار الهادئة حتى يتكثّف — بدون سكر مضاف ولا ملوّنات. حموضة وحلاوة بتوازن يضبط السلطات والطبخ.",
    price: 7000, size: "قنينة ٧٥٠ مل", stock: 35, image: POMEGRANATE_IMAGE,
  },
  {
    id: "p-vinegar", name: "خل تفاح عضوي مكفول", category: "dibs",
    desc: "خل تفاح عضوي معتّق بالبيت، على طريقة أمهاتنا. معصور ومخمّر طبيعياً، ومكفول من عيلتنا لبيتك.",
    price: 6000, size: "قنينة ٧٥٠ مل", stock: 28, image: POMEGRANATE_IMAGE, badge: "عضوي مكفول",
  },
  {
    id: "p-jam-cherry", name: "مربى الكرز البلدي", category: "jams",
    desc: "كرز بلدي حَبّ كامل، مطبوخ بالسكر فقط على دفعات صغيرة. لون ياقوتي وطعم يفتح النفس.",
    price: 4500, size: "مرطبان ٥٠٠ غم", stock: 20, image: JAM_IMAGE,
  },
  {
    id: "p-jam-apricot", name: "مربى المشمش", category: "jams",
    desc: "مشمش مشمس على طبيعته، مربّى بلدي بقوام يذوب على اللسان. رفيق الكاهي والقيمر.",
    price: 4500, size: "مرطبان ٥٠٠ غم", stock: 22, image: JAM_IMAGE,
  },
  {
    id: "p-jam-fig", name: "مربى التين", category: "jams",
    desc: "تين ناضج معقود ببطء مع لمسة ليمون. حلاوة معتّقة تنفع مع الجبن والخبز المحمّص.",
    price: 4500, size: "مرطبان ٥٠٠ غم", stock: 18, image: JAM_IMAGE,
  },
  {
    id: "p-jam-quince", name: "مربى السفرجل", category: "jams",
    desc: "سفرجل معقود حتى يصير بلون العنبر، بنكهته العطرة اللي ما تنسى. مربّى الستات على الطريقة الشامية.",
    price: 4500, size: "مرطبان ٥٠٠ غم", stock: 15, image: JAM_IMAGE,
  },
  {
    id: "p-pepper", name: "دبس فليفلة معجون", category: "herbs",
    desc: "فليفلة حمراء مشمّسة ومطحونة على الحجر حتى تصير معجوناً حرّيفاً عطراً. سرّ الكبة والمحمرة والمقلوبة.",
    price: 5500, size: "مرطبان ٥٠٠ غم", stock: 26, image: PEPPER_IMAGE,
  },
  {
    id: "p-oil", name: "زيت الزيتون العفريني الأصلي", category: "oil",
    desc: "أفضل ما عندنا: زيت عفريني أصلي معصور على البارد من كروم عفرين. بكارة الموسم، معصور على البارد، ومكفول وعلى التجريب قبل ما تدفع.",
    price: 16000, size: "قنينة ١ لتر", stock: 50, image: OIL_IMAGE, badge: "الأفضل لدينا ★",
  },
];

export const GOVERNORATES = [
  "ديالى", "بغداد", "البصرة", "نينوى", "أربيل", "الأنبار", "بابل", "كربلاء", "النجف",
  "القادسية", "ذي قار", "ميسان", "واسط", "صلاح الدين", "كركوك", "دهوك", "السليمانية", "المثنى",
];

/* ============ أدوات مساعدة ============ */
export const arNum = (n: number | string) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

export const money = (n: number) => `${arNum(n.toLocaleString("en-US"))} د.ع`;

export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ar-IQ", { day: "2-digit", month: "2-digit", year: "numeric" });

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("ar-IQ", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

export function buildWhatsAppMessage(o: Order): string {
  const lines = [
    "🌿 *طلب جديد — البيت السوري*",
    `🧾 رقم الطلب: #${o.no}`,
    "",
    "🛒 *المشتريات:*",
    ...o.items.map((it, i) => `${i + 1}) ${it.name} — ${it.size} × ${it.qty} = ${money(it.price * it.qty)}`),
    "",
    `💰 *المجموع:* ${money(o.total)}`,
    "",
    "👤 *بيانات التوصيل:*",
    `• الاسم: ${o.customer.name}`,
    `• الهاتف: ${o.customer.phone}`,
    `• المحافظة: ${o.customer.gov}`,
    `• العنوان: ${o.customer.address}`,
    o.customer.notes ? `• ملاحظات: ${o.customer.notes}` : "",
    "",
    "🚚 التوصيل خلال ٢٤ ساعة — الدفع عند الاستلام",
  ].filter(Boolean);
  return lines.join("\n");
}
