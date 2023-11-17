import React from 'react';
import Input from '../redux/components/Input/Input';
import TodoList from '../redux/components/TodoList/TodoList';

function Home() {

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
