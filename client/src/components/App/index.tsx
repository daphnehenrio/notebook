// ? Import NPM
import * as React from 'react';
// | Material Components
import {
  Box,
  CssBaseline,
} from '@mui/material';

// ? Import Local
// | Components
import AppBar from '../AppBar';
import Menu from '../Menu';
import Editor from '../Editor';

// | Stlyed Components
import { Main } from '../StyledComponents';

// ? Component Definition
const App = () => {
  // ? State
  const [open, setOpen] = React.useState(false);

  // ? Handlers
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // ? Return
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Menu open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <Editor />
      </Main>
    </Box>
  )
} 
  
// ? Export
export default App;
