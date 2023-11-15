import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { logout, setToken, setUserId } from "./redux/modules/userSlice";
import { registerUser, loginUser, authUser } from "./api/authService";
import axios from "axios";
import store from "./redux/config/configStore";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";

const Container = styled.div`
  background: linear-gradient(
    45deg,
    rgba(66, 183, 245, 0.8) 0%,
    rgba(66, 245, 189, 0.4) 100%
  ); /* 부모 컴포넌트의 배경 색상 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InputStyle = styled.input`
  width: 500px;
  height: 40px;
  margin-bottom: 20px;
  display: flex;
  background: rgba(black, 0.1);
`;

const BoxStyle = styled.div`
  border: 1px solid black;
  width: 800px;
  height: 600px;
  padding: 24px;
  position: relative; /* position 수정 */
  display: flex;
  justify-content: center;
  border-radius: 20px;
  background-color: white;
`;

const ClickBoxStyle = styled.button`
  outline: none;
  background: $accent;
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  color: $white;
  font-family: inherit;
  font-size: inherit;
  font-weight: $semibold;
  line-height: inherit;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 20px;
`;

const ClickBox = styled.div`
  margin-top: 100px;
`;

const IdPwBox = styled.div`
  margin-top: 80px;
`;

function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (token && userId) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(setToken(token));
      dispatch(setUserId(userId));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const handleLoginSuccess = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId); // Store userId in localStorage
    console.log("token", token);
    dispatch(setToken(token));
    dispatch(setUserId(userId));
    setIsLoggedIn(true);
    navigate("/home");
  };

  const { mutate: register } = useMutation(registerUser);
  const { mutate: login } = useMutation(loginUser, {
    onSuccess: (data) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      handleLoginSuccess(data.token);
    },
  });

  const { mutate: auth } = useMutation(authUser);

  const handleRegister = (event) => {
    event.preventDefault();
    register({ id, password });
    setId("");
    setPassword("");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({ id, password });
    setId("");
    setPassword("");
  };

  const handleAuth = (event) => {
    event.preventDefault();
    auth();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    navigate("/login"); // Navigate to login page on logout
  };

  return (
    <div>
      {/* {!isLoggedIn && (
        <>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Register</button>
          </form>

          <form onSubmit={handleLogin}>
            <button type="submit">Login</button>
          </form>
        </>
      )} */}
      
      <form onSubmit={handleAuth}>
        <button type="submit">Auth User</button>
      </form>

      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>


          <Routes>
            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={!isLoggedIn ? <Navigate to="/login" /> : <Home />}
            />
          </Routes>
    </div>
  );
}

export default App;
