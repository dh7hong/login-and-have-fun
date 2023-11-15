import React, { useState } from "react";
import HeightBox from "../common/HeightBox";
import { useNavigate } from "react-router-dom";
import {
  StyledDiv,
  StyledTitle,
  StyledContents,
  TodoButton,
  FlexButtonBox,
  LinkedP,
  FlexTitleBox,
} from "./styles";
import { useMutation, useQueryClient } from "react-query";
import { removeTodo, switchTodo, editTodo } from "../../../api/todos";

function Todo({ todo, isActive }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const switchMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContents, setEditedContents] = useState(todo.contents);

  const editMutation = useMutation(editTodo, { 
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    const payload = {
      id: todo.id,
      title: editedTitle,
      contents: editedContents,
    };

    editMutation.mutate(payload);
    setIsEditing(false);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleContentsChange = (event) => {
    setEditedContents(event.target.value);
  };

  const navigate = useNavigate();

  const handleSwitchButton = () => {
    const payload = {
      id: todo.id,
      isDone: !todo.isDone,
    };
    console.log(todo.id, !todo.isDone);
    switchMutation.mutate(payload);
  };

  const handleRemoveButton = () => {
    deleteMutation.mutate(todo.id);
  };

  const handleDetailPageLinkClick = () => {
    navigate(`/${todo.id}`);
  };

  return (
    <StyledDiv>
      <FlexTitleBox>
        <StyledTitle>{todo.title}</StyledTitle>
        <LinkedP onClick={handleDetailPageLinkClick}>[Details]</LinkedP>
      </FlexTitleBox>
      <HeightBox height={10} />
      <StyledContents>{todo.contents}</StyledContents>
      <HeightBox height={20} />
      <FlexButtonBox>
        <TodoButton onClick={handleSwitchButton}>
          {isActive ? "Completed" : "Cancel"}
        </TodoButton>
        <TodoButton onClick={handleRemoveButton}>Remove</TodoButton>
      </FlexButtonBox>
      <HeightBox height={20} />
      
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder="Enter todos"
            value={editedTitle}
            onChange={handleTitleChange}
          />
          <textarea
            value={editedContents}
            onChange={handleContentsChange}
          />
          
          <TodoButton onClick={handleSaveButtonClick}>Save</TodoButton>
        </>
      ) : (
        <>
        <TodoButton onClick={handleEditButtonClick}>Edit</TodoButton>
        </>
      )}
      
    </StyledDiv>
  );
}

export default Todo;
