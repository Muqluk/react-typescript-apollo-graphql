import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SelectField from '@material-ui/core/Select';

class EditFilterList extends React.Component<any, any> {
  handleOnChange = (e: any) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const {
      filters,
      selectedFilterName,
      disabled,
      classes,
    } = this.props;

    const selectProps = {
      value: selectedFilterName || '',
      onChange: this.handleOnChange,
      disabled,
      inputProps: {
        name: 'Available Filters',
        id: 'select-filter-available-filters',
      },
    };

    if (!disabled) {
      const availableFilters = filters
        .filter((f: any) => f.label && (!f.values || f.name === selectedFilterName))
        .sort((a: any, b: any) => {
          if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
          if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
          return 0;
        })
        .map((x: any) => (<MenuItem key={x.name} value={x.name}>{x.label}</MenuItem>));
      return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-filter-available-filters">Available Filters</InputLabel>
          <SelectField {...selectProps}>
            {availableFilters}
          </SelectField>
        </FormControl>
      );
    }
    return null;
  }
}

// EditFilterList.defaultProps = {
//   disabled: false,
//   filters: [],
//   selectedFilterName: null,
// };

// EditFilterList.propTypes = {
//   classes: PropTypes.object,
//   filters: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string,
//     label: PropTypes.string,
//     type: PropTypes.string.isRequired,
//     values: PropTypes.array,
//   })),
//   selectedFilterName: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
// };

export default withStyles(() => ({
  formControl: {
    minWidth: 240,
  },
}))(EditFilterList);
