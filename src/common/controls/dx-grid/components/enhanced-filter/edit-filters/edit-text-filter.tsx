import React from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';

const EditTextFilter = (props: any) => {
  const { values, onChange, columnSet } = props;
  if (columnSet) {
    const selectionsUpdated = (selection: any) => {
      if (selection.value && selection.value.length >= 1) {
        onChange([selection.value]);
      }
    };
    const mappedItems = columnSet.map((i) => ({ value: i, label: i }));
    return (
      <div style={{ height: '350px', width: '250px' }}>
        <Select
          name="colors"
          options={mappedItems}
          onChange={selectionsUpdated}
          classNamePrefix="select" />
      </div>
    );
  }
  return (
    <TextField
      required
      autoFocus
      id="filter"
      label="Text"
      margin="normal"
      value={values ? values[0] : ''}
      onChange={(event) => onChange([event.target.value])} />
  );
};

export default EditTextFilter;
