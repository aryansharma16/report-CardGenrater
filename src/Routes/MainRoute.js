import React, { lazy } from "react";
import MainLayout from "../Layouts/MainLayout/index.js";

import Cookies from "js-cookie";
import { PrivateRoute } from "./PrivateRoute.js";
import FallbackLoader from "../Components/loaders/FallbackLoader/FallbackLoader";
import DynamicDashboard from "./DynamicDashboard.js";
import AllReportCards from "../Pages/AllReportCards/AllReportCards.jsx";
import MainEditorPage from "../Pages/CreateReport/MainEditorPage.jsx";
import { Outlet } from "react-router-dom";
import CreatedReportBatches from "../Pages/CreatedReportBatches/CreatedReportBatches.jsx";
import CreatedReportCardInfo from "../Pages/CreatedReportBatches/CreatedReportCardInfo.jsx";
// Access individual query parameters
const urlParams = new URLSearchParams(window.location.search);

const Dashboard = lazy(() => import("../Pages/Home/Home.jsx"));

const MainRoutes = [
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<FallbackLoader />}>
                <DynamicDashboard />
              </React.Suspense>
            ),
          },
          {
            path: "/all-cards",
            element: (
              <React.Suspense fallback={<FallbackLoader />}>
                <AllReportCards />
              </React.Suspense>
            ),
          },
          {
            path: "/created-report-batches",
            element: (
              <React.Suspense fallback={<FallbackLoader />}>
                <CreatedReportBatches />
              </React.Suspense>
            ),
          },
          {
            path: "/create-report-cards",
            element: (
              <React.Suspense fallback={<FallbackLoader />}>
                <MainEditorPage />
              </React.Suspense>
            ),
          },
          {
            path: "/batch-data",
            element: (
              <React.Suspense fallback={<FallbackLoader />}>
                <CreatedReportCardInfo />
              </React.Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export default MainRoutes;
