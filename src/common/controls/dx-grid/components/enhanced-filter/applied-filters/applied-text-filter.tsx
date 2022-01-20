import React from 'react';
import AppliedFilter from './applied-filter';

const AppliedTextFilter = ({
  filter,
  allowFiltering,
  onEditFilter,
  onRemoveFilter,
}: any) => (
  <AppliedFilter
    name={filter.name}
    label={filter.label}
    text={filter.values[0].toString()}
    allowFiltering={allowFiltering}
    onEdit={onEditFilter}
    onRemove={onRemoveFilter}
    isReadOnly={filter.isReadOnly} />
);

export default AppliedTextFilter;
