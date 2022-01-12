// ? Import NPM
import * as React from 'react';

// | Material Components
import {
  IconButton,
  ButtonProps,
  Toolbar,
} from '@mui/material';

// | Material Icons
import {
  Menu as MenuIcon,
} from '@mui/icons-material';

// ? Import Local
// | Components
import UserAccount from './UserAccount';

// | Stlyed Components
import { AppBar as StyledAppBar } from '../StyledComponents';

// | Styles
import './styles.scss';

// ? PropTypes
type Props = {
  open: boolean;
  handleDrawerOpen: ButtonProps['onClick'];
};

// ? Component Definition
const AppBar = ({ open, handleDrawerOpen }: Props) => {
  // ? State
  const [auth, setAuth] = React.useState(true);

  // ? Return
  return (
    <StyledAppBar position="fixed" open={open}>
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
    </StyledAppBar>
  );
};

// ? Export
export default AppBar;

