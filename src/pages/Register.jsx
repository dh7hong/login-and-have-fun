import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { logout, setToken, setUserId } from "../redux/modules/userSlice";
import { registerUser, loginUser, authUser } from "../api/authService";
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

function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();

  const { mutate: register } = useMutation(registerUser);

  const handleRegister = (event) => {
    event.preventDefault();
    register({ id, password });
    alert(`Thanks for signing up! ${id}`);
    setId("");
    setPassword("");
    
  };

  const handleLoginPageButtonClick = () => {
    navigate(`/login`);
  };

  return (
    <Container>
      <BoxStyle>
          <div>
            <form onSubmit={handleRegister}>
              <h1>Sign Up</h1>
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
                  <ClickBoxStyle type="submit">Sign Up</ClickBoxStyle>
                  <ClickBoxStyle type="button" onClick={handleLoginPageButtonClick}>
                    Login
                  </ClickBoxStyle>
                </div>
              </ClickBox>
            </form>
          </div>
      </BoxStyle>
    </Container>
  );
}

export default Register;
