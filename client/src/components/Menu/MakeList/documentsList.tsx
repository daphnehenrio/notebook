// ? Import NPM
import * as React from 'react';

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

// ? Functions Definition
/**
 * @description This function is used create menu arborescence with documents only
 * @param documents Array ➡️ Array with the Documents datas.
 * @returns         Array ➡️ Array with the components’ construction of menu arborescence for documents.
 */
const documentsList: Function = (documents: DocumentInterface[]): React.ReactElement[] => {
  const result: React.ReactElement[] = [];
  documents.forEach((doc: DocumentInterface) => result.push(
    <ListItem button key={doc.id}>
      <ListItemIcon>
        <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary={doc.title} />
    </ListItem>,
  ));
  return result;
};

// ? Export
export default documentsList;
