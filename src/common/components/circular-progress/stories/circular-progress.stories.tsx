import React from 'react';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/.';
import CircularProgress, { ProgressSpeed } from '../index';

const wrapper = {
  background: 'white',
  padding: '5px',
  height: '200px',
  width: '200px',
};

export default {
  title: 'Application/common components/CircularProgress/CircularProgress',
  component: CircularProgress,
  decorators: [(Story: MetaStory) => (
    <WithCanvasDecorator wrapper={wrapper}>
      <Story />
    </WithCanvasDecorator>
  )],
} as Meta;

const Template = (args: any) => (<CircularProgress {...args} />);

export const Default = Template.bind({});
export const SlowProgress = Template.bind({});
export const FastProgress = Template.bind({});

Default.args = {};
SlowProgress.args = { progressSpeed: ProgressSpeed.slow };
FastProgress.args = { progressSpeed: ProgressSpeed.fast };
