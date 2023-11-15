import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { logout, setToken, setUserId } from "../../modules/userSlice";
import { registerUser, loginUser, authUser } from "../../../api/authService";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { StyledHeader, StyledP, ClickBoxStyle } from "./styles";

function Header() {
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



  const { mutate: auth } = useMutation(authUser);

  const handleAuth = (event) => {
    event.preventDefault();
    auth();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login"); // Navigate to login page on logout
  };

  return (
    <StyledHeader>
      <StyledP>
        <ClickBoxStyle onClick={handleAuth}>Auth User</ClickBoxStyle>
      </StyledP>
      <StyledP>
        <ClickBoxStyle onClick={handleLogout}>Logout</ClickBoxStyle>
      </StyledP>
    </StyledHeader>
  );
}

export default Header;
