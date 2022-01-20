import React from 'react';
import AppliedFilter from './applied-filter';

const AppliedNumericFilter = (props: any) => {
  const {
    filter,
    allowFiltering,
    onEditFilter,
    onRemoveFilter,
  } = props;

  const start = filter.values[0];
  const end = filter.values[1];

  let text;

  if (start === null) {
    text = `<= ${end}`;
  } else if (end === null) {
    text = `>= ${start}`;
  } else if (start === end) {
    text = start.toString();
  } else {
    text = `${start} to ${end}`;
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

export default AppliedNumericFilter;
