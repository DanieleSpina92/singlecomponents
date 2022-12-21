import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/CustomNavbar";
import Home from "./component/dashboard/DashboardEC2";
import Protected from "./component/authentication/Protected";
import Login from "./component/authentication/Login";
import { useSelector } from "react-redux";
import MyTask from "./component/task/Mytask";
import Setup from "./component/setup/SetupEC2";
import Admin from "./component/admin/AdminEC2";

const App = () => {
  const isLoggedUser = useSelector((state) => state.loggedInUser);

  return (
    <>
      <Router>
        <Navbar isLoggedUser={isLoggedUser} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected isLoggedIn={isLoggedUser}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/mytask"
            element={
              <Protected isLoggedIn={isLoggedUser}>
                <MyTask />
              </Protected>
            }
          />
          <Route
            path="/setup"
            element={
              <Protected isLoggedIn={isLoggedUser}>
                <Setup />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <Protected isLoggedIn={isLoggedUser}>
                <Admin />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
