/*
  eslint-disable
    object-curly-newline,
*/
import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';

const getCellEvent = (
  e: any,
  { tableRow: { rowId } }: any
) => Object.assign(e, { target: Object.assign(e.target, { value: rowId }) });

export const cellComponentHandler = (restProps: any, passedProps: any) => {
  const { cellTemplates, customCells, emitGridChange } = passedProps;
  const { column } = restProps;
  if (customCells.includes(column.name)) {
    const { Template, cellProps, cellEvents, templateProps } = cellTemplates[column.name];
    let finalProps = {};
    const events = {};

    if (cellEvents) {
      Object.keys(cellEvents).forEach((evt) => {
        events[evt] = (e) => cellEvents[evt](getCellEvent(e, restProps))(restProps);
      });
    }
    // TODO: JWL - examine this.  seems like an awful lot of props... are all needed?
    finalProps = {
      emitGridChange,
      ...cellProps,
      ...restProps,
      ...templateProps,
      ...events,
    };

    return (
      <Table.Cell>
        <Template {...finalProps} />
      </Table.Cell>
    );
  }
  return (<Table.Cell {...restProps} />);
};

export const rowComponentHandler = (props: any, onRowClick: any, classes: any) => (
  <Table.Row
    classes={classes}
    onClick={(e: any) => onRowClick(e, props.row)}
    {...props} />
);
