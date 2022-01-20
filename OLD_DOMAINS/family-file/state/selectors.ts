import { createSelector } from '@reduxjs/toolkit';
import { APP_STATE } from 'src/app-base/state/store';

import { FamilyFileState } from './reducer';
import FamilyFileUser from '../models/family-file-user';

export type TFamilyFileFetchUsersErrors = string | string[] | null;
export type TFamilyFileUsersLoading = ReturnType<typeof FamilyFileUsersLoading>;
export type TFamilyFileUsersLoaded = ReturnType<typeof FamilyFileUsersLoaded>;
export type TFamilyFileUsersErrors = ReturnType<typeof FetchFamilyFileUsersErrors>;

export type TItems = ReturnType<typeof FamilyFileUsers>;

const FFDomain = (state: APP_STATE) => (state.ffUsersDomain as FamilyFileState);

export const FamilyFileUsersLoading = createSelector(
  FFDomain,
  (ffState: FamilyFileState): boolean => ffState.UsersLoading,
);

export const FamilyFileUsersLoaded = createSelector(
  FFDomain,
  (ffState: FamilyFileState): boolean => ffState.UsersHadLoaded,
);

export const FetchFamilyFileUsersErrors = createSelector(
  FFDomain,
  (ffState: FamilyFileState): TFamilyFileFetchUsersErrors => ffState.FetchFamilyFileUserErrors,
);

export const FamilyFileUsers = createSelector(
  FFDomain,
  (ffState: FamilyFileState): FamilyFileUser[] => ffState.FamilyFileUsers,
);
