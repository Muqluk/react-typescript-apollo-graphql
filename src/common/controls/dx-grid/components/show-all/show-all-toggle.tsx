import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ErrorWrapper from '@common/controls/error-wrapper';

const ShowAllToggle = (props: any) => {
  const {
    disabled,
    currentValue,
    onSliderChange,
    sliderOnMessage,
    sliderOffMessage,
  } = props;

  const getLabelText = () => (currentValue
    ? sliderOnMessage
    : sliderOffMessage);

  return (
    <ErrorWrapper>
      <div style={{ paddingLeft: '10px' }}>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Switch
                checked={currentValue}
                onChange={onSliderChange}
                value="hideSelected"
                color="primary"
                disabled={disabled} />
            )}
            label={getLabelText()} />
        </FormGroup>
      </div>
    </ErrorWrapper>
  );
};

export default ShowAllToggle;
