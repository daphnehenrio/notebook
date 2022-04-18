// ? Import NPM
import * as  React from 'react';
import { useSelector } from 'react-redux';

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
// | Components
import ToolbarMenu from './ToolbarMenu';

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
  const ready = useSelector((state: any) => state.folders.foldersReady);

  // ? Data
  const folders = useSelector((state: any) => state.folders.allFolders);
  const documents = useSelector((state: any) => state.documents.allDocuments);

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
      <ToolbarMenu />
      {ready && foldersList(folders, documents, 0)}
    </StyledDrawer>
  );
};

// ? Export
export default Drawer;
