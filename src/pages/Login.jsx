import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { logout, setToken, setUserId } from "../redux/modules/userSlice";
import { registerUser, loginUser, authUser } from "../api/authService";
import axios from "axios";
import store from "../redux/config/configStore";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Container,
  InputStyle,
  BoxStyle,
  ClickBoxStyle,
  ClickBox,
  IdPwBox,
} from "./styles";

function Login() {
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

  const { mutate: login } = useMutation(loginUser, {
    onSuccess: (data) => {
      const { token, userId } = data; // Assuming `data` contains both `token` and `userId`
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      handleLoginSuccess(token, userId);
    },
  });

  const { mutate: auth } = useMutation(authUser);

  const handleLogin = (event) => {
    event.preventDefault();
    login({ id, password });
    navigate(`/home`);
  };

  const handleLoginSuccess = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId); // Store userId in localStorage
    console.log("token", token);
    dispatch(setToken(token));
    dispatch(setUserId(userId));
    setIsLoggedIn(true);
    navigate("/home");
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

  const handleRegisterPageLinkClick = () => {
    navigate(`/register`);
  };

  return (
    <Container>
      <BoxStyle>
        {!isLoggedIn && (
          <div>
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <IdPwBox>
                <p>ID</p>
                <InputStyle
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="ID"
                />
                <p>Password</p>
                <InputStyle
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </IdPwBox>
              <ClickBox>
                <div>
                  <ClickBoxStyle type="submit">Login</ClickBoxStyle>
                </div>
                <div>
                  <ClickBoxStyle onClick={handleRegisterPageLinkClick}>
                    Register
                  </ClickBoxStyle>
                </div>
              </ClickBox>
            </form>
          </div>
        )}
      </BoxStyle>
    </Container>
  );
}

export default Login;
