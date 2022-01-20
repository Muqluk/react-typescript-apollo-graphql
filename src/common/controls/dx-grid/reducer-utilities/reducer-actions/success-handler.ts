// TODO:  Unlikely to use this but leaving it here for now.
// import { fromJS } from 'immutable';
import helpers from './grid-reducer-helpers';
import common from '../../utils/standard-helpers';

// dummy fromJS to bypass typescript compile errors.
const fromJS = (arg: any) => { }; // eslint-disable-line

const rebuildChips = (columnMeta: any, rows: any[]) => {
  const maxSizeCols = [];
  const chipFilters = Object.keys(columnMeta)
    .filter((col) => columnMeta[col].chip)
    .map((col) => {
      const chipCopy = Object.assign({}, columnMeta[col].chip); // eslint-disable-line
      if (chipCopy.type === 'text') {
        const columnSet = new Set(rows
          .filter((row) => row[chipCopy.name] && row[chipCopy.name] !== '')
          .map((row) => {
            const colValue = row[chipCopy.name] ? row[chipCopy.name] : '';
            return typeof colValue === 'object'
              ? colValue.props.children.trim()
              : colValue.trim();
          }));
        if (columnSet.size <= 10000) {
          chipCopy.columnSet = Array.from(columnSet)
            .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
        } else {
          maxSizeCols.push({ col: chipCopy.name, size: columnSet.size });
        }
      }
      return chipCopy;
    });

  return chipFilters;
};

const upsertGridFilter = (gridFilters: any[], chipValues: any) => {
  let newFilters = gridFilters;
  let updatedExisting = false;
  newFilters = gridFilters.map((gf) => {
    if (gf.columnName === chipValues.columnName) {
      updatedExisting = true;
      return chipValues;
    }
    return gf;
  });

  if (!updatedExisting) {
    newFilters.push(chipValues);
  }
  return newFilters;
};

// eslint-disable-next-line
const mapGridFiltersToChips = (gridFilters: any[], defaultChips: any[], initialChips?: any) => {
  let chipFilters = defaultChips;
  if (gridFilters.length > 0) {
    gridFilters.forEach((f) => {
      chipFilters = chipFilters.map((cf) => {
        const chip = Object.assign({}, cf); // eslint-disable-line
        if (f.columnName === cf.name) {
          if (Array.isArray(f.value)) {
            chip.values = f.value;
          } else {
            const values = [];
            values.push(f.value);
            chip.values = values;
          }
        }
        return chip;
      });
    });
  }

  console.error('something used initialChips arg.  Look into this.'); // eslint-disable-line

  return chipFilters;
};

const mapChipsToGridFilters = (gridFilters: any[], chipValues: any) => {
  // TODO:  The following logic seems overly complex.
  //      consider a refactor at some point.
  let newFilters: any[] = Object.assign([], gridFilters);
  if (gridFilters && chipValues) {
    if (gridFilters === [] && newFilters === []) return [];
    if (newFilters && chipValues) {
      newFilters = gridFilters;
      if (newFilters && chipValues) {
        if (newFilters.length === 0) {
          newFilters.push(chipValues);
        } else if (chipValues.value || chipValues.values) {
          newFilters = upsertGridFilter(gridFilters, chipValues);
        } else {
          newFilters = gridFilters.filter((gf) => (gf.columnName !== chipValues.columnName));
        }
      }
    }
  }
  return newFilters;
};

const SuccessHandler = (opts: any) => {
  const { state, rootNode, payload } = opts;
  helpers.stateValidator(state.get(rootNode).toJS());
  const { apiMetaResults } = payload;
  const { gridProps } = apiMetaResults;
  const columnMeta = apiMetaResults.searchMeta.columns;
  const chipFilters = rebuildChips(columnMeta, payload.rows);
  let newState = state.setIn([rootNode, 'apiMetaResults'], fromJS(apiMetaResults));
  let gridDataModel = newState.getIn([rootNode, 'gridDataModel']);
  let apiMetaResultState = newState.getIn([rootNode, 'apiMetaResults']);

  let customCellTemplates = [];
  if (gridDataModel.get('customCellTemplates')) {
    customCellTemplates = gridDataModel.get('customCellTemplates').toJS();
  }
  customCellTemplates = customCellTemplates.concat(apiMetaResults.customCells);
  // Column order was being overwritten by the apiMetaResults.
  // This is an override to preserve the order as specified in the reducer.
  if (gridDataModel.toJS().columnOrder.length > 0) {
    gridProps.columnOrder = gridDataModel.toJS().columnOrder;
  }

  gridDataModel = gridDataModel
    .set('columns', gridProps.columns || [])
    .set('columnOrder', gridProps.columnOrder || [])
    .set('columnWidths', gridProps.columnWidths || [])
    .set('rows', payload.rows || [])
    .set('selected', [])
    .set('totalCount', apiMetaResults.totalCount || '')
    .set('chipFilters', chipFilters || [])
    .set('lastUpdated', apiMetaResults.resultTimestamp || '')
    .set('customFilteringExtensions', gridProps.customFilteringExtensions || [])
    .set('fetchingData', false)
    .set('fetchingDataError', false)
    .set('customCellTemplates', fromJS(customCellTemplates))
    .set('missingKeyColumn', apiMetaResults.gridProps.missingKeyColumn);

  apiMetaResultState = apiMetaResultState
    .setIn(['searchMeta', 'defaultChips'], chipFilters)
    .set('gridProps', gridProps);
  newState = newState.setIn([rootNode, 'apiMetaResults'], apiMetaResultState);
  newState = newState.setIn([rootNode, 'gridDataModel'], gridDataModel);
  newState = helpers.applyAllCookies(newState, rootNode);

  const columnWidths = newState.getIn([rootNode, 'gridDataModel', 'columnWidths']);
  const defaultColumnWidths = newState.getIn([rootNode, 'gridDataModel', 'defaultColumnWidths'], []);

  if (columnWidths.length === 0 && defaultColumnWidths.length === 0) {
    const defaultWidthFallback = gridProps.columns.map((col) => ({
      columnName: col.name,
      width: 150,
    }));
    newState = newState.setIn([rootNode, 'gridDataModel', 'columnWidths'], defaultWidthFallback);
  }

  if (common.debug.checkQueryStrFor('multiline') && gridDataModel.get('allowMultiLine')) {
    newState = newState.setIn([rootNode, 'gridDataModel', 'columns'], gridProps.multiLineColumns);
  }
  if (common.debug.checkQueryStrFor('viewstate')) {
    // TODO: seems I removed this functionality and it never broke.
    // common.debug.logAll([`${rootNode}.state from SearchFetchSuccess.`, newState.toJS()]);
  }

  // Set initial grid filters
  const initialGridFilters = newState.get(rootNode)
    .get('gridDataModel')
    .get('gridFilters', []);
  if (initialGridFilters.length > 0) {
    const initialChips = newState.getIn([rootNode, 'gridDataModel', 'chipFilters']);
    const initialSearchMeta = newState.getIn([rootNode, 'apiMetaResults', 'searchMeta']).toJS();
    const initialColumns = initialSearchMeta.columns;
    initialGridFilters.forEach((x: any) => {
      const newGridFilters = mapChipsToGridFilters(initialGridFilters, x);
      const newChipFilters = mapGridFiltersToChips(newGridFilters, initialColumns, initialChips);
      newState = newState.setIn([rootNode, 'gridDataModel', 'gridFilters'], newGridFilters);
      newState = newState.setIn([rootNode, 'gridDataModel', 'chipFilters'], newChipFilters);
    });
  }
  return newState;
};

export default SuccessHandler;
