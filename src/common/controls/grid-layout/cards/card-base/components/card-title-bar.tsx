/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { MouseEvent } from 'react';

type TProps = {
  title?: string | undefined;
  onClose: (event: MouseEvent<any>) => void;
};

export const CardTitleBarBase = ({ title = '', onClose }: TProps) => (
  <div css={defaultCss}>
    <div className="grid-card__titlebar-left segment">
      <span>{title}</span>
    </div>
    <div className="grid-card__titlebar-center segment">
      &nbsp;
    </div>
    <div className="grid-card__titlebar-right segment">
      <div className="grid-card__titlebar__controlbox--close-button">
        <IconButton
          onClick={onClose}
          disableRipple>
          <Clear />
        </IconButton>
      </div>
    </div>
  </div>
);

const defaultCss = css`
  display: flex;
  // flex: 1 1 auto;
  align-items: center;
  padding: 0 5px;
  background: #0047AB;
  color: white;
  font-weight: 400;
  font-size: 14px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 25px;
  min-height: 25px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  .segment {
    display: flex;
    margin: 0 2px 0 5px;
  }
  .grid-card__titlebar-left {

  }
  .grid-card__titlebar-center {
    flex: 1 1 auto;
  }
  .grid-card__titlebar-right {
    margin-right: -2px;
  }

  .grid-card__titlebar__controlbox--close-button {
    background-color: white;
    margin: 2px 0;
    border-radius: 3px;
  }

  .MuiButtonBase-root {
    padding: 0;
    color: #0047AB;
    border-radius: 0;
    &:hover {
      background-color: transparent;
    }
    .MuiIconButton-label:active {
      background-color: #999;
    }
  }
  svg {
    font-size: 1.2rem;
  }
`;
