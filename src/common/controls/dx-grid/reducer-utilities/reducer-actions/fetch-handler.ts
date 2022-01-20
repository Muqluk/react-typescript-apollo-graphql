// TODO:  Unlikely to use this but leaving it here for now.
import helpers from './grid-reducer-helpers';
import common from '../../utils/standard-helpers';

const FetchHandler = (opts: any) => {
  const { rootNode, state, payload } = opts;
  helpers.stateValidator(state.get(rootNode).toJS());
  let newState = state;

  newState = newState
    .setIn([rootNode, 'gridDataModel', 'fetchingData'], true)
    .setIn([rootNode, 'gridDataModel', 'fetchingDataError'], false);

  if (common.isDefined(payload)) {
    const { detailId, singleLineDisplay, apiRequestParams } = payload;
    if (common.isDefined(apiRequestParams) && common.isDefined(apiRequestParams.referrer)) {
      newState = newState.setIn([rootNode, 'apiRequestParams', 'referrer'], apiRequestParams.referrer);
    }
    if (common.isDefined(detailId)) {
      newState = newState.setIn([rootNode, 'apiRequestParams', 'detailProps', 'id'], opts.payload.detailId);
    }
    if (common.isDefined(singleLineDisplay)) {
      newState = newState.setIn([rootNode, 'apiRequestParams', 'overrides', 'singleLineDisplay'], payload.singleLineDisplay);
      newState = newState.setIn([rootNode, 'gridDataModel', 'singleLineDisplay'], payload.singleLineDisplay);
    }
  }
  return newState;
};

export default FetchHandler;
