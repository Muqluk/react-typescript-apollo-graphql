/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import AppliedFilterList from './applied-filters/applied-filter-list';
import EditFilterDialog from './edit-filters/edit-filters-dialog';

const filterList = (handleNewFilterClick: () => void) => (
  <IconButton aria-label="Filter list" onClick={handleNewFilterClick}>
    <FilterListIcon />
  </IconButton>
);

const containerCss = css`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;

export default class EnhancedFilter extends React.PureComponent<any, any> {
  state = {
    name: null,
    type: null,
    values: null,
    items: null,
    label: null,
    disableFilterSelection: false,
    dialogOpen: false,
  };

  handleEditFilter = (name: any) => {
    const { filters } = this.props;
    const filter = filters.find((x: any) => x.name === name);
    this.setState({
      name: filter.name,
      type: filter.type,
      values: filter.values,
      items: filter.items,
      label: filter.label,
      disableFilterSelection: true,
      dialogOpen: true,
    });
  };

  handleNewFilter = () => {
    this.setState({
      name: null,
      type: null,
      values: null,
      items: null,
      label: null,
      disableFilterSelection: false,
      dialogOpen: true,
    });
  };

  handleSelectedFilterChange = (name: any) => {
    const { filters } = this.props;
    const filter = filters.find((x: any) => x.name === name);
    this.setState({
      name: filter.name,
      type: filter.type,
      values: filter.values,
      items: filter.items,
      label: filter.label,
      disableFilterSelection: false,
      dialogOpen: true,
    });
  };

  handleValuesChange = (values: any) => {
    this.setState({ values });
  };

  handleCancel = () => {
    this.setState({ dialogOpen: false });
  };

  handleSave = () => {
    const { onUpdateFilter } = this.props;
    const { name, values } = this.state;
    // this really should just be an enable/disable save btn
    if (name && values) {
      const newValue = {
        columnName: name,
        value: values,
        operation: 'contains', // shouldn't be hard coded but thus far does not seem to matter.
      };
      onUpdateFilter(name, newValue);
      this.setState({ dialogOpen: false });
    }
  };

  renderAppliedFilters() {
    const {
      onUpdateFilter,
      filters,
      allowFiltering
    } = this.props;
    return (
      <AppliedFilterList
        filters={filters}
        allowFiltering={allowFiltering}
        onRemoveFilter={onUpdateFilter}
        onEditFilter={this.handleEditFilter} />
    );
  }

  renderEditFilter() {
    const { filters } = this.props;
    const {
      dialogOpen, name, type,
      values, items, label,
      disableFilterSelection,
    } = this.state;
    return (
      <EditFilterDialog
        filters={filters}
        open={dialogOpen}
        name={name}
        type={type}
        values={values}
        items={items}
        label={label}
        disableFilterSelection={disableFilterSelection}
        onCancel={this.handleCancel}
        onSave={this.handleSave}
        onSelectedFilterChange={this.handleSelectedFilterChange}
        onValuesChange={this.handleValuesChange} />
    );
  }

  render() {
    const { filters, allowFiltering } = this.props;
    if (filters && allowFiltering) {
      return (
        <div css={containerCss}>
          <div>
            {filterList(this.handleNewFilter)}
            {this.renderEditFilter()}
          </div>
          <div>
            {this.renderAppliedFilters()}
          </div>
        </div>
      );
    }
    return null;
  }
}
