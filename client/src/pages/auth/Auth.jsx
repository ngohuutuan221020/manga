import React from "react";
import { Outlet } from "react-router-dom";
const Auth = () => {
  return (
    <div className="auth">
      <h1>Auth Page</h1>
      {/* Add routes for login, register */}
      <Outlet />
    </div>
  );
};

export default Auth;
