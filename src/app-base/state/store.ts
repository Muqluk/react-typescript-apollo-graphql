import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { withConfig } from '@common/utilities';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory({
  basename: withConfig('PUBLIC_URL'),
});
const middlewares = [routerMiddleware(history), sagaMiddleware]; // , logger];

const devToolsOptions = {
  trace: true,
  traceLimit: 25,
  shouldHotReload: true,
  autoPause: true,
};

const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(middlewares),
  //.concat(logger),
  devTools: devToolsOptions,
});
sagaMiddleware.run(rootSaga);
export default store;
export type APP_STATE = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
