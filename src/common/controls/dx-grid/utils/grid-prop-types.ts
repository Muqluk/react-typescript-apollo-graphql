import {
  array,
  arrayOf,
  bool,
  func,
  node,
  number,
  oneOf,
  oneOfType,
  object,
  shape,
  string
} from 'prop-types';
import { GridPage } from '../reducer-utilities/grid-option-presets';

const baseChip = {
  label: string.isRequired,
  name: string.isRequired,
};

const chipItem = shape({
  key: oneOfType([number, string, bool]).isRequired,
  value: oneOfType([number, string, bool]).isRequired,
});

const dateChip = shape({
  ...baseChip,
  // type: 'date',
  // values: shape([
  //   instanceof(Date),
  //   instanceof(Date),
  // ]),
});

const multiSelectChip = shape({
  ...baseChip,
  items: arrayOf(chipItem),
  // type: 'multiSelect',
  values: arrayOf(string),
});

const numericChip = shape({
  ...baseChip,
  // type: 'numeric',
  // values: shape([number, number]),
});

const textChip = shape({
  ...baseChip,
  // type: 'text',
  values: arrayOf(string),
});

export const chipFilter = oneOfType([dateChip, multiSelectChip, numericChip, textChip]);

export const column = shape({
  name: string.isRequired,
  title: oneOfType([node, string]),
});

export const columnWidth = shape({
  columnName: string.isRequired,
  width: number.isRequired,
});

export const customFilteringExtension = shape({
  columnName: string.isRequired,
  predicate: func.isRequired,
});

export const defaultGroupByColumn = shape({
  columnName: string.isRequired,
});

export const defaultSortColumn = shape({
  columnName: string.isRequired,
  direction: oneOf(['asc', 'desc']),
});

export const gridFilter = shape({
  columnName: string.isRequired,
  operation: oneOf(['contains']).isRequired, // flesh out later with other options.
  // eslint-disable-next-line
  value: array.isRequired, // fill in better later.
});

export const columnExtension = shape({
  columnName: string.isRequired,
  width: number,
  align: oneOf(['center', 'left', 'right']),
  wordWrapEnabled: bool,
});

export const customCellTemplate = shape({
  ColumnReplaced: string.isRequired,
  props: object, // eslint-disable-line
  templateComponent: node.isRequired, // define this better later.
});

export const DxGridProps = () => ({
  classes: object,
  gridDataModel: {
    allowMultiLine: bool,
    chipFilters: arrayOf(chipFilter),
    columns: arrayOf(column).isRequired,
    columnOrder: arrayOf(string),
    columnWidths: arrayOf(columnWidth),
    customCellTemplates: arrayOf(customCellTemplate),
    customFilteringExtensions: arrayOf(customFilteringExtension),
    defaultGroupByColumns: arrayOf(defaultGroupByColumn),
    defaultSortColumns: arrayOf(defaultSortColumn),
    fetchingData: bool.isRequired,
    fetchingDataError: oneOf([false, string]).isRequired,
    gridFilters: arrayOf(gridFilter),
    gridHeight: number,
    gridOpts: object, // fill in later.
    groupByColumns: arrayOf(string),
    groupSummaryItems: array,
    hiddenColumns: arrayOf(string),
    hideSelected: bool,
    lastUpdated: string,
    onRowClick: func,
    rows: arrayOf(object),
    selected: array,
    showExport: bool,
    singleLineDisplay: bool,
    tableColumnExtensions: arrayOf(columnExtension),
    theme: func,
    totalCount: number,
    totalSummaryItems: arrayOf(object),
  },
  fetchAction: func,
  changeGridStateAction: func,
  requestCsvExportAction: func,
});

export const DxGridDefaultProps = {
  classes: {},
  gridDataModel: {
    allowMultiLine: false,
    chipFilters: [],
    columnOrder: [],
    columnWidths: [],
    customCellTemplates: [],
    customFilteringExtensions: [],
    defaultGroupByColumns: [],
    defaultSortColumns: [],
    gridHeight: 600,
    gridFilters: [],
    gridOpts: GridPage,
    groupByColumns: [],
    groupSummaryItems: [],
    hiddenColumns: [],
    hideSelected: false,
    lastUpdated: '',
    onRowClick: () => { },
    selected: [],
    rows: [],
    showExport: false,
    singleLineDisplay: true,
    tableColumnExtensions: [],
    theme: () => ({}),
    totalCount: 0,
    totalSummaryItems: [],
  },
  fetchAction: () => { },
  changeGridStateAction: (p1: any) => { }, // eslint-disable-line
  requestCsvExportAction: () => { },
};
