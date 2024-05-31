// src/components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component

const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
