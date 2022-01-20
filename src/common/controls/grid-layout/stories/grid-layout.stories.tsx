/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/optional/with-canvas-decorator';

import GridLayout, { TLayoutItem } from '../grid-layout';

export default {
  title: 'Grid Layout',
  component: GridLayout,
  decorators: [
    (Story: MetaStory) => (
      <WithCanvasDecorator
        container={containerCss}
        wrapper={wrapperCss}>
        <Story />
      </WithCanvasDecorator>
    ),
  ],
} as Meta;

const Template = (args: any) => <GridLayout {...args} />;

export const BasicLayout = Template.bind({});

BasicLayout.args = {
  autoSize: false,
  margin: [3, 25],
  containerPadding: [5, 5],
  cols: 12,
  rowHeight: 75,
  compactType: null,
  resizeHandles: ['se'],
  isBounded: false,
  preventCollision: false,
  onLayoutChange: (newLayout: TLayoutItem[]) => newLayout,
  layout: [
    {
      i: 'a',
      x: 0,
      y: 0,
      w: 4,
      h: 1,
      title: '',
      Card: () => (
        <div css={exampleCardCss}>
          Static Card (no dragging, no resizing)
        </div>
      ),
      static: true,
    },
    {
      i: 'b',
      x: 1,
      y: 0,
      w: 3,
      h: 2,
      minW: 1,
      maxW: 4,
      minH: 1,
      maxH: 2,
      title: '',
      Card: () => (<div css={exampleCardCss}>Min and Max dimensions</div>),
    },
    {
      i: 'c',
      x: 8,
      y: 3,
      w: 3,
      h: 1,
      title: '',
      Card: () => (<div css={exampleCardCss}>movable, resizable card</div>),
    },
    {
      i: 'd',
      x: 5,
      y: 3,
      w: 1,
      h: 1,
      title: '',
      Card: () => (<div css={exampleCardCss}>1 x 1</div>),
    }
  ]
};

const containerCss = css`
  margin: 50px;
  width: 800px;
  height: 600px;
`;

const wrapperCss = css`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  background-color: white;
`;

const exampleCardCss = css`
  display: flex;
  height: 100%;
  flex-wrap: wrap;
`;
