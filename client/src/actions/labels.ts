export const GET_ALL_LABELS = 'action/GET_ALL_LABELS';
export const GET_ONE_LABEL = 'action/GET_ONE_LABEL';
export const CREATE_LABEL = 'action/CREATE_LABEL';
export const UPDATE_LABEL = 'action/UPDATE_LABEL';
export const DELETE_LABEL = 'action/DELETE_LABEL';

/**
 * @description Get all labels
 * @returns All labels
 */
export const actionGetAllLabels = () => ({
  type: GET_ALL_LABELS,
});

/**
 * @description Axio’s request for get one label
 * @param {string} id - label's id
 * @returns One label
 */
 export const actionGetOneLabel = (id: string) => ({
  type: GET_ONE_LABEL,
  payload: {
    id,
  },
});

/**
 * @description Axio’s request for create label
 * @param label Object - label's object
 * @returns Label created
 */
export const actionCreateLabel = (label: {}) => ({
  type: CREATE_LABEL,
  payload: {
    label,
  }
});

/**
 * @description Axio’s request for update label
 * @param id String - label's id to update
 * @param label Object - label's datas to update
 * @returns Label updated and label previous datas
 */
export const actionUpdateLabel = (id: string, label: {}) => ({
  type: UPDATE_LABEL,
  payload: {
    id,
    label,
  }
});

/**
 * @description Axio’s request for delete one label
 * @param id String - label's id to delete 
 * @returns Label deleted
 */
export const actionDeleteLabel = (id: string) => ({
  type: DELETE_LABEL,
  payload: {
    id,
  }
});