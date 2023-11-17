import React, { useState } from 'react';
import LabledInput from '../common/LabledInput';
import HeightBox from '../common/HeightBox';
import { StyledButton } from './styles';
import { FlexDiv } from './styles';
import RightMarginBox from '../common/RightMarginBox';
import './styles';
import { StyledDiv } from './styles';
import { addTodo } from '../../../api/todos';
import { useMutation, useQueryClient } from 'react-query';

function Input() {
  const queryClient = useQueryClient();

  const mutationAddToDo = useMutation(addTodo, {
    onSuccess: data => {
      console.log('data', data);
      queryClient.invalidateQueries('todos');
    },
  });

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleContentsChange = event => {
    setContents(event.target.value);
  };

  const handleSubmitButtonClick = async event => {
    event.preventDefault();

    if (!title || !contents) {
      return alert(
        `Both the title and content must be entered.\nInput value (title: '${title}', contents:'${contents}')`,
      );
    }

    const newTodo = {
      title,
      contents,
      isDone: false,
    };

    mutationAddToDo.mutate(newTodo);

    setTitle('');
    setContents('');
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
