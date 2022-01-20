/**@jsx jsx */
/**@jsxFrag React.Fragment */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';

import {
  Grid as DxGrid,
  VirtualTable,
  Table,
  TableColumnReordering,
  Toolbar,
  GroupingPanel,
  TableGroupRow,
  TableHeaderRow,
  TableColumnVisibility,
  ColumnChooser,
  DragDropProvider,
  TableColumnResizing,
  TableFilterRow,
  // TableSelection,
  // TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import {
  Filter,
  FilteringState,
  Grouping,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSelection,
  IntegratedSorting,
  SelectionState,
  SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';

import ErrorWrapper from '@common/controls/error-wrapper';
import GridToolbar from './components/grid-toolbar/grid-toolbar';
import GridFooter from './components/grid-footer/grid-footer';
import { GridLoader } from './components/grid-loader';
/*
  https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/

  Grouping Panel Docs
  https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grouping-panel/

  Filtering docs
  https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/integrated-filtering/
  https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/filtering-state/
*/
const rowComponentHandler = (rowProps: React.PropsWithChildren<Table.DataRowProps>) => {
  const rowClick = (e: any) => {
    /* eslint-disable no-console */
    console.log(e);
    console.log(rowProps.row);
    /* eslint-enable */
  };

  return (
    <Table.Row
      // classes={classes}
      onClick={rowClick}
      {...rowProps} />
  );
};

const cellComponentHandler = (
  restProps: any,
  // cellChangedHandler: () => void
) => (<Table.Cell {...restProps} />);

const NoDataMessage = (props: Partial<{ height: number }>) => {
  const { height } = props;
  console.log(props); // eslint-disable-line
  return (
    <div
      style={{ height }}
      css={emptyMessageCss}>
      No data to display
    </div>
  );
};
// here only for development/debugging purposes
// const GridContainerComponent = (props: Partial<{ children: React.ReactChildren }>) => {
//   const { children } = props;
//   console.log(props); // eslint-disable-line
//   return (<>{children}</>);
// };

export interface TProps {
  rows: any[];
  columns: any[];
  height: number;
  width: number;
}

export const Grid = ({
  rows = [],
  columns = [],
  height = 350,
  width = 500,
}: TProps) => {
  const [hiddenColumns, setHiddenColumns] = useState<string[]>();
  const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((col) => (col.title)));
  const [groupByColumns, setGroupByColumns] = useState<Grouping[]>();
  const [columnWidths, setColumnWidths] = useState<TableColumnWidthInfo[]>();
  const [selection, setSelection] = useState<(number | string)[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const action = {
    // TODO: this code block is being replaced over time.
    emitGridChange: (event: any, values: any) => {
      // eslint-disable-next-line
      console.log(event, values);
      // changeGridStateAction({ event, values });
    },
    toggleSelection: (indexes: any) => action.emitGridChange('selected', indexes),
  };

  const bubblePrevention = (e: any) => {
    e.stopPropagation();
  };

  // const cellChangedHandler = () => { // eslint-disable-line
  //   console.log('cellChangedHandler Fired'); // eslint-disable-line
  // };

  return (
    <div style={{ width, backgroundColor: 'white' }} onMouseDown={bubblePrevention}>
      <ErrorWrapper displayInWrapper={false}>
        <DxGrid rows={rows} columns={columns}>
          <SortingState key={0} />
          <FilteringState
            columnFilteringEnabled
            defaultFilters={[]}
            filters={filters}
            onFiltersChange={setFilters} />
          <GroupingState
            grouping={groupByColumns}
            onGroupingChange={setGroupByColumns} />
          <SelectionState selection={selection} onSelectionChange={setSelection} />
          <IntegratedSorting />
          <IntegratedFiltering />
          <IntegratedGrouping />
          <IntegratedSelection />
          <DragDropProvider />
          <VirtualTable
            // for use in extending the grid - reference only for now.
            // containerComponent={(props: any) => <GridContainerComponent {...props} />}
            cellComponent={(cellProps) => cellComponentHandler(cellProps)}
            rowComponent={(rowProps) => rowComponentHandler(rowProps)}
            height={height - 125} />
          <TableColumnResizing
            columnWidths={columnWidths}
            defaultColumnWidths={columns.map((col) => ({ columnName: col.name, width: 200 }))}
            onColumnWidthsChange={setColumnWidths} />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder} />
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumns}
            emptyMessageComponent={(props: any) => <NoDataMessage height={height} {...props} />}
            onHiddenColumnNamesChange={setHiddenColumns} />
          <Toolbar />
          <GroupingPanel showSortingControls showGroupingControls />
          <TableGroupRow showColumnsWhenGrouped={false} />
          <GridToolbar
            hideShowToggle={false}
            selected={0}
            hideSelected
            missingKeyColumn={false}
            emitGridChange={action.emitGridChange} />
          <ColumnChooser />
          <GridFooter totalRowCount={rows.length} />
          <TableHeaderRow
            // rowComponent={(allprops: Table.DataRowProps) => (<Table.Row {...allprops} />)}
            showSortingControls />
          <TableFilterRow />
        </DxGrid>
      </ErrorWrapper>
    </div>
  );
};

export default GridLoader(Grid);

const emptyMessageCss = css`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;
