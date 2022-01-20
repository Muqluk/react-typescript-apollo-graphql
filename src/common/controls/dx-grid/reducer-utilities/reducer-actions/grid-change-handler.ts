import helpers from './grid-reducer-helpers';

const chipFiltersChanged = (state: any, filter: any) => {
  const newState = state;
  const gridFilters: any = [];
  const chipFilters = newState.get('chipFilters');

  chipFilters.some((c: any) => {
    if (c.name === filter.columnName) {
      c.values = filter.value; // eslint-disable-line
      return true;
    }
    return false;
  });

  chipFilters.filter((chip: any) => chip.values)
    .forEach((c: any) => gridFilters.push({
      columnName: c.name,
      value: c.values,
      operation: 'contains',
    }));

  return newState.set('chipFilters', chipFilters)
    .set('gridFilters', gridFilters);
};

const selectedChanged = (gridDataModel: any, keyColumn: any, selected: any) => {
  let newDataModel = gridDataModel.set('selected', selected);
  newDataModel = hideSelectedChanged(newDataModel, keyColumn, newDataModel.get('hideSelected'));
  return newDataModel;
};

const hideSelectedChanged = (gridDataModel: any, keyColumn: any, hideSelected: any) => {
  const newDataModel = gridDataModel.set('hideSelected', hideSelected);
  const { rows, gridFilters } = newDataModel.toJS();
  const selected = newDataModel.get('selected', []);
  let filters = [];

  if (selected.length !== rows.length) {
    const selections = selected.map((index: any) => {
      const keyValue = rows[index][keyColumn];
      return keyValue;
    });

    filters = gridFilters.filter((gf: any) => (gf.columnName !== '__selectedRowCol__'));

    if (hideSelected && selections.length > 0) {
      const hiddenRowsFilter = {
        columnName: '__selectedRowCol__',
        value: selections.map((v: any) => (`${v}`)),
        operation: 'notequal',
      };
      filters.push(hiddenRowsFilter);
    }
    return newDataModel
      .set('hideSelected', hideSelected)
      .set('gridFilters', filters);
  }
  return newDataModel
    .set('hideSelected', hideSelected)
    .set('gridFilters',
      gridFilters.filter((f: any) => (f.columnName !== '__selectedRowCol__')));
};

const GridChangedHandler = (opts: any) => {
  const specialCases = ['chipFilters', 'hideSelected', 'selected'];
  const { state, rootNode, payload } = opts;
  const { event, values } = payload;
  let newState = state;
  let gridDataModel = newState.getIn([rootNode, 'gridDataModel']);
  const gridProps = newState.getIn([rootNode, 'apiMetaResults', 'gridProps']);
  const keyColumn = gridProps.keyColumns[0];

  // I really hate this block of code... ugly.
  if (specialCases.includes(event)) {
    if (event === 'selected') {
      gridDataModel = selectedChanged(gridDataModel, keyColumn, values);
    } else if (event === 'hideSelected') {
      gridDataModel = hideSelectedChanged(gridDataModel, keyColumn, values);
    } else if (event === 'chipFilters') {
      gridDataModel = chipFiltersChanged(gridDataModel, values);
    }
    newState = newState.setIn([rootNode, 'gridDataModel'], gridDataModel);
  } else {
    gridDataModel = gridDataModel.set(event, values);
    newState = newState.setIn([rootNode, 'gridDataModel'], gridDataModel);
    helpers.saveCookie(rootNode, gridDataModel.get('savedSettings'), event, values);
  }

  return newState;
};

export default GridChangedHandler;
