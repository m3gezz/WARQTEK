import React, { useContext, useState } from "react";
import { createContext } from "react";

const Context = createContext({
  token: null,
  user: null,
  sidebar: false,
  handleToken: () => {},
  handleUser: () => {},
  handleSidebar: () => {},
});

export default function MainContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const parsedUser = localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER"))
    : {};
  const [user, setUser] = useState(parsedUser);
  const [sidebar, setSidebar] = useState(false);

  const handleToken = (token) => {
    setToken(token);

    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
  };
  const handleUser = (user) => {
    setUser(user);

    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  };

  const handleSidebar = (sidebar) => {
    setSidebar(sidebar);
  };

  return (
    <Context.Provider
      value={{
        token,
        user,
        sidebar,
        handleToken,
        handleUser,
        handleSidebar,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useMainContext = () => useContext(Context);
