/**@jsx jsx */
import { jsx } from '@emotion/react';
import { useGraphQlQuery } from '@common/hooks';
import DxGrid from '@common/controls/dx-grid';
import YglUser from '@domains/ygl-live/models/ygl-user';
import { CardBase, ICardContentComponent } from '../card-base/components/card-base';
import { AllYglUsers } from './graphql-queries/ygl-all-users';

const DatagridCard = ({
  height,
  width,
}: ICardContentComponent) => {
  const { loading, error, data } = useGraphQlQuery<YglUser[], any>(AllYglUsers, {});
  const onClose = () => { };

  const result = data ? data['AllYglUsers'] as YglUser[] : undefined; // eslint-disable-line
  const columns = result
    ? Object.keys(result[0]).map((key) => ({ name: key, title: key }))
    : undefined;

  return (
    <CardBase title="test" onClose={onClose}>
      <DxGrid
        rows={result}
        columns={columns}
        height={height}
        width={width}
        loading={loading}
        error={error} />
    </CardBase>
  );
};

export default DatagridCard;
