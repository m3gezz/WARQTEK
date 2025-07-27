import React from "react";
import { Outlet } from "react-router-dom";
import { useMainContext } from "../contexts/MainContext";
import { Navigate } from "react-router-dom";
import UserHeader from "../slices/UserHeader";
import Footer from "../slices/Footer";
import UserSidebar from "../slices/UserSidebar";

export default function UserLayout() {
  const { token, user } = useMainContext();

  if (!token) return <Navigate to={"/guest/login"} />;
  if (token && user.role == "admin") return <Navigate to={"/admin"} />;

  return (
    <>
      <UserHeader />
      <UserSidebar />
      <main className="min-h-[80vh] pt-22">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
