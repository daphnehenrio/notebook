// ? Import NPM
import * as React from 'react';

// | Data
import data from '../data';

// | Interface
import { FolderInterface, DocumentInterface } from '../../../interfaces';

// | Component
import documentsList from './documentsList';

// | Stlyed Components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FolderIcon,
} from '../../StyledComponents';

// ? Data Definition
const { folders, documents } = data.notebook;

// ? Functions Definition
const getSubFolders: Function = (ids: string[]): FolderInterface[] | [] => {
  const subFolders: FolderInterface[] = [];
  ids.map((id: string) => {
    folders.find((folder: FolderInterface) => {
      if (folder.id === id) {
        subFolders.push(folder);
      }
      return null;
    });
    return null;
  });
  return subFolders;
};

const getDocuments: Function = (ids: string[]): DocumentInterface[] | [] => {
  const docs: DocumentInterface[] = [];
  ids.map((id: string) => {
    documents.find((document: DocumentInterface) => {
      if (document.id === id) {
        docs.push(document);
      }
      return null;
    });
    return null;
  });
  return docs;
}

const foldersList: Function = (list: FolderInterface[]): React.ReactElement[] => {
  const result: React.ReactElement[] = [];
  list.forEach((folder: FolderInterface) => {
    const {
      id, name, childrensId, documentsId,
    } = folder;
    const subFolders: FolderInterface[] | null = childrensId && childrensId.length > 0 ? getSubFolders(childrensId) : null;
    const documents: DocumentInterface[] | null = documentsId && documentsId.length > 0 ? getDocuments(documentsId) : null;
    console.log(name, documentsId, documents);
    return result.push(
      <Accordion key={id}>
        <AccordionSummary>
          <Typography>
            <FolderIcon fontSize="small" />{name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subFolders && foldersList(subFolders)}
          {documents && documents.length > 0 && documentsList(documents)}
        </AccordionDetails>
      </Accordion>,
    );
  });

  return result;
};

// ? Export
export default foldersList;
