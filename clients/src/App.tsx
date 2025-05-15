import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { Admin, Client, ClientFoodDetail, ClientOrders, ConfirmCode, Contact, Customer, ExportFood, Favourites, FoodCategory, FoodList, Foods, ForgotPassword, Home, ImportFood, Introduce, Login, Order, Overview, Payment, Register, Staff, UserRole } from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Client />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/introduce',
        element: <Introduce />
      },
      {
        path: '/foods',
        element: <Foods />
      },
      {
        path: '/foods/:slug',
        element: <ClientFoodDetail />
      },
      {
        path: '/orders',
        element: <ClientOrders />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/favourites',
        element: <Favourites />
      }
    ]
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin',
        element: <Overview />
      },
      {
        path: '/admin/order',
        element: <Order />
      },
      {
        path: '/admin/food-list',
        element: <FoodList />
      },
      {
        path: '/admin/food-category',
        element: <FoodCategory />
      },
      {
        path: '/admin/import-food',
        element: <ImportFood />
      },
      {
        path: '/admin/export-food',
        element: <ExportFood />
      },
      {
        path: '/admin/customer',
        element: <Customer />
      },
      {
        path: '/admin/staff',
        element: <Staff />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/confirm-code',
    element: <ConfirmCode />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/user-roles',
    element: <UserRole />
  },
  {
    path: '/payment',
    element: <Payment />
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
