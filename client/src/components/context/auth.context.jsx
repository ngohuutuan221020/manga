/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: {},
  isAuthenticated: false,
});

export function WrapperAuthContext(props) {
  const [auth, setAuth] = useState({
    user: {},
    isAuthenticated: false,
  });
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
