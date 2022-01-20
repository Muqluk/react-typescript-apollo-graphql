import React from 'react';
import AppliedDateFilter from './applied-date-filter';
import AppliedTextFilter from './applied-text-filter';
import AppliedNumericFilter from './applied-numeric-filter';
import AppliedSingleSelectFilter from './applied-single-select-filter';
import AppliedMultiSelectFilter from './applied-multi-select-filter';

const root = {
  root: {
    flexGrow: 1,
    paddingTop: 8,
  },
};

const filterTypeHandler: any = [];

filterTypeHandler.text = (filter: any, handlers: any, idx: any) => (
  <AppliedTextFilter
    key={idx}
    filter={filter}
    {...handlers} />
);

filterTypeHandler.date = (filter: any, handlers: any, idx: any) => (
  <AppliedDateFilter
    key={idx}
    filter={filter}
    {...handlers} />
);

filterTypeHandler.numeric = (filter: any, handlers: any, idx: any) => (
  <AppliedNumericFilter
    key={idx}
    filter={filter}
    {...handlers} />
);

filterTypeHandler.singleSelect = (filter: any, handlers: any, idx: any) => (
  <AppliedSingleSelectFilter
    key={idx}
    filter={filter}
    {...handlers} />
);

filterTypeHandler.multiSelect = (filter: any, handlers: any, idx: any) => (
  <AppliedMultiSelectFilter
    key={idx}
    filter={filter}
    {...handlers} />
);

const AppliedFilterList = (props: any) => {
  const {
    filters,
    allowFiltering,
    onRemoveFilter,
    onEditFilter,
  } = props;

  const handlers = {
    allowFiltering,
    onRemoveFilter,
    onEditFilter,
  };

  if (filters) {
    return (
      <div css={root}>
        <div>
          {
            filters.filter((x: any) => x.values)
              .sort((y: any, z: any) => y.label > z.label)
              .map((f: any, idx: any) => filterTypeHandler[f.type](f, handlers, idx))
          }
        </div>
      </div>
    );
  }

  return null;
};

export default AppliedFilterList;

// AppliedFilterList.propTypes = {
//   classes: PropTypes.object.isRequired,
//   filters: PropTypes.array,
//   allowFiltering: PropTypes.bool,
//   onEditFilter: PropTypes.func,
//   onRemoveFilter: PropTypes.func,
// };

// export default withStyles(styles)(AppliedFilterList);
