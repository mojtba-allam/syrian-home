import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  CartItem, LedgerEntry, Order, OrderStatus, Product, SEED_PRODUCTS, VisitorData, uid,
} from "./data";

/* ---------- التخزين ---------- */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function save(key: string, val: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* تجاهل امتلاء التخزين */
  }
}

/* بيانات زيارات تاريخية حتى يظهر المخطط حياً من أول تحميل */
function seedDaily(): Record<string, number> {
  const out: Record<string, number> = {};
  const base = [34, 41, 28, 52, 47, 61, 44];
  for (let i = 6; i >= 1; i--) {
    const d = new Date(Date.now() - i * 86400000);
    out[d.toISOString().slice(0, 10)] = base[6 - i];
  }
  return out;
}

export type Toast = { id: string; text: string; tone: "ok" | "warn" };

type ShopCtx = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  ledger: LedgerEntry[];
  visitors: VisitorData;
  toasts: Toast[];
  cartOpen: boolean;
  cartCount: number;
  setCartOpen: (v: boolean) => void;
  addToCart: (id: string, qty?: number) => void;
  setCartQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  placeOrder: (customer: Order["customer"]) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addLedger: (e: Omit<LedgerEntry, "id" | "date">) => void;
  deleteLedger: (id: string) => void;
  notify: (text: string, tone?: "ok" | "warn") => void;
};

const Ctx = createContext<ShopCtx | null>(null);

export function useShop() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShop must be used within ShopProvider");
  return v;
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => load("sh_products", SEED_PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>(() => load("sh_cart", [] as CartItem[]));
  const [orders, setOrders] = useState<Order[]>(() => load("sh_orders", [] as Order[]));
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => load("sh_ledger", [] as LedgerEntry[]));
  const [visitors, setVisitors] = useState<VisitorData>(() => load("sh_visitors", { total: 1284, daily: seedDaily() }));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const orderNo = useRef(load("sh_orderno", 1041));

  /* حفظ تلقائي */
  useEffect(() => save("sh_products", products), [products]);
  useEffect(() => save("sh_cart", cart), [cart]);
  useEffect(() => save("sh_orders", orders), [orders]);
  useEffect(() => save("sh_ledger", ledger), [ledger]);
  useEffect(() => save("sh_visitors", visitors), [visitors]);
  useEffect(() => save("sh_orderno", orderNo.current), [orders]);

  /* عدّاد الزوار: مرة واحدة لكل جلسة */
  useEffect(() => {
    const k = "sh_visited_" + new Date().toISOString().slice(0, 10);
    if (sessionStorage.getItem(k)) return;
    sessionStorage.setItem(k, "1");
    const today = new Date().toISOString().slice(0, 10);
    setVisitors((v) => ({ total: v.total + 1, daily: { ...v.daily, [today]: (v.daily[today] ?? 0) + 1 } }));
  }, []);

  const notify = useCallback((text: string, tone: "ok" | "warn" = "ok") => {
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
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  /* ---------- الطلبات ---------- */
  const placeOrder = useCallback(
    (customer: Order["customer"]) => {
      const items = cart
        .map((ci) => {
          const p = products.find((x) => x.id === ci.id);
          return p ? { id: p.id, name: p.name, qty: ci.qty, price: p.price, size: p.size } : null;
        })
        .filter(Boolean) as Order["items"];
      const order: Order = {
        id: uid(),
        no: orderNo.current++,
        date: new Date().toISOString(),
        customer,
        items,
        total: items.reduce((s, i) => s + i.price * i.qty, 0),
        status: "جديد",
      };
      setOrders((o) => [order, ...o]);
      /* خصم الكمية من المخزون */
      setProducts((ps) =>
        ps.map((p) => {
          const ci = cart.find((c) => c.id === p.id);
          return ci ? { ...p, stock: Math.max(0, p.stock - ci.qty) } : p;
        })
      );
      return order;
    },
    [cart, products]
  );

  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      const target = orders.find((o) => o.id === id);
      if (!target || target.status === status) return;
      setOrders((os) => os.map((o) => (o.id === id ? { ...o, status, recorded: status === "تم التسليم" ? true : o.recorded } : o)));
      /* قيد تلقائي في المحاسبة عند التسليم */
      if (status === "تم التسليم" && !target.recorded) {
        setLedger((l) => [
          { id: uid(), date: new Date().toISOString(), label: `طلب #${target.no} — ${target.customer.name}`, amount: target.total, type: "in" },
          ...l,
        ]);
      }
    },
    [orders]
  );

  /* ---------- المنتجات (واجهة المدير) ---------- */
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

  const value: ShopCtx = {
    products, cart, orders, ledger, visitors, toasts,
    cartOpen, setCartOpen, cartCount,
    addToCart, setCartQty, removeFromCart, clearCart,
    placeOrder, updateOrderStatus,
    addProduct, updateProduct, deleteProduct,
    addLedger, deleteLedger, notify,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
