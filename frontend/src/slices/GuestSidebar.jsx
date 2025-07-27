import React from "react";
import { useMainContext } from "../contexts/MainContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FaChevronRight } from "react-icons/fa";

export default function GuestSidebar() {
  const { sidebar, handleSidebar } = useMainContext();
  const navigate = useNavigate();

  return (
    <aside
      className={`w-74 h-[100vh] transform ${
        sidebar ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out 
        md:translate-x-100 md:hidden bg-background select-none border-l-4 border-warqtek text-foreground fixed right-0 top-0 z-50`}
    >
      <nav>
        <ul className=" flex flex-col py-10 px-2 gap-10">
          <Button
            className={"w-fit mb-10"}
            onClick={() => handleSidebar(false)}
          >
            <FaChevronRight />
          </Button>
          <li>
            <Button
              className="w-full h-15"
              onClick={() => {
                navigate("/guest");
                handleSidebar(false);
              }}
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              className="w-full h-15"
              onClick={() => {
                navigate("/guest/faq");
                handleSidebar(false);
              }}
            >
              Faq
            </Button>
          </li>
          <li>
            <Button
              className="w-full h-15"
              onClick={() => {
                navigate("/guest/login");
                handleSidebar(false);
              }}
            >
              Log in
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
