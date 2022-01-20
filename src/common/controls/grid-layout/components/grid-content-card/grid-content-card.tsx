/** @jsx jsx */
import {
  JSXElementConstructor,
  useRef,
} from 'react';
import { jsx, css } from '@emotion/react';

import { useResize } from '@common/hooks';

const cardCss = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-width: 200px;
`;

export const ContentCard = ({
  ContentComponent,
  title = 'Unamed Card'
}: TContentCard) => {
  const target = useRef(null);
  const size = useResize(target);
  return (
    <div css={cardCss} ref={target}>
      {ContentComponent && (
        <ContentComponent
          title={title}
          height={size?.height}
          width={size?.width} />
      )}
      {!ContentComponent && ('Missing Content Component')}
    </div>
  );
};

type TContentCard = {
  title?: string | undefined;
  ContentComponent: JSXElementConstructor<ICardContentComponent>;
};

export type ICardContentComponent = {
  height: number;
  width: number;
  title?: string;
};
