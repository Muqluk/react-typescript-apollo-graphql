/**@jsx jsx */
/**@jsxFrag React.Fragment */
import React, {
  JSXElementConstructor,
  useRef,
} from 'react';
import { jsx, css } from '@emotion/react';
import { useResize } from '@common/hooks';
import { CardTitleBarBase } from './card-title-bar';

type TContentCard = {
  title: string;
  ContentComponent?: JSXElementConstructor<ICardContentComponent>;
  onClose: () => void;
  children?: React.ReactNode | undefined;
};

export interface ICardContentComponent {
  height: number;
  width: number;
}

export const CardBase = ({
  ContentComponent,
  title,
  onClose,
  children,
}: TContentCard) => {
  const target = useRef(null);
  const size = useResize(target);

  const renderContent = () => {
    if (ContentComponent) {
      return (
        <ContentComponent
          height={size?.height}
          width={size?.width} />
      );
    }

    if (children) {
      const childProps: ICardContentComponent = {
        height: size?.height,
        width: size?.width,
      };
      const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, childProps);
        }
        return child;
      });

      return (<>{childrenWithProps}</>);
    }

    return (
      <div className="grid-card__content-container no-content-message">
        <span>Missing Content Component</span>
      </div>
    );
  };

  return (
    <div css={cardCss} ref={target}>
      <CardTitleBarBase title={title} onClose={onClose} />
      <div className="grid-card__content-container">
        {renderContent()}
      </div>
    </div>
  );
};

const cardCss = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-width: 400px;
  min-height: 200px;
  background-color: white;
  border-radius: 5px;
  .grid-card__content-container {
    display: flex;
    flex: 1 1 auto;
    margin: 5px;
  }
  .no-content-message {
    justify-content: center;
    font-size: 13px;
    color: red;
  }
`;
