// TODO: unlikely to use this but leaving it here for now.

const FetchErrorHandler = (opts: any) => {
  const { state, rootNode, payload } = opts;
  let newState = state;
  const { fetchingData, fetchingDataError } = payload;
  newState = newState.setIn([rootNode, 'gridDataModel', 'fetchingData'], fetchingData);
  newState = newState.setIn([rootNode, 'gridDataModel', 'fetchingDataError'], fetchingDataError);
  return newState;
};

export default FetchErrorHandler;
