// ? Import NPM
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// | Material Components
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from '@mui/material';

// | Material Icons
import {
  AccountCircle,
} from '@mui/icons-material';

const UserAccount = ({ auth, setAuth }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="account">
      {auth && (
      <>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </>
      )}
      <FormGroup>
        <FormControlLabel
          control={(
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
                )}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
    </div>

  );
};

export default UserAccount;

UserAccount.propTypes = {
  auth: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired,
};
