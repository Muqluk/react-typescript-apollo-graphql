/* eslint-disable no-console, dot-notation */
const resetChips = (chips: any[]) => chips.map((chip: any) => ({
  ...chip,
  values: null,
}));

const filterGridRows = (rows: any[], gridFilters: any[]) => {
  let rtnRows = rows;
  gridFilters.forEach((filter: any) => {
    rtnRows = rtnRows.filter(
      (row: any) => row[filter.columnName]
        && row[filter.columnName].toLowerCase().startsWith(filter.value[0].toLowerCase())
    );
  });
  return rtnRows;
};

const searchBuilder = {
  power: (props: any) => {
    const chips: any = [];
    const gridFilters: any = [];
    const chipsIndex = {};
    const { chipFilters, filters } = props;

    chipFilters.forEach((c: any) => {
      const chip = c;
      chips.push(chip);
      chipsIndex[chip.name.toLowerCase()] = chips.length - 1;
    });

    filters.forEach((filter: any) => {
      try {
        const chip = chips[chipsIndex[filter.name.toLowerCase()]];
        const value = filter.values.value
          ? [filter.values.value]
          : [filter.values];
        chip.values = value;

        gridFilters.push({
          columnName: chip.name,
          value,
          operation: 'contains',
        });
      } catch (ex) {
        // TODO: JWL - 20 Mar 2019
        //    The following console.vomit([]) would probably be better placed in the DetailGridView
        //    a sanity check on incoming properties, so it doesn't just check during power searches.
        // eslint-disable no-console
        console.log('error in ExternalFilterHandler.searchBuilder:');
        console.log(`\twith message :: ${ex.message}`);
        console.log('\tlocal vars:');
        console.log(`\t\tfilter.name: ${filter.name}`);
        console.log(`\t\tchipsIndex[filter.name]: ${chipsIndex[filter.name.toLowerCase()]}`);
        console.log('it is likely the powersearchCard config is providing an invalid filter.');
        console.log('\tcompare the card.gridCfg.{FieldName}.filter matches the desired gridDataModel.columns[0].name');
        // eslint-enable
      }
    });

    return { gridFilters, chipFilters: chips };
  },
  global: (props: any) => {
    const { chipFilters, filters, gcCols } = props;

    const globalChipFilter = {
      name: '__filterCol__', // <-- this is a gotcha, paired with below...
      label: 'Global Search',
      type: 'text',
      isReadOnly: true,
      values: [filters.values],
    };

    chipFilters.push(globalChipFilter);

    const gridFilters = [{
      columnName: '__globalFilterCol__', // <-- this is a gotcha, paired with above...
      value: { cols: gcCols, seek: filters.values },
      operation: 'any',
    }];

    return { gridFilters, chipFilters };
  },
};

const ExternalFilterHandler = (opts: any) => {
  const { state, rootNode, payload: { filters, resultCb } } = opts;
  let newState = state;
  if (filters) {
    const gridMeta = newState.getIn([rootNode, 'apiMetaResults']);
    let gridDataModel = newState.getIn([rootNode, 'gridDataModel']);
    const keyColumn = gridMeta.get('gridProps').keyColumns[0] || [];
    const chipFilters = resetChips(gridDataModel.toJS().chipFilters);
    const gcCols = gridMeta.get('searchMeta').get('globalSearchCols', []).toJS();
    const rows = gridDataModel.get('rows');

    const globalPredicate = gridDataModel.get('customFilteringExtensions')
      .filter((cfe: any) => cfe.columnName === '__globalFilterCol__')[0].predicate;

    if (keyColumn) {
      let builtFilters = {};
      const props = {
        resultCb, filters, rows, chipFilters, keyColumn, gcCols
      };
      let filteredResult = [];

      if (filters.name && filters.name === 'global') {
        builtFilters = searchBuilder.global(props);
        filteredResult = rows
          .filter((row: any) => globalPredicate(null, builtFilters['gridFilters'][0], row));
      } else {
        builtFilters = searchBuilder.power(props);
        filteredResult = filterGridRows(rows, builtFilters['gridFilters']);
      }

      resultCb(filteredResult);

      if (filteredResult.length > 0) {
        gridDataModel = gridDataModel
          .set('gridFilters', builtFilters['gridFilters'])
          .set('chipFilters', builtFilters['chipFilters']);
      }
      newState = newState.setIn([rootNode, 'gridDataModel'], gridDataModel);
    }
  }
  return newState;
};

export default ExternalFilterHandler;
