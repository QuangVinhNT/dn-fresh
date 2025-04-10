import { ClientFooter, ClientHeader } from "@/components";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div className="client-component">
      <ClientHeader />
      <div className="client-outlet" style={{margin: '0 auto 80px'}}>
        <Outlet />
      </div>
      <ClientFooter />
    </div>
  );
};

export default Client;
