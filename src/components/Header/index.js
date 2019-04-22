/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React from 'react';
import { Container, Search, User } from './styles';

const Header = () => (
  <Container>
    <Search>
      <input placeholder="Search" />
    </Search>
    <User>
      <img src="https://i.ytimg.com/vi/Cl9I02dtHVM/hqdefault.jpg" alt="Avatar" />
      Jair Messias Bolsonaro
    </User>
  </Container>
);

export default Header;
