import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout, setToken, setUserId } from "./redux/modules/userSlice";
import { registerUser, loginUser, authUser } from "./api/authService";
import axios from "axios";
import store from "./redux/config/configStore";
import { BrowserRouter as Router, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const userId = store.getState().user.userId; // Get userId from Redux store directly
    const token = localStorage.getItem(userId);
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      setIsLoggedIn(true);
    }
  }, []);

  

  const { mutate: register } = useMutation(registerUser);
  const { mutate: login } = useMutation(loginUser, {
    onSuccess: () => {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(id);

      console.log(`{"token": "${localStorage.getItem(id)}"}`);
    },
  });
  const { mutate: auth } = useMutation(authUser);

  const handleRegister = (event) => {
    event.preventDefault();
    register({ id, password });
    setId("");
    setPassword("");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({ id, password });
    setId("");
    setPassword("");
  };

  const handleAuth = (event) => {
    event.preventDefault();
    auth();
  };

  const handleLogout = () => {
    const userId = store.getState().user.userId; // Get userId from Redux store directly
    localStorage.removeItem(userId);
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logout());
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>

      <form onSubmit={handleLogin}>
        <button type="submit">Login</button>
      </form>

      <form onSubmit={handleAuth}>
        <button type="submit">Auth User</button>
      </form>

      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      {/* <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Navigate to="/home" /> : <Login />}
        </Route>
        <PrivateRoute
          path="/profile"
          component={UserProfile}
          isLoggedIn={isLoggedIn}
        />
        <Footer />
      </Router> */}
    </div>
  );
}

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Navigate to="/login"/>
      }
    />
  );
}

export default App;
