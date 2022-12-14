import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../../component/admin/AdminEC2";
import Mytask from "../../component/task/Mytask";
import ErrorPage from "../../component/errors/ErrorPage";
import Navbar from "../../component/navbar/Navbar";
import DashboardEC2 from "../dashboard/DashboardEC2";
import SetupEC2 from "../setup/SetupEC2";

function Navbacontainer() {

  return (
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<DashboardEC2 />} />
            <Route path="/mytask" element={<Mytask />} />
            <Route path="/setup" element={<SetupEC2 />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </Router>
  );
}

export default Navbacontainer;
