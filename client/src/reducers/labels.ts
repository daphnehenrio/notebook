import { AnyAction } from 'redux';
// ? Import Local
// | Action Types
import {
  GET_ALL_LABELS,
  GET_ONE_LABEL,
  CREATE_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
} from '../actions/labels';

// | Interface
import { LabelInterface } from '../interfaces';

// ? Initial state
const initialState: {
  allLabels: Array<LabelInterface>,
  currentLabel?: LabelInterface,
  createdLabel?: LabelInterface,
  updatedLabel?: {
    old: LabelInterface,
    updated: LabelInterface,
  },
  deletedLabel?: LabelInterface,
} = {
  allLabels: [],
};

// ? Reducer
export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_LABELS: {
      const labels = action.payload?.labels;
      if (!labels) {
        return state;
      }
      return {
        ...state,
        allLabels: labels,
      };
    }
    case GET_ONE_LABEL: {
      const label = action.payload?.label;
      if (!label) {
        return state;
      }
      return {
        ...state,
        currentLabel: label,
      };
    }
    case CREATE_LABEL: {
      const label = action.payload?.label;
      if (!label) {
        return state;
      }
      return {
        ...state,
        allLabels: [...state.allLabels, label],
        labelCreated: label,
      };
    }
    case UPDATE_LABEL: {
      const label = action.payload?.data;
      if (!label) {
        return state;
      }
      const allLabels = state.allLabels;
      const index = state.allLabels.findIndex(
        (item: any) => item.id === label.old.id,
      );
      if (index && index !== -1) {
        allLabels[index] = label.updated;
      }
      return {
        ...state,
        labelUpdated: label,
        allLabels: allLabels,
      };
    }
    case DELETE_LABEL: {
      const id = action.payload?.id;
      if (!id) {
        return state;
      }
      const labels = [ ...state.allLabels ];
      const index = labels.findIndex((item: any) => item.id === id);
      delete labels[index];
      return {
        ...state,
        allLabels: labels,
        labelDeleted: labels,
      };
    }
    default: {
      return state;
    }
  }
};