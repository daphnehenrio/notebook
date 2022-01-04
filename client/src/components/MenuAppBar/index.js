// ? Import NPM
import React, { useState } from 'react';
// | Material Components
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
} from '@mui/material';

// | Material Icons
import {
  Menu as MenuIcon,
} from '@mui/icons-material';

// ? Import Local
// | Components
import Drawer from './Drawer';
import UserAccount from './UserAccount';
// | Stlyed Components
import { Main, AppBar } from '../StyledComponents';

// | Styles
import './styles.scss';

const MenuAppBar = () => {
  const [auth, setAuth] = useState(true);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <UserAccount auth={auth} setAuth={setAuth} />
        </Toolbar>
      </AppBar>
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        Hello World
      </Main>
    </Box>
  );
};

export default MenuAppBar;
