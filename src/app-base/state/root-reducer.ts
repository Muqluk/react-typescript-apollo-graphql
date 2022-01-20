import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

// import { FamilyFileUserReducer } from '@domains/family-file/state/reducer';
// import { YglReducer, reducerKey } from '@domains/ygl-live/state/reducer';
// import {
//   YglEtlInsertUsersReducer,
//   reducerKey as yglEtlInsertUsers
// } from '@domains/ygl-etl-insert-users/state/reducer';

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  // ffUsersDomain: FamilyFileUserReducer,
  // [reducerKey]: YglReducer,
  // [yglEtlInsertUsers]: YglEtlInsertUsersReducer,
});
