import React from "react";
import logo from "../../assets/logos/logo.png";

export default function Logo() {
  return (
    <div className="w-12 active:scale-95 transition-all hover:scale-105">
      <img src={logo} alt="warqtek logo" />
    </div>
  );
}
