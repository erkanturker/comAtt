// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ComAttApi from "../api";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "../components/CommonJsx/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
          const currentUser = await ComAttApi.get(`users/${username}`);
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

      return { result: "success" };
    } catch (error) {
      console.error("login failed", error);
      return { result: false, error };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{ login, currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
