import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { Admin, Client, ClientFoodDetail, ClientOrderDetail, ClientOrders, ConfirmCode, Contact, Customer, DeliveryStaff, DSOrder, DSOverview, ExportFood, Favourites, FoodCategory, FoodList, FoodProvider, Foods, ForgotPassword, Home, ImportFood, Introduce, InventoryStaff, ISExport, ISImport, ISOverview, Login, Order, Overview, Payment, PersonalInfo, Register, Staff, UserRole } from "./pages";
import { Bounce, ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Client />,
    children: [
      {
        index: true,
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
        path: '/foods/:id',
        element: <ClientFoodDetail />
      },
      {
        path: '/orders',
        element: <ClientOrders />
      },
      {
        path: '/orders/:id',
        element: <ClientOrderDetail />
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
        index: true,
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
      {
        path: '/admin/food-provider',
        element: <FoodProvider />
      }
    ]
  },
  {
    path: '/inventory-staff',
    element: <InventoryStaff />,
    children: [
      {
        index: true,
        element: <ISOverview />
      },
      {
        path: '/inventory-staff/import-receipts',
        element: <ISImport />
      },
      {
        path: '/inventory-staff/export-receipts',
        element: <ISExport />
      }
    ]
  },
  {
    path: '/delivery-staff',
    element: <DeliveryStaff />,
    children: [
      {
        index: true,
        element: <DSOverview />
      },
      {
        path: '/delivery-staff/orders',
        element: <DSOrder />
      }
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
  },
  {
    path: '/personal-info',
    element: <PersonalInfo />
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
