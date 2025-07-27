import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/all/Home";
import Login from "../pages/guest/Login";
import UserDocuments from "../pages/user/Documents";
import UserDocumentDetails from "../pages/user/DocumentDetails";
import UserCreateDocument from "../pages/user/CreateDocument";
import AdminDocuments from "../pages/admin/Documents";
import AdminDocumentDetails from "../pages/admin/DocumentDetails";
import AdminUsers from "../pages/admin/Users";
import AdminUserDetails from "../pages/admin/UserDetails";
import NotFound from "../pages/all/NotFound";
import Faq from "../pages/all/Faq";

const routes = [
  {
    path: "/",
    element: <Navigate to={"/guest"} />,
  },
  {
    path: "/guest",
    element: <GuestLayout />,
    children: [
      {
        path: "/guest",
        element: <Home />,
      },
      {
        path: "/guest/faq",
        element: <Faq />,
      },
      {
        path: "/guest/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user",
        element: <Home />,
      },
      {
        path: "/user/faq",
        element: <Faq />,
      },
      {
        path: "/user/documents",
        element: <UserDocuments />,
      },
      {
        path: "/user/documents/details/:idDocument",
        element: <UserDocumentDetails />,
      },
      {
        path: "/user/documents/create",
        element: <UserCreateDocument />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDocuments />,
      },
      {
        path: "/admin/documents/details/:idDocument",
        element: <AdminDocumentDetails />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/users/details/:idUser",
        element: <AdminUserDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
