import React from 'react';
import Chip from '@material-ui/core/Chip';

const AppliedFilter = (props: any) => {
  const {
    name,
    label,
    text,
    allowFiltering,
    onEdit,
    onRemove,
    isReadOnly,
  } = props;

  if (allowFiltering) {
    return (
      <Chip
        onClick={!isReadOnly ? () => onEdit(name) : () => { }}
        onDelete={() => onRemove(name, null)}
        label={`${label} : ${text}`} />
    );
  }

  return (
    <Chip label={`[${label}] : ${text}`} />);
};

export default AppliedFilter;
