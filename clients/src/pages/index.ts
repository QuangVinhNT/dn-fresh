import Admin from "./admin/Admin";
import Customer from "./admin/Customer/Customer";
import ExportFood from "./admin/ExportFood/ExportFood";
import FoodCategory from "./admin/FoodCategory/FoodCategory";
import FoodList from "./admin/FoodList/FoodList";
import ImportFood from "./admin/ImportFood/ImportFood";
import Order from "./admin/Order/Order";
import Overview from "./admin/Overview/Overview";
import Staff from "./admin/Staff/Staff";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Client from "./client/Client";
import ClientOrders from "./client/ClientOrders/ClientOrders";
import Contact from "./client/Contact/Contact";
import Foods from "./client/Foods/Foods";
import Home from "./client/Home/Home";
import Introduce from "./client/Introduce/Introduce";

export {
  // Admin
  Admin, Overview, Order, FoodList, FoodCategory, ImportFood, ExportFood, Customer, Staff,
  
  // Client
  Client, Home, Introduce, Foods, Contact, ClientOrders,

  // Auth
  Login, Register,
};
