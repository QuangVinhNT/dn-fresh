import { ClientFooter, ClientHeader, LoadingComponent, Overlay } from "@/components";
import { loadingStore, overlayStore } from "@/store";
import { cartStore } from "@/store/cartStore";
import { Outlet, ScrollRestoration } from "react-router-dom";
import CartDrawer from "./CartDrawer/CartDrawer";
import { useEffect } from "react";

const Client = () => {
  const { isShowOverlay } = overlayStore();
  const { isShowCart } = cartStore();
  const {isShowLoading} = loadingStore();
  useEffect(() => {
    if (isShowCart || isShowOverlay || isShowLoading) {
      // Disable body scroll when cart or overlay is shown
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isShowCart, isShowOverlay, isShowLoading]);
  return (
    <>
      {isShowOverlay && <Overlay />}
      {isShowLoading && <LoadingComponent />}
      <div className="client-component">
        <CartDrawer />
        <ClientHeader />
        <div className="client-outlet" style={{ margin: '0 auto 80px' }}>
          <Outlet />
        </div>
        <ClientFooter />
        <ScrollRestoration />
      </div>
    </>
  );
};

export default Client;
