import React from 'react';
import isEqual from 'date-fns/isEqual';
import { getFormattedDate } from '@common/utilities/date-helper';
import AppliedFilter from './applied-filter';

const AppliedDateFilter = (props: any) => {
  const {
    filter,
    allowFiltering,
    onEditFilter,
    onRemoveFilter,
  } = props;

  const startDate = filter.values[0];
  const endDate = filter.values[1];

  let text;

  if (startDate === null) {
    text = `<= ${getFormattedDate(endDate)}`;
  } else if (endDate === null) {
    text = `>= ${getFormattedDate(startDate)}`;
  } else if (isEqual(startDate, endDate)) {
    text = `${getFormattedDate(startDate)}`;
  } else {
    text = `${getFormattedDate(startDate)} to ${getFormattedDate(endDate)}`;
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

export default AppliedDateFilter;

// AppliedDateFilter.propTypes = {
//   filter: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     values: PropTypes.array,
//   }),
//   allowFiltering: PropTypes.bool,
//   onEditFilter: PropTypes.func.isRequired,
//   onRemoveFilter: PropTypes.func.isRequired,
// };

// AppliedDateFilter.defaultProps = {
//   filter: {},
// };
