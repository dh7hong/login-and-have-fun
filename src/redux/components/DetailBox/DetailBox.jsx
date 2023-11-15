import React, { useEffect } from "react";
import { StyledDiv, StyledTable, StyledTh, StyledButton } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTodos } from "../../../api/todos";
import { useQuery } from "react-query";

function DetailBox() {

  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("todos", getTodos);

  const params = useParams();
  console.log(`params: ${JSON.stringify(params)}`);

  const obj = data.filter((item) => item.id === params.id);
  const filteredTodos = obj;


  useEffect(() => {
    if (filteredTodos.length <= 0 || filteredTodos.length > 1) {
      alert("This is an incorrect approach. Navigating to the main page.");
      navigate("/");
    }
  }, []);

  const todo = filteredTodos[0];

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <StyledDiv>
      <h3>TODO Main Page</h3>
      <StyledTable>
        <tr>
          <StyledTh>KEY</StyledTh>
          <StyledTh>VALUE</StyledTh>
        </tr>
        <tr>
          <StyledTh>ID</StyledTh>
          <StyledTh>{todo?.id}</StyledTh>
        </tr>
        <tr>
          <StyledTh>TITLE</StyledTh>
          <StyledTh>{todo?.title}</StyledTh>
        </tr>
        <tr>
          <StyledTh>CONTENTS</StyledTh>
          <StyledTh>{todo?.contents}</StyledTh>
        </tr>
        <tr>
          <StyledTh>Status</StyledTh>
          <StyledTh>{todo?.isDone ? "Finished" : "Unfinished"}</StyledTh>
        </tr>
      </StyledTable>
      <StyledButton onClick={handleButtonClick}>
        Go Back
      </StyledButton>
    </StyledDiv>
  );
}

export default DetailBox;
