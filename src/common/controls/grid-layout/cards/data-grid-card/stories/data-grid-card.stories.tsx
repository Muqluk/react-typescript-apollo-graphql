/**@jsx jsx */
/* eslint-disable */
import { css, jsx } from '@emotion/react';
import Chance from 'chance';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/.';
import { AllYglUsers } from '../graphql-queries/ygl-all-users';
import YglUser from '@domains/ygl-live/models/ygl-user';
import DatagridCard from '..';

const containerCss = css`
  margin: 45px;
  height: 60vw;
  max-height: 400px;
  width: 80vw;
  max-width: 600px;
`;

const wrapperCss = css`
  display: block;
  height: 60vw;
  max-height: 400px;
  width: 80vw;
  max-width: 600px;
`;

const chance = new Chance();

const getMockUsers = (min: number = 15, max: number = 150): YglUser[] => {
  const getMockUser = (): YglUser => (
    {
      username: chance.name(),
      userId: chance.integer({ min: 0, max: 100000 }),
      userRoleId: 1,
      status: 0,
      role: chance.profession(),
      mgr: chance.name(),
      email: chance.email(),
      hiredate: chance.date(),
      termdate: chance.date(),
      userCreatedOn: chance.date(),
      startDate: chance.date(),
      transferDate: chance.date(),
    });

  const mockUsers: YglUser[] = [];
  const uBound = chance.integer({ min: 15, max: 150 });
  for (let i: number = 0; i < uBound; i++) {
    mockUsers.push(getMockUser());
  };
  return mockUsers;
}

export default {
  title: 'Grid Layout/Cards/Datagrid Card/Datagrid Card',
  component: DatagridCard,
  decorators: [(Story: MetaStory) => (
    <WithCanvasDecorator container={containerCss} wrapper={wrapperCss}>
      <Story />
    </WithCanvasDecorator>
  )],
} as Meta;

const Template = (args: any) => (<DatagridCard {...args} />);

export const NoData = Template.bind({});
export const QueryResults = Template.bind({});
export const Error = Template.bind({});

NoData.args = {};
QueryResults.args = {};
Error.args = {};

const empty: Partial<YglUser>[] = [{}];

NoData.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1e21,
        request: {
          query: AllYglUsers,
        },
        result: {
          data: {
            AllYglUsers: empty,
          },
        },
      },
    ],
  },
};

QueryResults.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: AllYglUsers,
        },
        result: {
          data: {
            AllYglUsers: getMockUsers(),
          },
        },
      },
    ],
  },
};

Error.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: AllYglUsers,
        },
        error: new Error('This is a mock network error'),
      },
    ],
  },
};
