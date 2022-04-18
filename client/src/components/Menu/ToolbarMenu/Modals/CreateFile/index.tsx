// ? Import NPM
import * as React from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSelector } from 'react-redux';

// | Material Components
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from "react-select";
import Input from "@material-ui/core/Input";
import Button from '@mui/material/Button';

// | Material Icons
import CreateIcon from '@mui/icons-material/Create';

// ? Styles
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

// ? Component Definition

interface IFormInput {
  name: string;
  folder: {label: string; value: string };
}

const CreateFile = () => {
  const folders = useSelector((state: any) => state.folders.allFolders);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
    handleClose();
  };

  // ? Return
  return (
    <>
      <IconButton onClick={handleOpen} color="primary" aria-label="create new folder picture" component="span">
        <CreateIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              defaultValue=""
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
                  options={folders.map((folder: { name: any; id: any; }) => ({ label: folder.name, value: folder.id }))} 
                />
              </>}
            />
            <Button type="submit" variant="contained" onClick={() => {
              handleSubmit(onSubmit);
            }}>
              Valider
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

// ? Export
export default CreateFile;