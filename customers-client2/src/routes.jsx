import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { RecoverPassword } from "./pages/auth/RecoverPassword";
import { Dashboard } from "./pages/Dashboard";
import { CustomerList } from "./pages/customers/CustomerList";
import { CustomerForm } from "./pages/customers/CustomerForm";
import { MainLayout } from "./layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/recover",
    element: <RecoverPassword />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <CustomerList />,
      },
      {
        path: "customers/new",
        element: <CustomerForm />,
      },
      {
        path: "customers/:id/edit",
        element: <CustomerForm />,
      },
    ],
  },
]); 