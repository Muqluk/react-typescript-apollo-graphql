/* eslint-disable  max-len */
import React from 'react';

import {
  TableHeaderRow,
  TableColumnReordering,
  TableColumnResizing,
  ColumnChooser,
  Table,
  TableColumnVisibility,
  Toolbar,
  TableGroupRow,
  GroupingPanel,
  TableSelection,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import common from './standard-helpers';

import GridToolbar from '../components/grid-toolbar/grid-toolbar';
import GridFooter from '../components/grid-footer/grid-footer';

export const OptionalComponentThemes = {
  GridPage: {
    toolbar: true,
    footer: true,
    sortable: true,
    grouping: true,
    columnselect: true,
    rowSelect: true,
  },
  GridCardView: {
    defaultOrdering: true,
  },
};

export const OptionalComponentsBuilder = (props: any) => {
  const {
    allowMultiLine,
    chipFilters,
    classes,
    columnOrder,
    columnWidths,
    defaultColumnWidths,
    emitGridChange,
    fetchAction,
    gridOpts,
    hideSelected,
    hiddenColumns,
    // lastUpdated,
    leftColumns,
    missingKeyColumn,
    requestCsvExportAction,
    rightColumns,
    selected,
    singleLineDisplay,
    showExport,
    // visibleRowCount,
  } = props;

  const toolbarProps = {
    allowMultiLine,
    singleLineDisplay,
    fetchAction,
    hideSelected,
    requestCsvExportAction,
    emitGridChange,
    allowFiltering: true,
    filters: chipFilters,
    showFilters: true,
    showExport,
    missingKeyColumn,
    numSelected: common.isDefined(selected) && (selected.length) ? selected.length : 0,
    onUpdateFilter: (name: any, values: any) => {
      if (values) {
        emitGridChange('chipFilters', values);
      } else {
        emitGridChange('chipFilters', { columnName: name, value: values });
      }
    },
    ...props,
  };

  const footerProps = {
    fetchAction,
    totalRowCount: props.totalCount !== '' ? props.totalCount : 0,
  };

  /*
    TODO:  This entire section is a slow-motion train wreck in progress
            needs refactored at the earliest opportunity.
  */
  const renderOptionalComponents = () => {
    const components = new Set();
    const options = {
      columnResize: { order: 0, component: <TableColumnResizing columnWidths={columnWidths} defaultColumnWidths={defaultColumnWidths} onColumnWidthsChange={(e) => { emitGridChange('columnWidths', e); }} key={0} /> },
      // columnNoResize: { order: 0, component: <TableColumnResizing columnWidths={columnWidths} defaultColumnWidths={defaultColumnWidths} tableColumnResizingEnabled={false} key={0} /> },
      columnReorder: { order: 1, component: <TableColumnReordering order={columnOrder} onOrderChange={(e) => { emitGridChange('columnOrder', e); }} key={1} /> },
      columnNoReorder: { order: 1, component: <TableColumnReordering defaultOrder={columnOrder} key={1} /> },
      columnVisibility: { order: 2, component: <TableColumnVisibility hiddenColumnNames={hiddenColumns} onHiddenColumnNamesChange={(e) => { emitGridChange('hiddenColumns', e); }} key={2} /> },
      hiddenColumns: { order: 2, component: <TableColumnVisibility hiddenColumnNames={hiddenColumns} columnTogglingEnabled={false} key={2} /> },
      rowSelect: { order: 3, component: <TableSelection showSelectAll key={3} /> },
      toolbar: { order: 4, component: <Toolbar key={4} /> },

      grouping: { order: 5, component: <GroupingPanel key={5} /> },
      groupRow: { order: 6, component: <TableGroupRow showColumnsWhenGrouped key={6} /> },

      customToolbar: { order: 7, component: <GridToolbar {...toolbarProps} key={7} /> },
      columnselect: { order: 8, component: <ColumnChooser key={8} /> },
      footer: { order: 9, component: <GridFooter {...footerProps} key={9} /> },
      headerRow: { order: 10, component: (<TableHeaderRow showSortingControls key={10} rowComponent={(allprops: Table.DataRowProps) => (<Table.Row classes={classes} {...allprops} />)} />) },
      headerNoSort: { order: 11, component: (<TableHeaderRow key={11} rowComponent={(allprops: Table.DataRowProps) => (<Table.Row classes={classes} {...allprops} />)} />) },
      fixedColumns: { order: 12, component: (<TableFixedColumns key={12} leftColumns={leftColumns} rightColumns={rightColumns} />) },
    };

    const getComponentsWithDeps = {
      toolbar: [options.customToolbar, options.toolbar],
      footer: [options.footer],
      sortable: [options.headerRow],
      gridHeader: [options.headerRow],
      grouping: [options.grouping, options.groupRow, options.toolbar, options.customToolbar],
      columnselect: [options.toolbar, options.columnVisibility, options.columnselect],
      columnReorder: [options.columnReorder, options.headerRow],
      columnResize: [options.columnResize, options.headerRow],
      rowSelect: [options.rowSelect],
      columnHeadingsOnly: [options.headerNoSort, options.columnNoResize, options.columnVisibility, options.fixedColumns],
      detailView: [options.headerNoSort, options.hiddenColumns, options.columnNoResize, options.fixedColumns],
      detailViewSortable: [options.headerRow, options.hiddenColumns, options.columnNoResize, options.fixedColumns],
    };

    Object.keys(gridOpts)
      .filter((x: any) => gridOpts[x])
      .map((option: any) => getComponentsWithDeps[option].forEach((c: any) => components.add(c)));

    return Array.from(components)
      .sort((a: any, b: any) => (a.order > b.order ? 1 : -1))
      .map((c: any) => (c.component));
  };
  return renderOptionalComponents();
};
