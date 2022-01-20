/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { useGraphQlQuery } from '@common/hooks';
import CircularProgress, { ProgressSpeed } from '@common/components/circular-progress';
import DxGrid from '@common/controls/dx-grid';
import { ICardContentComponent } from '@common/controls/grid-layout/components/grid-content-card/grid-content-card';

import Query from '../graphql/query/ygl-users-not-in-ff-db';
import YglUser from '../models/ygl-user';

const spinner = css`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default ({ height, width }: ICardContentComponent) => {
  const { loading, error, data } = useGraphQlQuery<YglUser[], any>(Query, {});

  if (loading) {
    return (
      <div css={spinner}>
        <CircularProgress size={72} progressSpeed={ProgressSpeed.fast} />
      </div>
    );
  }

  if (data) {
    // eslint-disable-next-line
    const result: YglUser[] = data['YglUsersNotInFamilyFileDb'] as YglUser[];
    const columns = Object.keys(result[0]).map((key) => ({ name: key, title: key }));
    return (
      <DxGrid
        rows={result}
        columns={columns}
        height={height}
        width={width} />
    );
  }

  if (error) {
    return (
      <div className="err-output">
        <pre>{error?.message}</pre>
      </div>
    );
  }

  return null;
};
