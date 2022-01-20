/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/.';
import { CardBase } from '../card-base';

export default {
  title: 'Grid Layout/Cards/components/Card Base',
  component: CardBase,
  decorators: [(Story: MetaStory) => (
    <WithCanvasDecorator>
      <Story />
    </WithCanvasDecorator>
  )]
} as Meta;

const Template = (args: any) => (<CardBase {...args} />);

export const Base = Template.bind({});
export const Title = Template.bind({});

Base.args = {};
Title.args = {
  title: 'Sample Card',
  ContentComponent: () => (<div>Hello</div>),
};
