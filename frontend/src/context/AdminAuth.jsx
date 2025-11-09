import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const adminInfo = localStorage.getItem("adminInfo");

  const [user, setUser] = useState(
    adminInfo ? JSON.parse(adminInfo) : null
  );

  const login = (data) => {
    setUser(data);
    localStorage.setItem("adminInfo", JSON.stringify(data));
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

