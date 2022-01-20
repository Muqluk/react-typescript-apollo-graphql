import produce from 'immer';

import { YglEtlGetInsertUsers } from '../models/ygl-etl-get-insert-users-types';
import { YglUsersForInsertAction, ActionTypes } from './actions';

export type YglEtlGetInsertUsersState = {
  readonly UsersLoading: boolean;
  readonly UsersHadLoaded: boolean;
  readonly YglEtlGetInsertUsers: YglEtlGetInsertUsers;
  readonly FetchYglUsersErrors: string | string[] | null;
};

export const reducerKey = 'yglEtlInsertUsersDomain';

const initialState: YglEtlGetInsertUsersState = Object.freeze({
  UsersLoading: false,
  UsersHadLoaded: false,
  FetchYglUsersErrors: null,
  YglEtlGetInsertUsers: {
    AllYglUsersInRange: [],
    UsersRemovedDuringDedupe: [],
    UsersAfterDedupe: [],
    RemovedAsExistingInFf: [],
    UsersToInsert: [],
    Meta: {
      AllYglUsersInRangeRows: 0,
      UsersRemovedDuringDedupeRows: 0,
      UsersAfterDedupeRows: 0,
      RemovedAsExistingInFfRows: 0,
      UsersToInsertRows: 0,
      DateRange: {
        From: new Date(),
        To: new Date(),
      },
    },
  },
});

export const YglEtlInsertUsersReducer = (
  state: YglEtlGetInsertUsersState = initialState,
  action: YglUsersForInsertAction
): YglEtlGetInsertUsersState => produce(state, (draft) => {
  const newDraft = draft;
  switch (action.type) {
    case ActionTypes.FETCH_YGL_USERS_FOR_INSERT_REQUEST:
      newDraft.UsersHadLoaded = false;
      newDraft.UsersLoading = true;
      newDraft.YglEtlGetInsertUsers = { ...initialState.YglEtlGetInsertUsers };
      break;
    case ActionTypes.FETCH_YGL_USERS_FOR_INSERT_SUCCESS:
      newDraft.UsersHadLoaded = true;
      newDraft.UsersLoading = false;
      newDraft.YglEtlGetInsertUsers = action.payload;
      break;
    case ActionTypes.FETCH_YGL_USERS_FOR_INSERT_FAIL:
      newDraft.UsersHadLoaded = false;
      newDraft.UsersLoading = false;
      newDraft.FetchYglUsersErrors = action.payload;
      break;
    default:
      break;
  }
});
