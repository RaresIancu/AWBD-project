import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(email, password) {
    const user = {
      email: email,
      password: password,
      authHeader: "Basic " + btoa(email + ":" + password)
    };

    localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);
  }

  function logout() {
    localStorage.removeItem("authUser");
    setAuthUser(null);
  }

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}