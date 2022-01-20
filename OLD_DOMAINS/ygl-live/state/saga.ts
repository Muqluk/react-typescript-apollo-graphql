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
  FetchYglUsersSuccessAction,
  FetchYglUsersFailAction
} from './actions';

import AllYglUsers from '../graphql/query/all-ygl-users';
import YglUser from '../models/ygl-user';

const { FETCH_YGL_USERS_REQUEST } = ActionTypes;

const getYglUsers = async () => {
  type AllYglUsers = {
    AllYglUsers: YglUser[];
  };
  const users: ApolloQueryResult<AllYglUsers> = await gqlClient
    .query<AllYglUsers>({ query: AllYglUsers });

  return users.data.AllYglUsers;
};

function* fetchYglUsersSaga() {
  try {
    const response: YglUser[] = yield call(getYglUsers);
    yield put(FetchYglUsersSuccessAction(response));
  } catch (e) {
    yield put(FetchYglUsersFailAction(e.message));
  }
}

function* YglSaga() {
  yield all([takeLatest(FETCH_YGL_USERS_REQUEST, fetchYglUsersSaga)]);
}

export default YglSaga;
