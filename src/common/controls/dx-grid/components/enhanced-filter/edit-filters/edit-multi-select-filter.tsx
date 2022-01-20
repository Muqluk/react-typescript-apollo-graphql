import React from 'react';
import Select from 'react-select';

const EditMultiSelectFilter = (props: any) => {
  const { values, items, onChange } = props;
  const mappedValues = values
    ? values.map((i: any) => ({ value: i, label: i }))
    : [];

  const mappedItems = items.map((i: any) => ({ value: i.key, label: i.value }));

  const selectionsUpdated = (selections: any) => {
    onChange(selections.map((item: any) => (item.value)));
  };

  return (
    <div style={{ height: '350px', width: '250px' }}>
      <Select
        defaultValue={mappedValues}
        isMulti
        name="colors"
        options={mappedItems}
        onChange={selectionsUpdated}
        className="basic-multi-select"
        classNamePrefix="select" />
    </div>
  );
};

export default EditMultiSelectFilter;
