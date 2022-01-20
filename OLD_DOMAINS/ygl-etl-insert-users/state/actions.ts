import { YglEtlGetInsertUsers } from '../models/ygl-etl-get-insert-users-types';

export enum ActionTypes {
  FETCH_YGL_USERS_FOR_INSERT_REQUEST = '@@YGL_USERS_FOR_INSERT/FETCH_YGL_USERS_FOR_INSERT_REQUEST',
  FETCH_YGL_USERS_FOR_INSERT_SUCCESS = '@@YGL_USERS_FOR_INSERT/FETCH_YGL_USERS_FOR_INSERT_SUCCESS',
  FETCH_YGL_USERS_FOR_INSERT_FAIL = '@@YGL_USERS_FOR_INSERT/FETCH_YGL_USERS_FOR_INSERT_FAIL',
  YGL_USERS_FOR_INSERT_GRID_CHANGED = '@@YGL_USERS_FOR_INSERT/YGL_USERS_FOR_INSERT_GRID_CHANGED',
}

export type YglUsersForInsertAction =
  | IFetchYglUsersForInsertAction
  | IFetchYglUsersForInsertSuccessAction
  | IFetchYglUsersForInsertFailAction
  | IYglUsersForInsertGridChanged;

export interface IFetchYglUsersForInsertAction {
  type: typeof ActionTypes.FETCH_YGL_USERS_FOR_INSERT_REQUEST;
}
export const FetchYglUsersForInsertAction = (): IFetchYglUsersForInsertAction => ({
  type: ActionTypes.FETCH_YGL_USERS_FOR_INSERT_REQUEST,
});

export interface IFetchYglUsersForInsertSuccessAction {
  type: typeof ActionTypes.FETCH_YGL_USERS_FOR_INSERT_SUCCESS;
  payload: YglEtlGetInsertUsers;
}
export const FetchYglUsersForInsertSuccessAction = (
  yglUsersForInsert: YglEtlGetInsertUsers
): IFetchYglUsersForInsertSuccessAction => ({
  type: ActionTypes.FETCH_YGL_USERS_FOR_INSERT_SUCCESS,
  payload: yglUsersForInsert,
});

export interface IFetchYglUsersForInsertFailAction {
  type: typeof ActionTypes.FETCH_YGL_USERS_FOR_INSERT_FAIL;
  payload: string | string[] | null;
}
export const FetchYglUsersForInsertFailAction = (
  errors: string | string[] | null
): IFetchYglUsersForInsertFailAction => ({
  type: ActionTypes.FETCH_YGL_USERS_FOR_INSERT_FAIL,
  payload: errors,
});

export interface IYglUsersForInsertGridChanged {
  type: typeof ActionTypes.YGL_USERS_FOR_INSERT_GRID_CHANGED;
  payload: any;
}

export const YglUsersForInsertGridChangedAction = (
  cols: any
): IYglUsersForInsertGridChanged => ({
  type: ActionTypes.YGL_USERS_FOR_INSERT_GRID_CHANGED,
  payload: cols,
});
