// ? Import NPM
import React from 'react';
import PropTypes from 'prop-types';

// | Material Icons
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

// | Data
import data from '../../data';

// | Component
import DocumentsList from '../DocumentsList';

// | Stlyed Components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FolderIcon,
} from '../../../StyledComponents';

const { folders } = data.notebook;

const getSubFolder = (ids) => {
  const subFolders = [];
  ids.map((id) => {
    folders.find((folder) => {
      if (folder.id === id) {
        subFolders.push(folder);
      }
      return null;
    });
    return null;
  });
  return subFolders;
};

const FoldersList = ({ foldersList }) => {
  const result = [];
  foldersList.forEach((folder) => {
    const {
      id, name, childrensId, documents,
    } = folder;
    const subFolders = childrensId?.length > 0 ? getSubFolder(childrensId) : null;
    return result.push(
      <React.Fragment key={id}>
        <Accordion className="menu--Accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="menu--ExpandMoreIcon" />}
            aria-controls="panel1a-content"
            id={id}
          >
            <Typography>
              <FolderIcon fontSize="small" />{name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {subFolders && <FoldersList foldersList={subFolders} />}
            {documents?.length > 0 && <DocumentsList documents={documents} />}
          </AccordionDetails>
        </Accordion>
      </React.Fragment>,
    );
  });

  return result;
};

export default FoldersList;

FoldersList.propTypes = {
  foldersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    childrensId: PropTypes.arrayOf(PropTypes.string),
    documents: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
    })),
    parentId: PropTypes.string,
  })).isRequired,
};
