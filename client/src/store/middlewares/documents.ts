// ? Import NPM
import axios from 'axios';
import { AnyAction, Middleware } from 'redux';

// ? Import Local
// | Action Types
import {
  GET_ALL_DOCUMENTS,
  GET_ONE_DOCUMENT,
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
} from '../../actions/documents';

// ? Constants
// | Utils
const base_url = process.env.REACT_APP_SERVER_BASE_URL;
const headers = {
  'Content-Type': 'application/json'
};

// ? Middleware
const documentsMiddleware: Middleware = (api: any) => (next: any) => (action: AnyAction) => {
  switch (action.type) {
    // ? Get all documents
    case GET_ALL_DOCUMENTS: {
      axios
        .get(`${base_url}/documents`, {headers})
        .then((res) => {
          action.payload = {
            ...action.payload,
            documents: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Get one document
    case GET_ONE_DOCUMENT: {
      axios
        .get(`${base_url}/documents/${action.payload?.id}`, {headers})
        .then((res) => {
          action.payload = {
            ...action.payload,
            document: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Create document
    case CREATE_DOCUMENT: {
      axios
        .post(`${base_url}/documents`, action.payload?.document, {headers})
        .then((res) => {
          action.payload = {
            ...action.payload,
            document: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Update document
    case UPDATE_DOCUMENT: {
      console.log(action.payload);
      axios
        .patch(`${base_url}/documents/${action.payload?.id}`, action.payload?.document, {headers})
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

    // ? Delete document
    case DELETE_DOCUMENT : {
      axios
        .delete(`${base_url}/documents/${action.payload?.id}`, {headers})
        .then((res) => {
          action.payload = {
            ...action.payload,
            document: res.data,
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
      return next(action);
    }
  }
};

export default documentsMiddleware;