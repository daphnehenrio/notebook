// ? Import NPM
import React from 'react';
import PropTypes from 'prop-types';

// | Material Components
import {
  Divider,
  IconButton,
} from '@mui/material';

// | Material Icons
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// | Material Styles
import { useTheme } from '@mui/material/styles';

// ? Import Local
// | Data
import data from '../data';

// | Component
import FoldersList from './FoldersList';

// | Stlyed Components
import { Drawer as StyledDrawer, DrawerHeader } from '../../StyledComponents';

const Drawer = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const { folders } = data.notebook;

  const rootFolders = folders.filter((folder) => folder.root === true);

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <FoldersList foldersList={rootFolders} />
    </StyledDrawer>
  );
};

export default Drawer;

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};
