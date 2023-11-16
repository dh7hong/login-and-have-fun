import axios from "axios";

const SERVER_URI = "https://ballistic-royal-cobbler.glitch.me/";

const getTodos = async () => {
  const response = await axios.get(`${SERVER_URI}/todos`);
  console.log(response.data);
  return response.data;
};

const addTodo = async (newTodo) => {
  await axios.post(`${SERVER_URI}/todos`, newTodo);
};

const removeTodo = async (id) => {
  await axios.delete(`${SERVER_URI}/todos/${id}`);
};

const switchTodo = async (payload) => {
  await axios.patch(`${SERVER_URI}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

const editTodo = async (payload) => {
  const { id, title, contents } = payload;
  await axios.patch(`${SERVER_URI}/todos/${id}`, {
    title,
    contents,
  });
};


export { getTodos, addTodo, removeTodo, switchTodo, editTodo };
