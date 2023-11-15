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
import Login from "./Login";
import styled from "styled-components";
import {
  Container,
  InputStyle,
  BoxStyle,
  ClickBoxStyle,
  ClickBox,
  IdPwBox,
} from "./styles";
import Input from "../redux/components/Input/Input";
import TodoList from "../redux/components/TodoList/TodoList";

function Home() {
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
    window.location.href = "/login";
  };

  return (
 
        <div>
          <h1>Home Page</h1>
          <Input />
          <TodoList isActive={true} />
          <TodoList isActive={false} />
        </div>
      
  );
}

export default Home;
