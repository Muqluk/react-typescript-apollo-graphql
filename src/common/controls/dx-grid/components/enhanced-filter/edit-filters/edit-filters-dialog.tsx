import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditFilter from './edit-filter';
import EditFilterList from './edit-filter-list';

const EditFilterDialog = (props: any) => {
  const {
    open,
    filters,
    name,
    type,
    values,
    items,
    label,
    disableFilterSelection,
    onCancel,
    onSelectedFilterChange,
    onValuesChange,
  } = props;

  const handleSave = () => {
    const { onSave } = props;
    onSave();
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const dialogProps = {
    onKeyPress: handleKeyPress,
    open,
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        Add/Modify Filter:
        {label}
      </DialogTitle>
      <DialogContent>
        <EditFilterList
          filters={filters}
          selectedFilterName={name}
          onChange={onSelectedFilterChange}
          disabled={disableFilterSelection} />
        {name
          && (
            <EditFilter
              type={type}
              values={values}
              columnSet={filters.filter((f: any) => f.name === name)[0].columnSet}
              items={items}
              onChange={onValuesChange} />
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFilterDialog;
