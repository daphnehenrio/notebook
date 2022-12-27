// ? Import NPM
import * as React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";

// | Material Components
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Modal,
  Button
} from '@mui/material';

import Input from "@material-ui/core/Input";

// | Material Icons
import {
  DocumentScanner as DocumentScannerIcon,
  Delete as DeleteIcon,
  LocalOffer as LocalOfferIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// ? Import Local
// | Interface
import { DocumentInterface, FolderInterface } from '../../../interfaces'

// | Actions
import { actionGetOneDocument, actionUpdateDocument } from '../../../actions/documents';

// | Styled Components
import { ListItemIcon } from '../../StyledComponents';

// | Styles
import './styles.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '2rem 4rem',
  width: '30vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ? PropTypes
type Props = {
  doc: DocumentInterface;
};

interface IFormInput {
  name: string;
  folder: {label: string; value: string };
}

// ? Functions Definition
const Item = ({ doc } : Props) => {
  console.log(doc);
  const dispatch = useDispatch();
  const folders = useSelector((state: any) => state.folders.allFolders);
  const currentFolder = folders.find((folder: FolderInterface) => folder._id === doc.folderId)
  const labels = useSelector((state: any) => state.labels.allLabels);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openTag, setOpenTag] = React.useState(false);
  const handleOpenTag = () => setOpenTag(true);
  const handleCloseTag = () => setOpenTag(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmitEdit: SubmitHandler<IFormInput> = data => {
    console.log(data)
    dispatch(actionUpdateDocument(doc._id, {title: data.name, folderId: data.folder.value}));
    handleCloseEdit();
  };

  const onSubmitTag: SubmitHandler<IFormInput> = data => {
    console.log(data)
    handleCloseTag();
  };

  const onSubmitDelete: SubmitHandler<IFormInput> = data => {
    console.log(data)
    handleCloseDelete();
  };

  // ? Return
  return (
    <ListItem className='documentItem' button key={doc._id}>
      <div
        className='documentName'
        onClick={() => {dispatch(actionGetOneDocument(doc._id))}}
      >
        <ListItemIcon >
          <DocumentScannerIcon />
        </ListItemIcon>
        <ListItemText primary={doc.title} />
      </div>
      <div className='ctaDocument'>
        <IconButton  onClick={handleOpenEdit} color="primary" aria-label="edit">
          <EditIcon fontSize='small'/>
        </IconButton>
        <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              defaultValue={doc.title}
              render={({ field }) => <>
                <label htmlFor="name">Nom du document : </label>
                <Input {...field}  />
              </>}
            />
            <Controller
              name="folder"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <>
                <label htmlFor="folder">Dossier : </label>
                <Select 
                  {...field} 
                  defaultValue={{ label: currentFolder.name, value: doc.folderId }}                
                  options={folders.map((folder: FolderInterface) => ({ label: folder.name, value: folder._id }))} 
                />
              </>}
            />
          
            <Button type="submit" variant="contained" onClick={() => {
              handleSubmit(onSubmitEdit);
            }}>
              Valider
            </Button>
          </form>
        </Box>
      </Modal>

        <IconButton  onClick={handleOpenTag} color="primary" aria-label="tag">
          <LocalOfferIcon fontSize='small'/>
        </IconButton>
        <IconButton onClick={handleOpenDelete} color="primary" aria-label="delete">
          <DeleteIcon fontSize='small'/>
        </IconButton>
      </div>
    </ListItem>
  );
}
/**
 * @description This function is used create menu arborescence with documents only
 * @param documents Array ➡️ Array with the Documents datas.
 * @returns         Array ➡️ Array with the components’ construction of menu arborescence for documents.
 */
const documentsList: Function = (documents: DocumentInterface[], folderId: string): React.ReactElement[] => {
  const result: React.ReactElement[] = [];
  const list = documents.filter((document: DocumentInterface) => document.folderId === folderId);
  

  list.forEach((doc: DocumentInterface) => result.push(
    <Item doc={doc} key={doc._id} />,
  ));

  // ? Return  
  return result;
};

// ? Export
export default documentsList;
