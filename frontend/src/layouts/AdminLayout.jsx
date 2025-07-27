import React from "react";
import AdminHeader from "../slices/AdminHeader";
import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../contexts/MainContext";
import Footer from "../slices/Footer";
import AdminSidebar from "../slices/AdminSidebar";

export default function AdminLayout() {
  const { token, user } = useMainContext();

  if (token && user.role != "admin") return <Navigate to={"/user"} />;
  if (!token) return <Navigate to={"/guest/login"} />;

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="min-h-[80vh] pt-22">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
