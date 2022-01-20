/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import {
  Plugin,
  Template,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import ErrorWrapper from '@common/controls/error-wrapper';
// import DataStatusRefresh from '../DataStatusRefresh/DataStatusRefresh';

const container = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  height: 25px;
  max-height: 25px;
  padding: 5px 15px 0;
  border-top: 1px solid #DDD;
  align-items: center;
  justify-content: space-between;
`;
const rowInfo = css`
  display: flex;
  flexDirection: row;
  &>div {
    padding: 2px 10px;
  }
  user-select: none;
  font-size: 12,
`;

type TProps = {
  totalRowCount: number;
};

const GridFooter = (props: TProps) => {
  const {
    totalRowCount,
    // lastUpdated,
  } = props;

  return (
    <ErrorWrapper displayInWrapper={false}>
      <Plugin>
        <Template name="footer">
          <div css={container}>
            {/*
              <div>
                <DataStatusRefresh
                  refreshHandler={fetchAction}
                  lastUpdated={lastUpdated} />
              </div>
            */}
            <div css={rowInfo}>
              <div>{`Total Rows: ${totalRowCount}`}</div>
              <TemplateConnector>
                {({ rows: filteredRows }) => (<div>{`Visible Rows: ${filteredRows.length}`}</div>)}
              </TemplateConnector>
            </div>
          </div>
        </Template>
      </Plugin>
    </ErrorWrapper>
  );
};

export default GridFooter;
