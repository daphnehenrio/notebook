// ? Import NPM
import * as React from 'react';

// | Material Components
import {
  Divider,
  IconButton,
  ButtonProps,
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
import data from './data';

// | Interfaces
import { FolderInterface } from '../../interfaces';

// | Function
import foldersList from './MakeList/foldersList';

// | Stlyed Components
import { Drawer as StyledDrawer, DrawerHeader } from '../StyledComponents';

// ? Types
type Props = {
  open: boolean;
  handleDrawerClose: ButtonProps['onClick'];
};

// ? Component Definition
const Drawer = ({ open, handleDrawerClose }: Props) => {
  // ? Theme
  const theme = useTheme();

  // ? Data
  const { folders } = data.notebook;
  const rootFolders = folders.filter((folder: FolderInterface) => folder.root === true);

  // ? Return
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
      {foldersList(rootFolders)}
    </StyledDrawer>
  );
};

// ? Export
export default Drawer;
