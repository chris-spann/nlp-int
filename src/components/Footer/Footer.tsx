import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <>
      <Navbar fixed="bottom" className="foot">
        <Nav.Item>
          <a
            href="https://sites.google.com/lyft.com/outreachinnovation/home?authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            className="float-right footer"
          >
            Outreach Innovation
          </a>
        </Nav.Item>
      </Navbar>
    </>
  );
};
export default Footer;
