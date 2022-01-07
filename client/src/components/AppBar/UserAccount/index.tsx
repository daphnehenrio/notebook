// ? Import NPM
import * as React from 'react';

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

// ? PropTypes
type Props = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

// ? Component Definition
const UserAccount = ({ auth, setAuth }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event: any) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: any) => {
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

// ? Export
export default UserAccount;
