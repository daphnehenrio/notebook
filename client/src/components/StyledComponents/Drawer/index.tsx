// ? Import NPM
// | Material Components
import {
  Drawer,
} from '@mui/material';

// | Material Styles
import { styled } from '@mui/material/styles';

// ? Import Local
// | Constants
import constants from '../../../constants';

const { drawerWidth } = constants.MenuAppBar;

// ? Export
export default styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
  '& .MuiDrawer-paperAnchorLeft > div:first-of-type': {
    backgroundColor: '#1976d2',

    '& button': {
      color: '#fff',
    },
  },
}));
