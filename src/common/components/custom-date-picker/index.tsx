/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const CustomDatePicker = (props: DatePickerProps) => {
  const restProps: DatePickerProps = {
    ...props,
    inputFormat: 'MM-dd-yyyy',
    renderInput: (params) => (
      <TextField {...params} />
    ),
    mask: '__-__-____',
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst css={inputCss}>
        <DatePicker {...restProps} />
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;

const inputCss = css`
  .MuiTextField-root {
    font-size: 9px !important;
    font-weight: 400;
    color: pink;
    line-height: 1.9;
  }
`;
