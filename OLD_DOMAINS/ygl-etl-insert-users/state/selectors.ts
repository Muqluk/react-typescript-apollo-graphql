import { createSelector } from '@reduxjs/toolkit';
import { APP_STATE } from 'src/app-base/state/store';

import { YglEtlGetInsertUsersState } from './reducer';
import YglUser from '../models/ygl-user';

export type TYglFetchUsersErrors = string | string[] | null;
export type TYglUsersLoading = ReturnType<typeof YglUsersLoading>;
export type TYglUsersLoaded = ReturnType<typeof YglUsersLoaded>;
export type TYglUsersErrors = ReturnType<typeof FetchYglUsersErrors>;

export type TItems = ReturnType<typeof YglUsers>;

const yglUsersDomain = (state: APP_STATE) => (state.yglUsersDomain as YglEtlGetInsertUsersState);

export const YglUsersLoading = createSelector(
  yglUsersDomain,
  (yglState: YglState): boolean => yglState.UsersLoading,
);

export const YglUsersLoaded = createSelector(
  yglUsersDomain,
  (yglState: YglState): boolean => yglState.UsersHadLoaded,
);

export const FetchYglUsersErrors = createSelector(
  yglUsersDomain,
  (yglState: YglState): TYglFetchUsersErrors => yglState.FetchYglUsersErrors,
);

export const YglUsers = createSelector(
  yglUsersDomain,
  (yglState: YglState): YglUser[] => yglState.YglUsers,
);
