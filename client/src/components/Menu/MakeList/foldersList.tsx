// ? Import NPM
import * as React from 'react';
import { useSelector } from 'react-redux';

// ? Import Local
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

// ? Functions Definition
/**
 * @description This function is used create menu arborescence with folders and documents
 * @param list Array ➡️ Array with the Folders datas.
 * @returns    Array ➡️ Array with the components’ construction of menu arborescence.
 */
const foldersList: Function = (folders: FolderInterface[], documents: DocumentInterface,  level: number, parentId? : string): React.ReactElement[] => {
  const result: React.ReactElement[] = [];

  const list = level === 0 
    ? folders.filter((folder: any) => folder.root === true)
    : folders.filter((folder: any) => folder.parentId === parentId)
  ;
  
  list.forEach((folder: FolderInterface) => {
    const {
      _id, name, childrensId, documentsId,
    } = folder;

    const hasSubFolder = childrensId.length > 0;
    const hasDocuments = documentsId.length > 0;


    return result.push(
      <Accordion key={_id}>
        <AccordionSummary>
          <Typography>
            <FolderIcon isempty={!hasSubFolder && !hasDocuments ? "true" : undefined } fontSize="small" />{name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {hasSubFolder && foldersList(folders, documents, level + 1, _id)}
          {hasDocuments && documentsList(documents, _id)}
        </AccordionDetails>
      </Accordion>,
    );
  });

  return result;
};

// ? Export
export default foldersList;
