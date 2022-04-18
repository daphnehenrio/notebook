// ? Import NPM
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { actionGetAllLabels } from '../../actions/labels';
import { actionGetAllDocuments } from '../../actions/documents';
import { actionGetAllFolders } from '../../actions/folders';
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
  const { useEffect, useState } = React;
  const dispatch = useDispatch();
  const foldersReady = useSelector((state: any) => state.folders.foldersReady);
  const documentsReady = useSelector((state: any) => state.documents.documentsReady);
  const currentDocument = useSelector((state: any) => state.documents.currentDocument);
  // ? use effect
  useEffect(() => {
    dispatch(actionGetAllFolders());
  }, [!foldersReady]);
  useEffect(() => {
    dispatch(actionGetAllDocuments());
  }, [!documentsReady]);

  // ? State
  const [open, setOpen] = useState(true);

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
        {currentDocument && <Editor /> }
      </Main>
    </Box>
  )
} 
  
// ? Export
export default App;
