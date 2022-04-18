export const GET_ALL_DOCUMENTS = 'action/GET_ALL_DOCUMENTS';
export const GET_ONE_DOCUMENT = 'action/GET_ONE_DOCUMENT';
export const CREATE_DOCUMENT = 'action/CREATE_DOCUMENT';
export const UPDATE_DOCUMENT = 'action/UPDATE_DOCUMENT';
export const DELETE_DOCUMENT = 'action/DELETE_DOCUMENT';

/**
 * @description Axio’s request for get all documents
 * @returns All documents
 */
export const actionGetAllDocuments = () => ({
  type: GET_ALL_DOCUMENTS,
});

/**
 * @description Axio’s request for get one document
 * @param id String - document's id to get
 * @returns Document
 */
export const actionGetOneDocument = (id: string) => ({
  type: GET_ONE_DOCUMENT,
  payload: {
    id,
  },
});

/**
 * @description Axio’s request for create document
 * @param document Object - document's object
 * @returns Document created
 */
export const actionCreateDocument = (document: {}) => ({
  type: CREATE_DOCUMENT,
  payload: {
    document,
  }
});

/**
 * @description Axio’s request for update document
 * @param id String - document's id to update
 * @param document Object - document's datas to update
 * @returns Document updated and document previous datas
 */
export const actionUpdateDocument = (id: string, document: {}) => ({
  type: UPDATE_DOCUMENT,
  payload: {
    id,
    document,
  }
});

/**
 * @description Axio’s request for delete one document
 * @param id String - document's id to delete
 * @returns Document deleted
 */
export const actionDeleteDocument = (id: string) => ({
  type: DELETE_DOCUMENT,
  payload: {
    id,
  }
});
