import React from "react";
import styled from "styled-components";

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



function Home() {
  return (
    <Container>
      <BoxStyle>
        <div>
          <h1>로그인</h1>
          <IdPwBox>
            <p>아이디</p>
            <InputStyle type="text" />
            <p>비밀번호</p>
            <InputStyle type="password" />
          </IdPwBox>
          <ClickBox>
            <div>
              <ClickBoxStyle>로그인</ClickBoxStyle>
              <ClickBoxStyle>회원가입</ClickBoxStyle>
            </div>
          </ClickBox>
        </div>
      </BoxStyle>
    </Container>
  );
}

export default Home;