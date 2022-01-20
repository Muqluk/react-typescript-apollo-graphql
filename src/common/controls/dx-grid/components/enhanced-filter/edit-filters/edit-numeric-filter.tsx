import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

const styles = (theme: any) => ({
  root: {
    flextGrow: 1,
    margintop: 30,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EditNumericFilter extends React.Component<any, any> {
  state = {
    radioSelection: null,
  };

  UNSAFE_componentWillMount() { // eslint-disable-line
    const { values } = this.props;
    if (values == null
      || (values[0]
        && values[1]
        && values[0] === values[1])) {
      this.setState({ radioSelection: 'specific' });
    } else {
      this.setState({ radioSelection: 'range' });
    }
  }

  isNumber = (value: any) => (/^[-+]?\d*\.?\d*$/.test(value));

  handleRadioChange = (event: any) => {
    const { onChange } = this.props;
    this.setState({ radioSelection: event.currentTarget.value });
    onChange(null);
  };

  handleBeginNumberChange = (value: any) => {
    if (this.isNumber(value)) {
      const { onChange, values } = this.props;
      const endNumber = values ? values[1] : null;
      onChange([Number(value), endNumber]);
    }
  };

  handleEndNumberChange = (value: any) => {
    if (this.isNumber(value)) {
      const { onChange, values } = this.props;
      const beginNumber = values ? values[0] : null;
      onChange([beginNumber, Number(value)]);
    }
  };

  handleSpecificNumberChange = (value: any) => {
    if (this.isNumber(value)) {
      const { onChange } = this.props;
      onChange([Number(value), Number(value)]);
    }
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
            name="radio button number"
            aria-label="Range"
            color="primary" />
          <TextField
            id="beginNumber"
            label="Begin Numeric"
            className={classes.textField}
            margin="normal"
            value={radioSelection === 'range' && values && values[0] ? values[0] : ''}
            disabled={radioSelection === 'specific'}
            onChange={(event) => this.handleBeginNumberChange(event.target.value)} />
          <TextField
            id="endNumber"
            label="End Numeric"
            className={classes.textField}
            margin="normal"
            value={radioSelection === 'range' && values && values[1] ? values[1] : ''}
            disabled={radioSelection === 'specific'}
            onChange={(event) => this.handleEndNumberChange(event.target.value)} />
        </div>
        <div className={classes.toggleable}>
          <Radio
            checked={radioSelection === 'specific'}
            onChange={this.handleRadioChange}
            value="specific"
            name="radio button number"
            aria-label="Specific"
            color="primary" />
          <TextField
            id="specificNumber"
            label="Specific Numeric"
            className={classes.textField}
            margin="normal"
            value={radioSelection === 'specific' && values && values[0] ? values[0] : ''}
            disabled={radioSelection === 'range'}
            onChange={(event) => this.handleSpecificNumberChange(event.target.value)} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EditNumericFilter);
