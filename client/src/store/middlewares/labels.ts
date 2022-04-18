// ? Import NPM
import axios from 'axios';
import { MiddlewareAPI, Dispatch, AnyAction, Middleware } from 'redux';

// ? Import Local
// | Action Types
import {
  GET_ALL_LABELS,
  GET_ONE_LABEL,
  CREATE_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
} from '../../actions/labels';

// ? Constants
// | Utils
const base_url = process.env.REACT_APP_SERVER_BASE_URL;

// ? Middleware
const labelsMiddleware: Middleware = (api: any) => (next: any) => (action: AnyAction) => {
  switch (action.type) {
    // ? Get all labels
    case GET_ALL_LABELS: {
      axios
        .get(`${base_url}/labels`)
        .then((res) => {
          action.payload = {
            ...action.payload,
            labels: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Get one label
    case GET_ONE_LABEL: {
      axios
        .get(`${base_url}/labels/${action.payload?.id}`)
        .then((res) => {
          action.payload = {
            ...action.payload,
            label: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Create label
    case CREATE_LABEL: {
      axios
        .post(`${base_url}/labels`, action.payload?.label)
        .then((res) => {
          action.payload = {
            ...action.payload,
            label: res.data,
          }
          return next(action);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    }

    // ? Update label
    case UPDATE_LABEL: {
      axios
        .put(`${base_url}/labels/${action.payload?.id}`, action.payload?.label)
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

    // ? Delete label
    case DELETE_LABEL: {
      axios
        .delete(`${base_url}/labels/${action.payload?.id}`)
        .then((res) => {
          action.payload = {
            ...action.payload,
            label: res.data,
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

export default labelsMiddleware;