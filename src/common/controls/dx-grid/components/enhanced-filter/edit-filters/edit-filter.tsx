import React from 'react';
import EditDateFilter from './edit-date-filter';
import EditTextFilter from './edit-text-filter';
import EditNumericFilter from './edit-numeric-filter';
import EditSingleSelectFilter from './edit-single-select-filter';
import EditMultiSelectFilter from './edit-multi-select-filter';

const filterType = {
  text: (props: any) => (<EditTextFilter {...props} />),
  date: (props: any) => (<EditDateFilter {...props} />),
  numeric: (props: any) => (<EditNumericFilter {...props} />),
  singleSelect: (props: any) => (<EditSingleSelectFilter {...props} />),
  multiSelect: (props: any) => (<EditMultiSelectFilter {...props} />),
};

const EditFilter = (props: any) => {
  const { type, classes } = props;
  return (
    <div className={classes.root}>
      {filterType[type](props)}
    </div>
  );
};

export default EditFilter;
