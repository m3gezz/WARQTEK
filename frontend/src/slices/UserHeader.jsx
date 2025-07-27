import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Logo from "../components/custom/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMainContext } from "../contexts/MainContext";
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
import { FaBars } from "react-icons/fa";

export default function UserHeader() {
  const { token, user, handleToken, handleUser, handleSidebar } =
    useMainContext();
  const [loading, setLoading] = useState(false);

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
    <header className="h-22 border-b-6 select-none border-warqtek flex items-center px-6 bg-background fixed w-full z-50">
      <nav className="flex gap-3 justify-between items-center flex-1">
        <Link to={"/user"}>
          <Logo />
        </Link>
        <ul className="flex-1 px-10 gap-10 md:flex hidden justify-between max-w-150">
          <li>
            <Button variant="link">
              <Link to="/user">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link to="/user/documents/create">Create</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link to="/user/documents">Documents</Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link to="/user/faq">Faq</Link>
            </Button>
          </li>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer h-10 w-10">
                <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>User</DropdownMenuLabel>
              <DropdownMenuItem disabled={true} className="flex justify-center">
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
