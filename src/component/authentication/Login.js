import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [psw, setPsw] = useState("");
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const isLoggedUser = useSelector((state) => state.loggedInUser);

  const login = () => {
    const payload = users.find(
      (user) => user.username === username && user.psw === psw
    );
    if (payload) {
      dispatch({
        type: "LOGIN",
        payload,
      });
    } else {
      alert("no credentials");
    }
  };

  return (
    !isLoggedUser && (
      <>
        <div className="form">
          <div className="title">Welcome</div>
          <div className="subtitle">Let's Login your account!</div>
          <div className="input-container ic1">
            <input
              className="input"
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="cut"></div>
            <label className="placeholder">
              Username
            </label>
          </div>
          <div className="input-container ic2">
            <input
              id="password"
              type="password"
              placeholder="password"
              className="input"
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
            />
            <div className="cut"></div>
            <label  className="placeholder">
              Password
            </label>
          </div>
          <button type="text" className="submit" onClick={login}>
            submit
          </button>
        </div>
      </>
    )
  );
};
export default Login;
