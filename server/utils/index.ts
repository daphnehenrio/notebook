import capture from './capture';
import { generateUUID } from './uuid';
import { progateDeleteUpdate } from './delete';
import {
  addNewDocumentToFolder,
  removeDocumentFromFolder,
  checkFoldersUpdate,
} from './documents';

import {
  getParentFolder,
  checkDataConcordance,
  addNewChildren,
  removeOldChildren,
  addNewParent,
  removeOldParent,
  compareDatasToPropagateUpdate,
} from './folders';


export {
  capture,
  generateUUID,
  progateDeleteUpdate,
  addNewDocumentToFolder,
  removeDocumentFromFolder,
  checkFoldersUpdate,
  getParentFolder,
  checkDataConcordance,
  addNewChildren,
  removeOldChildren,
  addNewParent,
  removeOldParent,
  compareDatasToPropagateUpdate,
};