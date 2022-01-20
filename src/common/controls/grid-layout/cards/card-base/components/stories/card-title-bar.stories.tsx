/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/optional/with-canvas-decorator';
import { CardTitleBarBase } from '../index';

const wrapperCss = css`
  box-sizing: border-box;
  padding: 25px;
  // width: 200px;
  border-radius: 5px;
  background-color: white;
  // background-color: rgba(255, 255, 255, .65);
`;

export default {
  title: 'Grid Layout/Cards/components/Title Bar',
  component: CardTitleBarBase,
  decorators: [(Story: MetaStory) => (
    <WithCanvasDecorator wrapper={wrapperCss}>
      <Story />
    </WithCanvasDecorator>
  )],
} as Meta;

const Template = (args: any) => (<CardTitleBarBase {...args} />);

export const TitleBar = Template.bind({});
export const WithTitle = Template.bind({});

WithTitle.args = {
  title: 'Sample Grid Card',
  onClose: () => { }
};
