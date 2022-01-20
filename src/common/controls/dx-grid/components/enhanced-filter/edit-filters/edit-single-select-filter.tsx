import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from 'react-select';

const styles = (theme: any): any => ({
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const EditSingleSelectFilter = (props: any) => {
  const { items, onChange } = props;

  const selectionsUpdated = (selection: any) => {
    if (selection.value && selection.value.length >= 1) {
      onChange([selection.value]);
    }
  };

  const mappedItems = items.map((i: any) => ({ value: i.value, label: i.key }));

  return (
    <div style={{ height: '350px', width: '250px' }}>
      <Select
        name="colors"
        options={mappedItems}
        onChange={selectionsUpdated}
        classNamePrefix="select" />
    </div>
  );
};

export default withStyles(styles)(EditSingleSelectFilter);
