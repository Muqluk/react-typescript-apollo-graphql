/* eslint-disable */
/**@jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import CircularProgress, { ProgressSpeed } from '@common/components/circular-progress';
import FallbackDisplay from './fallback-display';

const spinner = css`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface IDxGridProps {
  rows?: any[];
  columns?: any[];
  height: number;
  width: number;
  loading?: boolean;
  error?: any | undefined;
}

export const GridLoader = <TProps extends object>(
  DxGrid: React.JSXElementConstructor<TProps>
) => {
  return class GridLoaderInternal extends React.Component<IDxGridProps> { // eslint-disable-line
    render() {
      const { rows, loading, error } = this.props;
      if (error) {
        return <FallbackDisplay />;
      }
      if (loading || !rows) {
        return (
          <div css={spinner}>
            <CircularProgress size={72} progressSpeed={ProgressSpeed.fast} />
          </div>
        )
      }

      return (<DxGrid {...this.props as TProps} />);
    }
  }
};
