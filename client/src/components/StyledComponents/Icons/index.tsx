/* eslint-disable import/prefer-default-export */
// ? Import NPM
// | Material Icons
import {
  FolderTwoTone,
} from '@mui/icons-material';

// | Material Styles
import { styled } from '@mui/material/styles';

// ? Export
export const FolderIcon = styled(FolderTwoTone)(({ isEmpty }: { isEmpty: boolean }) => ({
  color: isEmpty ? 'grey' : 'black',
  marginRight: '3px',
  marginBottom: '2px',
}));
