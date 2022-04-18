// ? Import NPM
import axios from 'axios';
import { MiddlewareAPI, Dispatch, AnyAction, Middleware } from 'redux';

// ? Import Local
// | Action Types
import {
  GET_ALL_FOLDERS,
  GET_ONE_FOLDER,
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
} from '../../actions/folders';

// ? Constants
// | Utils
const base_url = process.env.REACT_APP_SERVER_BASE_URL;

// ? Middleware
const folderMiddleware: Middleware = (api: any) => (next: any) => (action: AnyAction) => {
  switch (action.type) {
    // ? Get all folders
    case GET_ALL_FOLDERS: {
      axios
        .get(`${base_url}/folders`)
        .then((res) => {
          action.payload = {
            ...action.payload,
            folders: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Get one folder
    case GET_ONE_FOLDER: {
      axios
        .get(`${base_url}/folders/${action.payload?.id}`)
        .then((res) => {
          action.payload = {
            ...action.payload,
            folder: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Create folder
    case CREATE_FOLDER: {
      axios
        .post(`${base_url}/folders`, action.payload?.folder)
        .then((res) => {
          action.payload = {
            ...action.payload,
            folder: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Update folder
    case UPDATE_FOLDER: {
      axios
        .patch(`${base_url}/folders/${action.payload?.id}`, action.payload?.folder)
        .then((res) => {
          action.payload = {
            ...action.payload,
            data: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Delete folder
    case DELETE_FOLDER: {
      axios
        .delete(`${base_url}/folders/${action.payload?.id}`)
        .then((res) => {
          action.payload = {
            ...action.payload,
            folder: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Default
    default: {
      next(action);
    }
  }
};

export default folderMiddleware;