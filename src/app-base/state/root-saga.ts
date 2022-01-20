import { all, fork } from 'redux-saga/effects';
// import FamilyFileSaga from '@domains/family-file/state/saga';
// import YglSaga from '@domains/ygl-live/state/saga';
// import YglEtlInsertUsersSaga from '@domains/ygl-etl-insert-users/state/saga';

export function* rootSaga() {
  yield all([
    // fork(FamilyFileSaga),
    // fork(YglSaga),
    // fork(YglEtlInsertUsersSaga),
  ]);
}
