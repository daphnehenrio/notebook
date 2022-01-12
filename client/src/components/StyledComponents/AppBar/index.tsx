// ? Import NPM
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';import { styled } from '@mui/material/styles';
// ? Import Local
// | Constants
import constants from '../../../constants';

const { drawerWidth } = constants.MenuAppBar;

// | Interfaces
interface AppBar extends AppBarProps {
  open: boolean;
}

// ? Export
export default styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBar>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));
