import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Login from "../pages/Login";
import Register from "../pages/Home";
import Home from "../pages/Register";
import { Navigate } from "react-router-dom";

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

const Router = () => {
  return (

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

  );
};

export default Router;