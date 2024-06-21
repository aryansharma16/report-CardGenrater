import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

export const PrivateRoute = () => {
    
  let token = Cookies.get("token");
  let role = Cookies.get("role");
  
  // token = true;
  return token ? <Outlet /> : <Navigate to="/login" />;
};
 