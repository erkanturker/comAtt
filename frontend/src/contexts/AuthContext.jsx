// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ComAttApi from "../api";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "../components/CommonJsx/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("authToken");

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          console.log(username);
          ComAttApi.token = token;
          const currentUser = await ComAttApi.getUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
        }
      }
      setInfoLoaded(true);
    }
    getCurrentUser();
  }, [token]);

  const login = async (loginData) => {
    try {
      const token = await ComAttApi.authToken(loginData);
      setToken(token);
      setIsLogin(true);
    } catch (error) {
      console.error("login failed", error);
      setIsLogin(false);
    }
  };

  const logout = () => setIsLogin(false);

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
