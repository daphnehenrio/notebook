// ? Import NPM
import { combineReducers } from 'redux';

// ? Import Local
import documentsReducer from './documents';
import foldersReducer from './folders';
import labelsReducer from './labels';

// ? Export
export default combineReducers({
  documents: documentsReducer,
  folders: foldersReducer,
  labels: labelsReducer,
});