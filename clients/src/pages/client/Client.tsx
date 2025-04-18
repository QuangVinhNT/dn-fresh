import { ClientFooter, ClientHeader } from "@/components";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Client = () => {
  return (
    <div className="client-component">
      <ClientHeader />
      <div className="client-outlet" style={{margin: '0 auto 80px'}}>
        <Outlet />
      </div>
      <ClientFooter />
      <ScrollRestoration />
    </div>
  );
};

export default Client;
