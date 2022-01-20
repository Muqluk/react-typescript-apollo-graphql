import Cookies from 'universal-cookie';

import InitialStateBase from '../initial-state-base';
import common from '../../utils/standard-helpers';

const defaultSavedSettings = ['columnOrder', 'columnWidths', 'groupByColumns', 'hiddenColumns'];

const stateValidator = (mystate: any) => {
  common.compareObjects(mystate, InitialStateBase);
};
const saveCookie = (rootNode: any, savedSettings: any, key: any, valuesArr: any) => {
  const cookieCols = savedSettings || defaultSavedSettings;
  if (cookieCols.includes(key)) {
    const cookies = new Cookies();
    const proposed = [];
    proposed[key] = valuesArr;
    // eslint-disable-next-line
    const newCookie = Object.assign({}, cookies.get(rootNode), proposed);
    cookies.set(rootNode, newCookie);
  }
};

const applyAllCookies = (state: any, rootNode: any) => {
  let newState = state;
  const cookies = new Cookies().get(rootNode);
  if (cookies) {
    Object.keys(cookies).forEach((key) => {
      newState = newState.setIn([rootNode, 'gridDataModel', key], cookies[key]);
    });
  }
  return newState;
};

const GridReducerHelpers = {
  stateValidator,
  saveCookie,
  applyAllCookies,
};

export default GridReducerHelpers;
