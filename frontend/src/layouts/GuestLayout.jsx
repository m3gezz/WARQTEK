import React from "react";
import GuestHeader from "../slices/GuestHeader";
import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../contexts/MainContext";
import Footer from "../slices/Footer";
import GuestSidebar from "../slices/GuestSidebar";

export default function GuestLayout() {
  const { token, user } = useMainContext();

  if (token && user.role == "admin") return <Navigate to={"/admin"} />;
  if (token && user.role != "admin") return <Navigate to={"/user"} />;

  return (
    <>
      <GuestHeader />
      <GuestSidebar />
      <main className="min-h-[80vh] pt-22">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
