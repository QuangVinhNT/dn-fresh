import { ClientFooter, ClientHeader, Overlay } from "@/components";
import { overlayStore } from "@/store";
import { cartStore } from "@/store/cartStore";
import { Outlet, ScrollRestoration } from "react-router-dom";
import CartDrawer from "./CartDrawer/CartDrawer";
import { useEffect } from "react";

const Client = () => {

  const { isShowOverlay } = overlayStore();
  const { isShowCart } = cartStore();
  useEffect(() => {
    if (isShowCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isShowCart]);
  return (
    <div className="client-component"
    >
      {isShowOverlay && <Overlay />}
      <CartDrawer />
      <ClientHeader />
      <div className="client-outlet" style={{ margin: '0 auto 80px' }}>
        <Outlet />
      </div>
      <ClientFooter />
      <ScrollRestoration />
    </div>
  );
};

export default Client;
