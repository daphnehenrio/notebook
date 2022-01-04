// ? Import NPM
import React from 'react';
import PropTypes from 'prop-types';

// | Material Components
import {
  ListItem,
  ListItemText,
} from '@mui/material';

// | Material Icons
import {
  DocumentScanner as DocumentScannerIcon,
} from '@mui/icons-material';

// | Styled Components
import { ListItemIcon } from '../../../StyledComponents';

const DocumentsList = ({ documents }) => {
  const result = [];
  documents.forEach((doc) => result.push(
    <ListItem button key={doc.id}>
      <ListItemIcon>
        <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary={doc.name} />
    </ListItem>,
  ));
  return result;
};

export default DocumentsList;

DocumentsList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
