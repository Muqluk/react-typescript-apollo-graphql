import YglUser from '../models/ygl-user';

export enum ActionTypes {
  FETCH_YGL_USERS_REQUEST = '@@YGL_LIVE/FETCH_YGL_USERS_REQUEST',
  FETCH_YGL_USERS_SUCCESS = '@@YGL_LIVE/FETCH_YGL_USERS_SUCCESS',
  FETCH_YGL_USERS_FAIL = '@@YGL_LIVE/FETCH_YGL_USERS_FAIL',
  YGL_USERS_GRID_CHANGED = '@@YGL_LIVE/YGL_USERS_GRID_CHANGED',
}

export type YglAction =
  | IFetchYglUsersAction
  | IFetchYglUsersSuccessAction
  | IFetchYglUsersFailAction
  | IYglUsersGridChanged;

export interface IFetchYglUsersAction {
  type: typeof ActionTypes.FETCH_YGL_USERS_REQUEST;
}
export const FetchYglUsersAction = (): IFetchYglUsersAction => ({
  type: ActionTypes.FETCH_YGL_USERS_REQUEST,
});

export interface IFetchYglUsersSuccessAction {
  type: typeof ActionTypes.FETCH_YGL_USERS_SUCCESS;
  payload: Array<YglUser>;
}
export const FetchYglUsersSuccessAction = (
  yglUsers: Array<YglUser>
): IFetchYglUsersSuccessAction => ({
  type: ActionTypes.FETCH_YGL_USERS_SUCCESS,
  payload: yglUsers,
});

export interface IFetchYglUsersFailAction {
  type: typeof ActionTypes.FETCH_YGL_USERS_FAIL;
  payload: string | string[] | null;
}
export const FetchYglUsersFailAction = (
  errors: string | string[] | null
): IFetchYglUsersFailAction => ({
  type: ActionTypes.FETCH_YGL_USERS_FAIL,
  payload: errors,
});

export interface IYglUsersGridChanged {
  type: typeof ActionTypes.YGL_USERS_GRID_CHANGED;
  payload: any;
}

export const YglUsersGridChangedAction = (
  cols: any
) => ({
  type: ActionTypes.YGL_USERS_GRID_CHANGED,
  payload: cols,
});
