// ? Import NPM
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';

// | Material Components
import Stack from '@mui/material/Stack';

// ? Import Local
// | Components
import CreateFolder from './Modals/CreateFolder';
import CreateFile from './Modals/CreateFile';

// | Stlyed Components

// ? Component Definition
const ToolbarMenu = () => {

  // ? Return
  return (
    <Stack   
      direction='row'
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{padding: '0.5rem'}}
    >
      <CreateFolder />
      <CreateFile />
    </Stack>
  )
} 
  
// ? Export
export default ToolbarMenu;
