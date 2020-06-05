import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <AppBar>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}

/* @__PURE__*/ Object.assign(Wrapper, { displayName: 'Wrapper' });
