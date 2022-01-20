// https://techinscribed.com/clean-react-architecture-with-redux-immer-typescript-redux-observable/
import produce from 'immer';

// something I want to check out more fully later...
// https://madewithlove.com/blog/software-engineering/querying-your-redux-store-with-graphql/

import YglUser from '../models/ygl-user';
import { YglAction, ActionTypes } from './actions';

export type YglState = {
  readonly UsersLoading: boolean;
  readonly UsersHadLoaded: boolean;
  readonly YglUsers: YglUser[];
  readonly FetchYglUsersErrors: string | string[] | null;
};

export const reducerKey = 'yglUsersDomain';

const initialState: YglState = Object.freeze({
  UsersLoading: false,
  UsersHadLoaded: false,
  YglUsers: [],
  FetchYglUsersErrors: null,
});

export const YglReducer = (
  state: YglState = initialState,
  action: YglAction
): YglState => produce(state, (draft) => {
  const newDraft = draft;
  switch (action.type) {
    case ActionTypes.FETCH_YGL_USERS_REQUEST:
      newDraft.UsersHadLoaded = false;
      newDraft.UsersLoading = true;
      newDraft.YglUsers = [];
      break;
    case ActionTypes.FETCH_YGL_USERS_SUCCESS:
      newDraft.UsersHadLoaded = true;
      newDraft.UsersLoading = false;
      newDraft.YglUsers = action.payload;
      break;
    case ActionTypes.FETCH_YGL_USERS_FAIL:
      newDraft.UsersHadLoaded = false;
      newDraft.UsersLoading = false;
      newDraft.FetchYglUsersErrors = action.payload;
      break;
    default:
      break;
  }
});
