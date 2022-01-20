/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/optional/with-canvas-decorator';

import { GridLayoutToolbar } from '../grid-layout-toolbar';

const container = css`
  display: flex;
  flex: 1 1 auto;
  min-width: 500px;
  padding: 10px;
`;

const wrapper = css`
  display: flex;
  flex: 1 1 auto;
  min-width: 500px;
  background-color: white;
`;

export default {
  title: 'Grid Layout/components/Tool Bar',
  component: GridLayoutToolbar,
  decorators: [
    (Story: MetaStory) => (
      <WithCanvasDecorator container={container} wrapper={wrapper}>
        <Story />
      </WithCanvasDecorator>
    ),
  ],
} as Meta;

const Template = (args: any) => <GridLayoutToolbar {...args} />;

export const Toolbar = Template.bind({});
