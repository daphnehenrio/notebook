export const GET_ALL_FOLDERS = 'action/GET_ALL_FOLDERS';
export const GET_ONE_FOLDER = 'action/GET_ONE_FOLDER';
export const CREATE_FOLDER = 'action/CREATE_FOLDER';
export const UPDATE_FOLDER = 'action/UPDATE_FOLDER';
export const DELETE_FOLDER = 'action/DELETE_FOLDER';

/**
 * @description Get all folders
 * @returns All folders
 */
export const actionGetAllFolders = () => ({
  type: GET_ALL_FOLDERS,
});

/**
 * @description Axio’s request for get one folder
 * @param id String - folder's id to get
 * @returns One folder
 */
export const actionGetOneFolder = (id: string) => ({
  type: GET_ONE_FOLDER,
  payload : {
    id,
  },
});

/**
 * @description Axio’s request for create folder
 * @param folder Object - folder's object
 * @returns Folder created
 */
export const actionCreateFolder = (folder: {}) => ({
  type: CREATE_FOLDER,
  payload: {
    folder,
  },
});

/**
 * @description Axio’s request for update folder
 * @param id String - folder's id to update
 * @param folder Object - folder's datas to update
 * @returns Folder updated and folder previous datas
 */
export const actionUpdateFolder = (id: string, folder: {}) => ({
  type: UPDATE_FOLDER,
  payload: {
    id,
    folder,
  },
});

/**
 * @description Axio’s request for delete one folder
 * @param id String - folder's id to delete
 * @returns Folder deleted
 */
export const actionDeleteFolder = (id: string) => ({
  type: DELETE_FOLDER,
  payload: {
    id,
  },
});

