import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { Admin, Client, ClientOrders, Contact, Customer, ExportFood, FoodCategory, FoodList, Foods, Home, ImportFood, Introduce, Login, Order, Overview, Register, Staff } from "./pages";

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
        path: '/orders',
        element: <ClientOrders />
      },
      {
        path: '/contact',
        element: <Contact />
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
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
