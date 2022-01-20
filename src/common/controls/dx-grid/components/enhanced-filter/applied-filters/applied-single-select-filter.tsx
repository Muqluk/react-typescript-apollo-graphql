import React from 'react';
import AppliedFilter from './applied-filter';

const AppliedSingleSelectFilter = (props: any) => {
  const {
    filter,
    allowFiltering,
    onEditFilter,
    onRemoveFilter,
  } = props;

  let text = '';
  if (filter.values && filter.values[0]) {
    const item = filter.items.find((i: any) => i.value === filter.values[0]);
    text = item.key;
  }

  return (
    <AppliedFilter
      name={filter.name}
      label={filter.label}
      text={text}
      allowFiltering={allowFiltering}
      onEdit={onEditFilter}
      onRemove={onRemoveFilter} />
  );
};

export default AppliedSingleSelectFilter;
