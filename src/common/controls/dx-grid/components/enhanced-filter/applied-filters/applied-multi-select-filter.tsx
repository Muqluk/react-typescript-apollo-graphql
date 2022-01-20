import React from 'react';
import AppliedFilter from './applied-filter';

const AppliedMultiSelectFilter = (props: any) => {
  const {
    filter,
    allowFiltering,
    onEditFilter,
    onRemoveFilter,
  } = props;

  let text = '';
  if (filter.values) {
    filter.items.sort((x, y) => x.key > y.key).forEach((i) => {
      const value = filter.values.find((v) => v === i.value);
      if (value) {
        text = `${text}, ${i.key}`;
      }
    });

    if (text.length > 0) {
      text = text.substring(1, text.length);
    }
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

export default AppliedMultiSelectFilter;
