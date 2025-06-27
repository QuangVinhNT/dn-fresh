import Admin from "./admin/Admin";
import Customer from "./admin/Customer/Customer";
import ExportFood from "./admin/ExportFood/ExportFood";
import FoodCategory from "./admin/FoodCategory/FoodCategory";
import FoodList from "./admin/FoodList/FoodList";
import FoodProvider from "./admin/FoodProvider/FoodProvider";
import ImportFood from "./admin/ImportFood/ImportFood";
import Order from "./admin/Order/Order";
import Overview from "./admin/Overview/Overview";
import Staff from "./admin/Staff/Staff";
import ConfirmCode from "./auth/ConfirmCode/ConfirmCode";
import ForgotPassword from "./auth/ForgotPassword/ForgotPassword";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import UserRole from "./auth/UserRole/UserRole";
import CartDrawer from "./client/CartDrawer/CartDrawer";
import Client from "./client/Client";
import ClientFoodDetail from "./client/ClientFoodDetail/ClientFoodDetail";
import ClientOrderDetail from "./client/ClientOrderDetail/ClientOrderDetail";
import ClientOrders from "./client/ClientOrders/ClientOrders";
import Contact from "./client/Contact/Contact";
import Favourites from "./client/Favourites/Favourites";
import Foods from "./client/Foods/Foods";
import Home from "./client/Home/Home";
import Introduce from "./client/Introduce/Introduce";
import Payment from "./client/Payment/Payment";
import DeliveryStaff from "./delivery-staff/DeliveryStaff";
import DSOrder from "./delivery-staff/DSOrder/DSOrder";
import DSOverview from "./delivery-staff/DSOverview/DSOverview";
import InventoryStaff from "./inventory-staff/InventoryStaff";
import ISExport from "./inventory-staff/ISExport/ISExport";
import ISImport from "./inventory-staff/ISImport/ISImport";
import ISOverview from "./inventory-staff/ISOverview/ISOverview";
import PersonalInfo from "./PersonalInfo";

export {
  // Admin
  Admin, Overview, Order, FoodList, FoodCategory, ImportFood, ExportFood, Customer, Staff, FoodProvider,

  // Inventory Staff
  InventoryStaff, ISImport, ISExport,ISOverview,

  // Delivery Staff
  DeliveryStaff, DSOverview, DSOrder,

  // Client
  Client, Home, Introduce, Foods, Contact, ClientOrders, ClientFoodDetail, Favourites, Payment, ClientOrderDetail,

  // Auth
  Login, Register, ConfirmCode, ForgotPassword, UserRole,

  // Other
  CartDrawer, PersonalInfo
};
