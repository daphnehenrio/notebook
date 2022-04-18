// ? Import NPM
import { Calculate } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// ? Import Local
// | Constants
import constants from '../../../constants';

const { drawerWidth } = constants.MenuAppBar;

// ? Export
export default styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: "#2F3742",
  minHeight: "calc(100vh - 64px)",
  overflow: 'hidden',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: '64px',
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
