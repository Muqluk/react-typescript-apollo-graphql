import React from 'react';
import isEqual from 'date-fns/isEqual';
import Radio from '@material-ui/core/Radio';
import CustomDatePicker from 'src/common/components/custom-date-picker';

type TProps = {
  classes: any;
  values: any;
  onChange: (p1: any) => void;
};

type TState = {
  radioSelection: any;
};

class EditDateFilter extends React.Component<TProps, TState> {
  state = {
    radioSelection: null,
  };

  UNSAFE_componentWillMount() { // eslint-disable-line
    const { values } = this.props;
    if (values == null
      || (values[0]
        && values[1]
        && isEqual(values[0], values[1]))) {
      this.setState({ radioSelection: 'specific' });
    } else {
      this.setState({ radioSelection: 'range' });
    }
  }

  handleRadioChange = (event: any) => {
    const { onChange } = this.props;
    this.setState({ radioSelection: event.currentTarget.value });
    onChange(null);
  };

  handleBeginDateChange = (date: any) => {
    const { onChange, values } = this.props;
    const endDate = values ? values[1] : null;
    onChange([date, endDate]);
  };

  handleEndDateChange = (date: any) => {
    const { onChange, values } = this.props;
    const beginDate = values ? values[0] : null;
    onChange([beginDate, date]);
  };

  handleSpecificDateChange = (date: any) => {
    const { onChange } = this.props;
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    onChange([date, date]);
  };

  render() {
    const { values, classes } = this.props;
    const { radioSelection } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.toggleable}>
          <Radio
            checked={radioSelection === 'range'}
            onChange={this.handleRadioChange}
            value="range"
            name="radio button date"
            aria-label="Range"
            color="primary" />
          <CustomDatePicker
            label="Begin Date"
            keyboard
            autoOk
            value={radioSelection === 'range' && values ? values[0] : null}
            onChange={this.handleBeginDateChange}
            disabled={radioSelection !== 'range'} />
          <CustomDatePicker
            label="End Date"
            keyboard
            autoOk
            value={radioSelection === 'range' && values ? values[1] : null}
            onChange={this.handleEndDateChange}
            disabled={radioSelection !== 'range'} />
        </div>
        <div className={classes.toggleable}>
          <Radio
            checked={radioSelection === 'specific'}
            onChange={this.handleRadioChange}
            value="specific"
            name="radio button date"
            aria-label="Specific"
            color="primary" />
          <CustomDatePicker
            label="Specific Date"
            keyboard
            autoOk
            value={radioSelection === 'specific' && values ? values[0] : null}
            onChange={this.handleSpecificDateChange}
            disabled={radioSelection !== 'specific'} />
        </div>
      </div>
    );
  }
}

export default EditDateFilter;
