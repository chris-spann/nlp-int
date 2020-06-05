import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <>
      <Navbar fixed="bottom" className="foot">
        <a
          href="https://lyft.enterprise.slack.com/user/@WJMFR38SX"
          target="_blank"
          rel="noopener noreferrer"
          className="footlink cspannlink"
        >
          Contact
        </a>
      </Navbar>
    </>
  );
};
export default Footer;
