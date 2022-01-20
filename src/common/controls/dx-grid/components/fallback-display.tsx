/**@jsx jsx */
import { jsx, css } from '@emotion/react';

const errorDisplayCss = css`
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FallbackDisplay = () => (
  <div css={errorDisplayCss}>
    <div>
      <h3><b>An error occurred while retrieving data.</b></h3>
    </div>
    <div>
      <h4>please refresh the page.</h4>
    </div>
  </div>
);

export default FallbackDisplay;
