import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from './logo.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
    <>
      <Navbar className="navi">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-bottom"
          />{' '}
          <p className="d-inline-block align-bottom txt">JARVIS</p>
        </Navbar.Brand>
      </Navbar>
    </>
  );
};
export default Header;
