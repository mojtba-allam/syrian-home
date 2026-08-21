import React, { useEffect } from "react";
import { ShopProvider } from "./store";
import { useRoute } from "./hooks";
import { Header, Footer, Toasts, FloatingWA } from "./ui";
import HomePage from "./home";
import CartDrawer from "./cart";
import AdminPage from "./admin";
import DocsPage from "./docs";

function Shell() {
  const [route, nav] = useRoute();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col relative grain">
      <Header route={route} nav={nav} />
      <div className="grow">
        {route === "home" && <HomePage />}
        {route === "docs" && <DocsPage />}
        {route === "admin" && <AdminPage />}
      </div>
      <Footer nav={nav} />
      {route === "home" && (
        <>
          <CartDrawer />
          <FloatingWA />
        </>
      )}
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
