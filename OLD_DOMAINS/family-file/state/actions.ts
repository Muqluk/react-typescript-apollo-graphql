import FamilyFileUser from '../models/family-file-user';

export enum ActionTypes {
  FETCH_FAMILYFILE_USERS_REQUEST = '@@FAMILYFILE/FETCH_FAMILYFILE_USERS_REQUEST',
  FETCH_FAMILYFILE_USERS_SUCCESS = '@@FAMILYFILE/FETCH_FAMILYFILE_USERS_SUCCESS',
  FETCH_FAMILYFILE_USERS_FAIL = '@@FAMILYFILE/FETCH_FAMILYFILE_USERS_FAIL',
}

// #region Action Creator interfaces

export interface IFetchFamilyFileUsersAction {
  type: typeof ActionTypes.FETCH_FAMILYFILE_USERS_REQUEST;
}
export interface IFetchFamilyFileUsersSuccessAction {
  type: typeof ActionTypes.FETCH_FAMILYFILE_USERS_SUCCESS;
  payload: Array<FamilyFileUser>;
}
export interface IFetchFamilyFileUsersFailAction {
  type: typeof ActionTypes.FETCH_FAMILYFILE_USERS_FAIL;
  payload: string | string[] | null;
}

// #endregion Action Creator interfaces

export type FamilyFileAction =
  | IFetchFamilyFileUsersAction
  | IFetchFamilyFileUsersSuccessAction
  | IFetchFamilyFileUsersFailAction;

export const FetchFamilyFileUsersAction = (): IFetchFamilyFileUsersAction => ({
  type: ActionTypes.FETCH_FAMILYFILE_USERS_REQUEST,
});

export const FetchFamilyFileUsersSuccessAction = (
  familyfileUsers: Array<FamilyFileUser>
): IFetchFamilyFileUsersSuccessAction => ({
  type: ActionTypes.FETCH_FAMILYFILE_USERS_SUCCESS,
  payload: familyfileUsers,
});

export const FetchFamilyFileUsersFailAction = (
  errors: string | string[] | null
): IFetchFamilyFileUsersFailAction => ({
  type: ActionTypes.FETCH_FAMILYFILE_USERS_FAIL,
  payload: errors,
});
