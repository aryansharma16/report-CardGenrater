import React, { lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoute";
import MainRoutes from "./MainRoute";
import MainSideMenu from "../Layouts/Menu/SideMenu/MainSideMenu";
import { renderMenuItemsBasedOnRole } from "../Layouts/MainLayout";


export default function ApplicationRoutes() {
  const routes = useRoutes([...MainRoutes, ...AuthRoutes]);
  const {pathname} = useLocation()
  const isAuthRoute = AuthRoutes.some((route) => route.path === pathname);

  useEffect(() => {
    renderMenuItemsBasedOnRole();
  }, []);
  return (
    <div className="App">
      {!isAuthRoute && <MainSideMenu menuItems={renderMenuItemsBasedOnRole()} />}
      {routes}
    </div>
  );
}





