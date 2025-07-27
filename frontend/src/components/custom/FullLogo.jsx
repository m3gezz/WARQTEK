import React from "react";
import logo from "../../assets/logos/logo&name-black.png";

export default function FullLogo() {
  return (
    <div className="w-25 active:scale-95 transition-all hover:scale-105">
      <img src={logo} alt="warqtek logo" />
    </div>
  );
}
