import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/userSlice';
import { authUser } from '../../../api/authService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StyledHeader, StyledP, ClickBoxStyle } from './styles';

function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();

  const { mutate: auth } = useMutation(authUser);

  const handleAuth = event => {
    event.preventDefault();
    auth();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
    dispatch(logout());
    setIsLoggedIn(false);
    console.log(isLoggedIn)
    navigate('/login'); // Navigate to login page on logout
  };

  return (
    <StyledHeader>
      <StyledP>
        <ClickBoxStyle onClick={handleAuth}>Auth User</ClickBoxStyle>
      </StyledP>
      <StyledP>
        <ClickBoxStyle onClick={handleLogout}>Logout</ClickBoxStyle>
      </StyledP>
    </StyledHeader>
  );
}

export default Header;
