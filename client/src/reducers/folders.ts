// ? Import Local
// | Action Types
import {
  GET_ALL_FOLDERS,
  GET_ONE_FOLDER,
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
} from '../actions/folders';

// | Interface
import { FolderInterface } from '../interfaces';

// ? Initial state
const initialState: {
  foldersReady: boolean;
  allFolders: Array<FolderInterface>,
  currentFolder?: FolderInterface,
  createdFolder?: FolderInterface,
  updatedFolder?: {
    old: FolderInterface,
    updated: FolderInterface,
  },
  deletedFolder?: FolderInterface,
} = {
  foldersReady: false,
  allFolders: [],
};

// ? Reducer
export default (state = initialState, action: {
  type?: string,
  payload?: any,
} = {}) => {
  switch (action.type) {
    case GET_ALL_FOLDERS: {
      const folders = action.payload?.folders;
      if (!folders) {
        return state;
      }
      return {
        ...state,
        allFolders: folders,
        foldersReady: true,
      };
    }
    case GET_ONE_FOLDER: {
      const folder = action.payload.folder;
      return {
        ...state,
        currentFolder: folder,
      };
    }
    case CREATE_FOLDER: {
      const folder = action.payload?.folder;
      if (!folder) {
        return state;
      }
      return {
        ...state,
        allFolders: [...state.allFolders, folder],
        folderCreated: folder,
      };
    }
    case UPDATE_FOLDER: {
      const folder = action.payload?.folder;
      if (!folder) {
        return state;
      }
      const allFolders = state.allFolders;
      const index = state.allFolders.findIndex(
        (item: any) => item.id === folder.id,
      );
      if (index && index !== -1) {
        allFolders[index] = folder.updated;
      }
      return {
        ...state,
        allFolders: allFolders,
        folderUpdated: folder,
      };
    }
    case DELETE_FOLDER: {
      const folder = action.payload?.folder;
      if (!folder) {
        return state;
      }
      const allFolders = state.allFolders;
      const index = allFolders.findIndex((item: any) => item.id === folder.id);
      delete allFolders[index];
      return {
        ...state,
        allFolders: allFolders,
        folderDeleted: folder,
      };
    }
    default: {
        return state;
      }
  }
}