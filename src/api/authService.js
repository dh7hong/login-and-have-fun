import axios from "axios";
import store from "../redux/config/configStore";
import { setToken, setUserId } from "../redux/modules/userSlice";

const catchErrors = (error) => {
  if (error.response) {
    console.log("Error response status:", error.response.status);
    console.log("Error response data:", error.response.data.message);
    alert(`Error response status: ${error.response.status}\n Error response data: ${error.response.data.message}`)
  } else if (error.request) {
    console.log("No response received:", error.request);
  } else {
    console.log("Error message:", error.message);
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, userData);
    console.log(response);
    return response;
  } catch (error) {
    catchErrors(error);
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, userData);

    const token = response.data.token;
    const userId = JSON.parse(response.config.data).id;

    localStorage.setItem(userId, token);

    store.dispatch(setToken(token));
    store.dispatch(setUserId(userId)); // Dispatch userId to Redux store

    return { token, userId };
  } catch (error) {
    catchErrors(error);
  }
};

const authUser = async () => {
  const authToken = store.getState().user.token;

  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      console.log(response.data.message);
      return response.data;
    }
  } catch (error) {
    catchErrors(error);
  }
};

export { registerUser, loginUser, authUser };
