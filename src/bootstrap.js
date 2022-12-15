import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./component/admin/AdminEC2";
import Mytask from "./component//task/Mytask";
import ErrorPage from "./component//errors/ErrorPage";
import CustomNavbar from "./component//navbar/CustomNavbar";
import DashboardEC2 from "./component/dashboard/DashboardEC2";
import SetupEC2 from "./component/setup/SetupEC2";
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/mytask" element={<Mytask />} />
        <Route path="/setup" element={<SetupEC2 />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<DashboardEC2 />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
