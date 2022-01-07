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

// ? Types Definition
type listDatasType = FolderInterface[] | DocumentInterface[];

// ? Functions Definition
/**
 * @description This function is used to get the subFolders and documents datas in a secific folder.
 * @param ids   String ➡️ The ids of the subFolder or Documents which we want.
 * @param datas Array  ➡️ Array with all Folders or Documents datas from BDD.
 * @returns     Array  ➡️ Array with the subFolders or Documents datas.
 */
// FIXME: How set `datas: listDatasType` (def l:26) without creating pb in `datas.find` with `d: FolderInterface | DocumentInterface`
const getSubFoldersOrDocs: Function = (ids: string[], datas: []): listDatasType => {
  const result: listDatasType = [];

  ids.forEach((id: string) => {
    const search = datas.find((d: FolderInterface | DocumentInterface ) => d.id === id);
    return search && result.push(search);
  });

  return result;
}

const foldersList: Function = (list: FolderInterface[]): React.ReactElement[] => {
  const result: React.ReactElement[] = [];
  
  list.forEach((folder: FolderInterface) => {
    const {
      id, name, childrensId, documentsId,
    } = folder;

    // FIXME: How set optional chaining => `childrensId?.length`
    const subFolders: FolderInterface[] | null =
      childrensId && childrensId.length > 0 
        ? getSubFoldersOrDocs(childrensId, folders) 
        : null;
  
    const docs: DocumentInterface[] | null =
      documentsId && documentsId.length > 0 
        ? getSubFoldersOrDocs(documentsId, documents) 
        : null;
    
    return result.push(
      <Accordion key={id}>
        <AccordionSummary>
          <Typography>
            <FolderIcon fontSize="small" />{name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subFolders && foldersList(subFolders)}
          {docs && documentsList(docs)}
        </AccordionDetails>
      </Accordion>,
    );
  });

  return result;
};

// ? Export
export default foldersList;
