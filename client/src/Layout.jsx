import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/header/Header";
import React, { useEffect } from "react";
import { getProfile } from "./utils/api";
import { AuthContext } from "./components/context/auth.context";
import ScrollToTop from "react-scroll-to-top";
const Layout = () => {
  const { setAuth, auth } = React.useContext(AuthContext);
  useEffect(() => {
    async function getUser() {
      const auth = localStorage.getItem("isAuthenticated");

      if (auth === true) {
        return;
      }
      try {
        const res = await getProfile();
        if (res?.EC === 0) {
          setAuth({
            isAuthenticated: true,
            user: res?.DATA,
          });
        } else {
          console.error("Error ", res);
        }
      } catch (error) {
        console.error("Error ", error.response.data.EM);
      }
    }
    getUser();
  }, [setAuth]);
  return (
    <div>
      <HeaderComponent />
      <Outlet />
      <ScrollToTop
        smooth
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default Layout;
