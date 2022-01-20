/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { JSXElementConstructor } from 'react';
import * as icon from '@material-ui/icons';

export const withIconExplorerDecorator = ({ children }) => {
  const GetIcon = (Icon: JSXElementConstructor<any>, name: string) => (
    <div css={iconContainer}>
      <Icon fontSize="large" />
      <span>{name}</span>
    </div>
  );

  return (
    <div>
      <div>
        {children}
      </div>
      <div css={iconGalleryContainer}>
        <div css={iconGallery}>
          {Object.keys(icon).map((Icon, idx: any) => (
            <div key={idx}>
              {GetIcon(icon[Icon], Icon)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const iconGalleryContainer = css`
  display: flex;
  flex: 1 1 auto;
  height: 200px;
  overflow: hidden;
  overflow: auto;
`;

const iconGallery = css`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
`;

const iconContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 75px;
  font-size: 12px;
  border: 1px solid black;
`;

