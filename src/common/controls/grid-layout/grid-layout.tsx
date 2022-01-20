/** @jsx jsx */
import {
  JSXElementConstructor,
  useRef,
} from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import ErrorWrapper from '@common/controls/error-wrapper';
import { jsx, css } from '@emotion/react';
import { useResize } from '@common/hooks';
import { ContentCard, ICardContentComponent } from './components/grid-content-card/grid-content-card';
import { GridLayoutToolbar } from './components/grid-layout-toolbar/grid-layout-toolbar';

import './react-grid-layout.scss';
import './react-resizable.scss';

export type TLayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  maxW: number;
  static?: boolean;
  Card: JSXElementConstructor<ICardContentComponent>;
  title: string;
};

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

type TGridLayoutProps = {
  autoSize?: boolean;
  margin?: [number, number];
  containerPadding?: [number, number];
  cols?: number;
  rowHeight?: number;
  compactType?: 'vertical' | 'horizontal' | null;
  resizeHandles?: ResizeHandle[] | undefined;
  isBounded?: boolean;
  preventCollision?: boolean;
  showToolbar?: boolean;
  onLayoutChange?(layout: TLayoutItem[]): void;
  layout?: TLayoutItem[];
};

export default ({
  autoSize = false,
  margin = [3, 25],
  containerPadding = [5, 5],
  cols = 12,
  rowHeight = 75,
  compactType = null,
  resizeHandles = ['se'],
  isBounded = false,
  preventCollision = false,
  showToolbar = false,
  onLayoutChange,
  layout = [],
}: TGridLayoutProps) => {
  const target = useRef(null);
  const size = useResize(target);
  const layoutChangedHandler = (newLayout: Layout[]) => console.log(newLayout); // eslint-disable-line

  return (
    <div css={gridContainer} ref={target}>
      {showToolbar && (<GridLayoutToolbar />)}
      <ErrorWrapper displayInWrapper>
        <GridLayout
          autoSize={autoSize}
          width={size?.width || 250}
          margin={margin}
          containerPadding={containerPadding}
          cols={cols}
          rowHeight={rowHeight}
          compactType={compactType}
          resizeHandles={resizeHandles}
          isBounded={isBounded}
          preventCollision={preventCollision}
          onLayoutChange={onLayoutChange || layoutChangedHandler}
          layout={layout}>
          {layout.map((card) => (
            <div css={cardContainer} key={card.i}>
              <ContentCard
                ContentComponent={card.Card}
                title={card.title}
                key={card.i} />
            </div>
          ))}
        </GridLayout>
      </ErrorWrapper>
    </div>
  );
};

const gridContainer = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  background: inherit;
`;

const cardContainer = css`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, .2);
  border: 1px solid #999;
  white-space: wrap;
`;
