// ? Import NPM
import * as React from 'react';
import { useDispatch } from 'react-redux';

// | Material Components
import {
  ListItem,
  ListItemText,
} from '@mui/material';

// | Material Icons
import {
  DocumentScanner as DocumentScannerIcon,
} from '@mui/icons-material';

// ? Import Local
// | Interface
import { DocumentInterface } from '../../../interfaces'

// | Styled Components
import { ListItemIcon } from '../../StyledComponents';
import { actionGetOneDocument } from '../../../actions/documents';

// ? Functions Definition
/**
 * @description This function is used create menu arborescence with documents only
 * @param documents Array ➡️ Array with the Documents datas.
 * @returns         Array ➡️ Array with the components’ construction of menu arborescence for documents.
 */
const documentsList: Function = (documents: DocumentInterface[], folderId: string): React.ReactElement[] => {
  const dispatch = useDispatch();
  const result: React.ReactElement[] = [];
  const list = documents.filter((document: DocumentInterface) => document.folderId === folderId);
  list.forEach((doc: DocumentInterface) => result.push(
    <ListItem button key={doc._id}>
      <ListItemIcon>
        <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary={doc.title} onClick={() => {dispatch(actionGetOneDocument(doc._id))}} />
    </ListItem>,
  ));
  return result;
};

// ? Export
export default documentsList;
