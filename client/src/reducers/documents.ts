// ? Import Local
// | Action Types
import {
  GET_ALL_DOCUMENTS,
  GET_ONE_DOCUMENT,
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
} from '../actions/documents';

// | Interface
import { DocumentInterface } from '../interfaces';

// ? Initial state
const initialState: {
  documentsReady: boolean;
  allDocuments: Array<DocumentInterface>,
  currentDocument?: DocumentInterface,
  createdDocument?: DocumentInterface,
  updatedDocument?: {
    old: DocumentInterface,
    updated: DocumentInterface,
  },
  deletedDocument?: DocumentInterface,
} = {
  documentsReady: false,
  allDocuments: [],
};

// ? Reducer
export default (state = initialState, action: {
  type?: string,
  payload?: any,
} = {}) => {
  switch (action.type) {
    case GET_ALL_DOCUMENTS: {
      const documents = action.payload.documents;
      if (!documents) {
        return state;
      }
      return {
        ...state,
        allDocuments: documents,
        documentsReady: true,
      };
    }
    case GET_ONE_DOCUMENT: {
      const document = action.payload.document;
      if (!document) {
        return state;
      }
      return {
        ...state,
        currentDocument: document,
      };
    }
    case CREATE_DOCUMENT: {
      const document = action.payload.document;
      if (!document) {
        return state;
      }
      return {
        ...state,
        allDocuments: [...state.allDocuments, document],
        documentCreated: document,
      };
    }
    case UPDATE_DOCUMENT: {
      const document = action.payload.data;
      if (!document) {
        return state;
      }
      const allDocuments = state.allDocuments;
      const index = state.allDocuments.findIndex(
        (item: DocumentInterface) => item._id === document.updated.id,
      );
      if (index && index !== -1) {
        allDocuments[index] = document.updated;
      }

      return {
        ...state,
        allDocuments: allDocuments,
        documentUpdated: {
          old: document.old,
          updated: document.updated,
        },
        currentDocument: state.currentDocument?._id === document.updated?._id ? document.updated : state.currentDocument,
      };
    }
    case DELETE_DOCUMENT: {
      const document = action.payload.document;
      if (!document) {
        return state;
      }
      const allDocuments = state.allDocuments;
      const index = state.allDocuments.findIndex(
        (item: DocumentInterface) => item._id === document._id,
      );
      return {
        ...state,
        allDocuments: [
          ...allDocuments.slice(0, index),
          ...allDocuments.slice(index + 1),
        ],
        documentDeleted: document,
      };
    }
    default: {
      return state;
    }
  }
}