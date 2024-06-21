import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import React, { lazy } from "react";
import { Outlet } from "react-router";
import Cookies from "js-cookie";
import NotificationMenu from "../Menu/NotificationMenu/NotificationMenu.jsx";
import AllReportCards from "../../Pages/AllReportCards/AllReportCards.jsx";

import Toast from "../../Components/Toast/Toast";
import {
  DashboardIcon,
  UserManagementIcon,
  TemplateManagementIcon,
  InterviewDashboardIcon,
  InterviewCallRecordIcon,
  SettingsIcon,
  EventIcon,
  TransactionIcon,
  RefundIcon,
  PasswordIcon,
  AdsIcon,
  ExpenseIcon,
  FeesIcon,
  InterviewIcon,
  InterviewCallIcon,
  InterviewSlotIcon,
  Miscellaneous,
} from "../../utils/IconConstant";
const Dashboard = lazy(() => import("../../Pages/Home/Home.jsx"));
export const renderDashboardBasedOnRole = () => {
  // Logic to determine the user's roles and return the appropriate dashboard component
  // ...

  const rolesCookie = Cookies.get("roles");
  const rolesArray = rolesCookie ? JSON.parse(rolesCookie) : [];
  // const rolesArray = JSON.parse(Cookies.get("roles"));
  const userRoles = rolesArray; // Example roles (array of roles)

  console.log("printing roles data", rolesArray);

  // Map roles to their corresponding dashboard components
  const roleDashboardMap = {
    //"admin": <Dashboard/>,
    "admin": <AllReportCards/>,
    // Counsellor: <Dashboard />,
    // "Cohort Manager": <Dashboard />,
    // "Finance Manager": <Dashboard />,
  };

  // Find the first matching role from the userRoles array
  // const matchingRole = userRoles.find((role) =>
  //   roleDashboardMap.hasOwnProperty(role)
  // );

  // Retrieve the dashboard component based on the matching role or default component
  const dashboardComponent =
    roleDashboardMap[userRoles] || roleDashboardMap.default;

  // Return the dashboard component
  return dashboardComponent;
};

export const renderMenuItemsBasedOnRole = () => {
  // Replace this with your logic to determine the user's role

  const rolesCookie = Cookies.get("roles");
  const rolesArray = rolesCookie ? JSON.parse(rolesCookie) : ['admin'];
  // const rolesArray = JSON.parse(Cookies.get("roles"));
  const userRole = rolesArray;
  console.log(userRole);
   // Example roles (array of roles)

  // Map roles to their corresponding menu items
  const roleMenuItemsMap = {
    admin: [
      {
        label: "All Report Cards",
        path: "/all-cards",
        icon: <DashboardIcon />,
      },
      { label: "Created Report Batches", path: "/created-report-batches", icon: <DashboardIcon /> },
      { label: "Create User", path: "/create-user", icon: <DashboardIcon /> },
      { label: "Draft", path: "/draft", icon: <DashboardIcon /> },
    ],
    user: [
     { label: "All Blogs", path: "/all-cards", icon: <DashboardIcon /> },
      {
        label: "All Report Cards",
        path: "/allreports",
        icon: <DashboardIcon />,
      },
      // { label: "My Blogs", path: "/your-blog", icon: <DashboardIcon /> },
      // {label:"Draft",path:"/draft",icon:<DashboardIcon/>}
      // { label: "Create Blog", path: "/create-blog", icon: <DashboardIcon /> },
    ],
    default: [{ label: "Home", path: "/all-cards", icon: <DashboardIcon /> }],
  };

  // Combine menu items for all roles
  // const mergedMenuItems = userRole.reduce((mergedItems, role) => {
    const roleMenuItems = roleMenuItemsMap[userRole] || roleMenuItemsMap.default;
    // return mergedItems.concat(roleMenuItems);
  // }, []);

  // Remove duplicates from merged menu items
  const uniqueMenuItems = roleMenuItems.filter(
    (menuItem, index, self) =>
      index === self.findIndex((m) => m.path === menuItem.path)
  );

  // console.log("printing menu items", uniqueMenuItems);

  return uniqueMenuItems;
};

const MainLayout = () => {
  useEffect(() => {
    renderMenuItemsBasedOnRole();
  }, []);

  const multiRoutes = [
    "/create-blog",
    "/your-blog",
    "/blog-details",
    "/draft",
    "/all-cards"

  ];

  const { pathname } = useLocation();
  const hasWiderWorkSpace = multiRoutes.includes(pathname);

  console.log("pathname", pathname);

  return (
    <>
      {/* <MainSideMenu menuItems={renderMenuItemsBasedOnRole()} /> */}
      <div className={`appContainer`}>
        {/* <Toast isSuccess={false} text={'The file flowbite-figma-pro was permanently deleted.'}/> */}
        <div className={`workSpace ${hasWiderWorkSpace && "widerWorkSpace"}`}>
          <NotificationMenu />

          {/* <HomeMenu /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
