import React, { useState } from "react";
import LabledInput from "../common/LabledInput";
import HeightBox from "../common/HeightBox";
import { StyledButton } from "./styles";
import { FlexDiv } from "./styles";
import RightMarginBox from "../common/RightMarginBox";
import "./styles";
import { StyledDiv } from "./styles";
import { addTodo } from "../../../api/todos";
import { useMutation, useQueryClient } from "react-query";

function Input() {
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries("todos");
    },
  });

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const getErrorMsg = (errorCode, params) => {
    switch (errorCode) {
      case "01":
        return alert(
          `[Failure to verify required input values]\n\nBoth the title and content must be entered. Please check the input value.\nInput value (title: '${params.title}', contents:'${params.contents}')`
        );
      case "02":
        return alert(
          `[Notice of Content Duplication]\n\nTODOs matching the title ('${params.title}') and contents ('${params.contents}') you entered are already registered in the TODO LIST.`
        );
      default:
        return `An internal system error has occurred.`;
    }
  };


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };


  const handleContentsChange = (event) => {
    setContents(event.target.value);
  };


  const handleSubmitButtonClick = async (event) => {
    event.preventDefault();

    if (!title || !contents) {
      return getErrorMsg("01", { title, contents });
    }

    const newTodo = {
      title,
      contents,
      isDone: false,
    };

    mutation.mutate(newTodo);

    setTitle("");
    setContents("");
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmitButtonClick}>
        <FlexDiv>
          <RightMarginBox margin={10}>
            <LabledInput
              id="title"
              label="My Tasks"
              placeholder="Please enter the title."
              value={title}
              onChange={handleTitleChange}
            />
            <HeightBox height={10} />
            <LabledInput
              id="contents"
              label="Contents"
              placeholder="Please enter your contents."
              value={contents}
              onChange={handleContentsChange}
            />
          </RightMarginBox>
          <StyledButton type="submit">Submit</StyledButton>
        </FlexDiv>
      </form>
    </StyledDiv>
  );
}

export default Input;
