import { createContext, useContext, useState, useEffect } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertType, setAlertType] = useState(() => {
    return sessionStorage.getItem("alertType") || "info";
  });

  useEffect(() => {
    sessionStorage.setItem("alertType", alertType);
  }, [alertType]);

  return (
    <AlertContext.Provider value={{ alertType, setAlertType }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};