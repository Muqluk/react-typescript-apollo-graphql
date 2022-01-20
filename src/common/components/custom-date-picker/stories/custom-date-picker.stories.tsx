/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { Story as MetaStory, Meta } from '@storybook/react';

import { WithCanvasDecorator } from '@decorators/.';
import CustomDatePicker from '../index';

const wrapper = css`
  background: white;
  padding: 5px;
`;
export default {
  title: 'Application/common components/1 component needing refactored/CustomDatePicker/CustomDatePicker',
  component: CustomDatePicker,
  decorators: [(Story: MetaStory) => (
    <WithCanvasDecorator wrapper={wrapper}>
      <Story />
    </WithCanvasDecorator>
  )],
} as Meta;

const Template = (args: any) => (<CustomDatePicker {...args} />);

export const Default = Template.bind({});

Default.args = {
  onChange: () => { },
  value: null,
};
