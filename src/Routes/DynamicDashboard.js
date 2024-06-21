import React, { lazy } from "react";
import { renderDashboardBasedOnRole } from "../Layouts/MainLayout";
const  Home= lazy(() => import( "../Pages/Home/Home"));

function DynamicDashboard() {
  // Call the renderDashboardBasedOnRole function to get the dashboard component
  const dashboardComponent = renderDashboardBasedOnRole();

  return (
    <React.Fragment>
      {/* Render the dashboard component */}
  
      {dashboardComponent}
    </React.Fragment>
  );
}

export default DynamicDashboard;
