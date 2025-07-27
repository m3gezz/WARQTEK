import React, { useState } from "react";
import { useMainContext } from "../contexts/MainContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Client } from "../axios/axios";
import Spinner from "../components/custom/Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaChevronRight } from "react-icons/fa";

export default function GuestSidebar() {
  const { token, user, handleToken, handleUser, handleSidebar, sidebar } =
    useMainContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      await Client.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleToken(null);
      handleUser({});
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const initials =
    user.first_name && user.last_name
      ? user.first_name.charAt(0) + user.last_name.charAt(0)
      : "UK";

  return (
    <aside
      className={`w-74 h-[100vh] transform ${
        sidebar ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out 
        md:translate-x-100 md:hidden select-none bg-sidebar-accent border-l-4 border-warqtek text-foreground fixed right-0 top-0 z-50`}
    >
      <nav>
        <ul className=" flex flex-col py-10 px-2 gap-10">
          <div className="flex justify-between items-center px-1">
            <Button className={"w-fit"} onClick={() => handleSidebar(false)}>
              <FaChevronRight />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer h-10 w-10">
                  <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <DropdownMenuItem
                  disabled={true}
                  className="flex justify-center"
                >
                  <p>
                    <span>{user.last_name.toUpperCase()} </span>
                    <span>{user.first_name.toUpperCase()}</span>
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={loading}
                  onClick={handleLogout}
                  className="flex justify-center"
                >
                  {loading ? <Spinner /> : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <li>
            <Button
              className={"w-full h-15"}
              onClick={() => {
                navigate("/user");
                handleSidebar(false);
              }}
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              className={"w-full h-15"}
              onClick={() => {
                navigate("/user/documents/create");
                handleSidebar(false);
              }}
            >
              Create
            </Button>
          </li>
          <li>
            <Button
              className={"w-full h-15"}
              onClick={() => {
                navigate("/user/documents");
                handleSidebar(false);
              }}
            >
              Documents
            </Button>
          </li>
          <li>
            <Button
              className={"w-full h-15"}
              onClick={() => {
                navigate("/user/faq");
                handleSidebar(false);
              }}
            >
              Faq
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
