import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Logo from "../components/custom/Logo";
import { useMainContext } from "../contexts/MainContext";
import { FaBars } from "react-icons/fa";

export default function GuestHeader() {
  const { handleSidebar } = useMainContext();
  return (
    <header className="h-22 border-b-6 select-none border-warqtek flex items-center px-6 bg-background fixed w-full z-50">
      <nav className="flex justify-between items-center flex-1">
        <Link to={"/guest"}>
          <Logo />
        </Link>
        <ul className="flex-1 px-10 gap-10 md:flex hidden justify-between max-w-150">
          <li>
            <Button variant={"link"}>
              <Link>Home</Link>
            </Button>
          </li>
          <li>
            <Button variant={"link"}>
              <Link to={"/guest/faq"}>Faq</Link>
            </Button>
          </li>
          <Button>
            <Link to={"/guest/login"}>Log in</Link>
          </Button>
        </ul>
        <Button
          className={`block md:hidden`}
          onClick={() => handleSidebar(true)}
        >
          <FaBars />
        </Button>
      </nav>
    </header>
  );
}
