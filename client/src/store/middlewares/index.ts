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

import labelsMiddleware from './labels';
import foldersMiddleware from './folders';
import documentsMiddleware  from './documents';

export default [
  labelsMiddleware,
  foldersMiddleware,
  documentsMiddleware,
];