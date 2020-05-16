import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Footer.css';

function Footer(): JSX.Element {
  return (
    <>
      <Navbar fixed="bottom" className="navi">
        <Navbar.Brand href="/">
          {' '}
          <p className="d-inline-block align-bottom txt">Outreach Innovation</p>
        </Navbar.Brand>
      </Navbar>
    </>
  );
}
export default Footer;
