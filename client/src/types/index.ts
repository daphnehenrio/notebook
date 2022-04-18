import { ThunkAction, Action } from '@reduxjs/toolkit';
import { MiddlewareAPI, Dispatch } from 'redux';

import { store } from '../store';
import {
  FolderInterface,
  DocumentInterface,
  LabelInterface
} from '../interfaces';

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ActionType = {
  type: string;
  payload?:{
    id?: string;
    folder?: FolderInterface,
    folders?: FolderInterface[],
    document?: DocumentInterface,
    documents?: DocumentInterface[],
    label?: LabelInterface,
    labels?: LabelInterface[],
    data?: any, 
  };
}

