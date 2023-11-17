import React from 'react';
import Header from './redux/components/Header/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import PrivateRoute from './shared/PrivateRoute';
import Detail from './pages/Detail';
import Footer from './redux/components/Footer/Footer';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // Check login status
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
