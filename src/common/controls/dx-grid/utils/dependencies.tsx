/*
  eslint-disable react/destructuring-assignment,
*/
import React from 'react';

import {
  FilteringState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSelection,
  IntegratedSorting,
  SelectionState,
  SortingState,
} from '@devexpress/dx-react-grid';

import { DragDropProvider } from '@devexpress/dx-react-grid-material-ui';

export const Dependencies = (props: any) => ([
  <SortingState key={0} />,
  <FilteringState
    filters={props.gridFilters}
    // onFiltersChange={(e) => props.action.emitGridChange('gridFilters', e)}
    key={1} />,
  <GroupingState
    grouping={props.groupByColumns}
    // onGroupingChange={(e) => props.action.emitGridChange('groupByColumns', e)}
    key={2} />,
  <SelectionState
    //onSelectionChange={props.action.toggleSelection}
    key={3} />,
  <IntegratedSorting key={4} />,
  <IntegratedFiltering
    // columnExtensions={props.customFilteringExtensions}
    key={5} />,
  <IntegratedGrouping key={6} />,
  <IntegratedSelection key={7} />,
  <DragDropProvider key={8} />,
]);
