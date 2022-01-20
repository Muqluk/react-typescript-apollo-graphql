/** @jsx jsx */
import { useEffect, useState } from 'react';
import MuiCircularProgress from '@mui/material/CircularProgress';
import { jsx, css } from '@emotion/react';

const container = css`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export enum ProgressSpeed {
  slow = 20,
  default = 10,
  fast,
}

type TProps = {
  progressSpeed?: ProgressSpeed;
  size: number | string;

};

const CircularProgress = ({
  progressSpeed = ProgressSpeed.default,
  size = 50,
}: TProps) => {
  let timer: ReturnType<typeof setTimeout>;
  const [completed, setComplete] = useState<number>(0);
  const setProgess = () => setComplete(completed >= 100 ? 0 : completed + 1);

  useEffect(() => {
    timer = setInterval(setProgess, progressSpeed); // page-load
    return () => clearInterval(timer); // cleanup
  });

  if (progressSpeed === ProgressSpeed.fast) {
    return (
      <div css={container}>
        <MuiCircularProgress size={size} />
      </div>
    );
  }

  return (
    <div css={container}>
      <MuiCircularProgress
        size={size}
        variant="determinate"
        value={completed} />
    </div>
  );
};

export default CircularProgress;
