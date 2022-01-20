import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { ApolloQueryResult } from '@apollo/client';

import gqlClient from '@common/utilities/graph-ql-client';

import {
  ActionTypes,
  FetchFamilyFileUsersSuccessAction,
  FetchFamilyFileUsersFailAction
} from './actions';

import AllFamilyFileUsers from '../graphql/query/all-family-file-users';
import FamilyFileUser from '../models/family-file-user';

const { FETCH_FAMILYFILE_USERS_REQUEST } = ActionTypes;

const getFamilyFileUsers = async () => {
  type AllFamilyFileUsers = {
    AllFamilyFileUsers: FamilyFileUser[];
  };
  const users: ApolloQueryResult<AllFamilyFileUsers> = await gqlClient
    .query<AllFamilyFileUsers>({ query: AllFamilyFileUsers });

  return users.data.AllFamilyFileUsers;
};

function* fetchFamilyFileUsersSaga() {
  try {
    const response: FamilyFileUser[] = yield call(getFamilyFileUsers);
    yield put(FetchFamilyFileUsersSuccessAction(response));
  } catch (e) {
    yield put(FetchFamilyFileUsersFailAction(e.message));
  }
}

function* FamilyFileSaga() {
  yield all([takeLatest(FETCH_FAMILYFILE_USERS_REQUEST, fetchFamilyFileUsersSaga)]);
}

export default FamilyFileSaga;
