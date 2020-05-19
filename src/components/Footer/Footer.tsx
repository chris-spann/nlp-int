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
          >
            Outreach Innovation
          </a>
        </Nav.Item>
        <Nav.Item>
          Questions? Contact:{' '}
          <a
            href="https://lyft.enterprise.slack.com/user/@WJMFR38SX"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chris Spann
          </a>
        </Nav.Item>
      </Navbar>
    </>
  );
};
export default Footer;
