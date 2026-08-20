import React, { useEffect } from "react";
import { ShopProvider } from "./store";
import { useRoute } from "./hooks";
import { Header, Footer, Toasts, FloatingWA } from "./ui";
import HomePage from "./home";
import AdminPage from "./admin";
import DocsPage from "./docs";
import CartDrawer from "./cart";

function Shell() {
  const [route, nav] = useRoute();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  const isAdmin = route === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      {!isAdmin && <Header route={route} nav={nav} />}
      <div className="grow">
        {route === "home" && <HomePage />}
        {route === "admin" && <AdminPage />}
        {route === "docs" && <DocsPage />}
      </div>
      {!isAdmin && <Footer nav={nav} />}
      {!isAdmin && <FloatingWA />}
      <CartDrawer />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}
