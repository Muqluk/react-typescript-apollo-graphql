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
  FetchYglUsersForInsertSuccessAction,
  FetchYglUsersForInsertFailAction,
} from './actions';

import YglGetUsersForInsert from '../graphql/query/ygl-etl-get-insert-users';
import { YglEtlGetInsertUsers } from '../models/ygl-etl-get-insert-users-types';

const { FETCH_YGL_USERS_FOR_INSERT_REQUEST } = ActionTypes;

type TArgs = {
  startDate: Date,
  endDate: Date,
};
type YglGetUsersForInsertResult = {
  YglGetUsersForInsert: YglEtlGetInsertUsers;
};

async function fetchYglGetUsersForInsert(
  { startDate, endDate }: TArgs
): Promise<YglGetUsersForInsertResult> {
  const results: ApolloQueryResult<YglGetUsersForInsertResult> = await gqlClient
    .query<YglGetUsersForInsertResult>({
      query: YglGetUsersForInsert,
      variables: { startDate, endDate },
    });
  return results.data;
}

function* fetchYglEtlInsertUsersSaga() {
  try {
    const response: YglGetUsersForInsertResult = yield call<any>(
      fetchYglGetUsersForInsert,
      { startDate: '', endDate: '' },
    );
    yield put(FetchYglUsersForInsertSuccessAction(response.YglGetUsersForInsert));
  } catch (e) {
    yield put(FetchYglUsersForInsertFailAction(e.message));
  }
}

function* YglEtlInsertUsersSaga() {
  yield all([takeLatest(FETCH_YGL_USERS_FOR_INSERT_REQUEST, fetchYglEtlInsertUsersSaga)]);
}

export default YglEtlInsertUsersSaga;
