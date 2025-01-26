import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { CustomerList } from "./pages/customers/CustomerList";
import { CustomerForm } from "./pages/customers/CustomerForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
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