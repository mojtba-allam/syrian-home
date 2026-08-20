import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  CartItem, LedgerEntry, Order, OrderStatus, Product,
  SEED_LEDGER, SEED_ORDERS, SEED_PRODUCTS, uid,
} from "./data";

/* ---------- persistence helpers ---------- */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* تجاهل امتلاء التخزين */
  }
}

export type Toast = { id: string; text: string; tone: "ok" | "warn" };

type VisitorData = { total: number; daily: Record<string, number> };

type ShopState = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  ledger: LedgerEntry[];
  visitors: VisitorData;
  toasts: Toast[];

  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;

  addToCart: (id: string, qty?: number) => void;
  setCartQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;

  placeOrder: (customer: Order["customer"]) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;

  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;

  addLedger: (e: Omit<LedgerEntry, "id" | "date">) => void;
  deleteLedger: (id: string) => void;

  notify: (text: string, tone?: Toast["tone"]) => void;
};

const Ctx = createContext<ShopState | null>(null);

export const useShop = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShop خارج المزوّد");
  return v;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

/** بيانات زيارات افتراضية لآخر ٦ أيام كي لا يبدأ المخطط فارغاً */
function seedDaily(): Record<string, number> {
  const base = [14, 22, 18, 31, 26, 35];
  const out: Record<string, number> = {};
  for (let i = 6; i >= 1; i--) {
    const key = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    out[key] = base[6 - i];
  }
  return out;
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load("sh_products", SEED_PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>(() => load("sh_cart", [] as CartItem[]));
  const [orders, setOrders] = useState<Order[]>(() => load("sh_orders", SEED_ORDERS));
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => load("sh_ledger", SEED_LEDGER));
  const [visitors, setVisitors] = useState<VisitorData>(() => load("sh_visitors", { total: 1284, daily: seedDaily() }));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const countedRef = useRef(false);

  useEffect(() => save("sh_products", products), [products]);
  useEffect(() => save("sh_cart", cart), [cart]);
  useEffect(() => save("sh_orders", orders), [orders]);
  useEffect(() => save("sh_ledger", ledger), [ledger]);
  useEffect(() => save("sh_visitors", visitors), [visitors]);

  /* عدّاد الزوار: مرة واحدة لكل يوم/جلسة */
  useEffect(() => {
    if (countedRef.current) return;
    countedRef.current = true;
    const key = todayKey();
    const last = sessionStorage.getItem("sh_counted");
    if (last === key) return;
    sessionStorage.setItem("sh_counted", key);
    setVisitors((v) => ({
      total: v.total + 1,
      daily: { ...v.daily, [key]: (v.daily[key] ?? 0) + 1 },
    }));
  }, []);

  const notify = useCallback((text: string, tone: Toast["tone"] = "ok") => {
    const id = uid();
    setToasts((t) => [...t.slice(-2), { id, text, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  /* ---------- السلة ---------- */
  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setCart((c) => {
        const found = c.find((i) => i.id === id);
        if (found) return c.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i));
        return [...c, { id, qty }];
      });
    },
    []
  );

  const setCartQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i))
    );
  }, []);

  const removeFromCart = useCallback((id: string) => setCart((c) => c.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  /* ---------- الطلبات ---------- */
  const placeOrder = useCallback(
    (customer: Order["customer"]): Order => {
      const items = cart
        .map((ci) => {
          const p = products.find((p) => p.id === ci.id);
          return p ? { id: p.id, name: p.name, size: p.size, price: p.price, qty: ci.qty } : null;
        })
        .filter(Boolean) as Order["items"];
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      const no = 100 + orders.length + 1;
      const order: Order = {
        id: uid(), no, items, total, customer,
        status: "جديد", date: new Date().toISOString(), recorded: false,
      };
      setOrders((o) => [order, ...o]);
      /* خصم الكمية من المخزون */
      setProducts((ps) =>
        ps.map((p) => {
          const it = items.find((i) => i.id === p.id);
          return it ? { ...p, stock: Math.max(0, p.stock - it.qty) } : p;
        })
      );
      setCart([]);
      return order;
    },
    [cart, products, orders.length]
  );

  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      const o = orders.find((x) => x.id === id);
      if (!o || o.status === status) return;
      const record = status === "تم التسليم" && !o.recorded;
      setOrders((os) =>
        os.map((x) => (x.id === id ? { ...x, status, recorded: record ? true : x.recorded } : x))
      );
      /* قيد المحاسبة عند التسليم */
      if (record) {
        setLedger((l) => [
          {
            id: uid(), type: "in" as const,
            label: `طلب #${o.no} — ${o.customer.name} (تم التسليم)`,
            amount: o.total, date: new Date().toISOString(),
          },
          ...l,
        ]);
      }
    },
    [orders]
  );

  /* ---------- المنتجات ---------- */
  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((ps) => [{ ...p, id: uid() }, ...ps]);
  }, []);
  const updateProduct = useCallback((p: Product) => {
    setProducts((ps) => ps.map((x) => (x.id === p.id ? p : x)));
  }, []);
  const deleteProduct = useCallback((id: string) => {
    setProducts((ps) => ps.filter((p) => p.id !== id));
    setCart((c) => c.filter((i) => i.id !== id));
  }, []);

  /* ---------- المحاسبة ---------- */
  const addLedger = useCallback((e: Omit<LedgerEntry, "id" | "date">) => {
    setLedger((l) => [{ ...e, id: uid(), date: new Date().toISOString() }, ...l]);
  }, []);
  const deleteLedger = useCallback((id: string) => setLedger((l) => l.filter((e) => e.id !== id)), []);

  const value: ShopState = {
    products, cart, orders, ledger, visitors, toasts,
    cartOpen, setCartOpen,
    addToCart, setCartQty, removeFromCart, clearCart, cartCount,
    placeOrder, updateOrderStatus,
    addProduct, updateProduct, deleteProduct,
    addLedger, deleteLedger, notify,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
