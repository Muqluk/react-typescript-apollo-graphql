/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import GridLayout from '@common/controls/grid-layout/grid-layout';
import DatagridCard from '@common/controls/grid-layout/cards/data-grid-card';

const pageCss = css`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
`;

const YglUsers = () => {
  const layout = [
    {
      i: 'ygl',
      x: 1,
      y: 1,
      w: 12,
      h: 4,
      minW: 2,
      maxW: 12,
      Card: (props: any) => (<DatagridCard {...props} />),
      title: 'Ygl Users not in FamilyFile DB'
    },
    {
      i: 'familyfile',
      x: 6,
      y: 1,
      w: 12,
      h: 4,
      minW: 2,
      maxW: 12,
      Card: (props: any) => (<DatagridCard {...props} />),
      title: 'Family File Users'
    }];

  return (
    <div css={pageCss}>
      <GridLayout layout={layout} />
    </div>
  );
};

export default YglUsers;
