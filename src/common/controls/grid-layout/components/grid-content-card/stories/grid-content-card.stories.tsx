/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Story as MetaStory, Meta } from '@storybook/react';
import { WithCanvasDecorator } from '@decorators/optional/with-canvas-decorator';

import { ContentCard } from '../grid-content-card';

const container = css`
  margin: 25px;
  background: white;
`;

export default {
  title: 'Grid Layout/components/Content Card',
  component: ContentCard,
  decorators: [
    (Story: MetaStory) => (
      <WithCanvasDecorator container={container}>
        <Story />
      </WithCanvasDecorator>
    ),
  ],
} as Meta;

const ContentComponent = () => (<div>content</div>);

const Template = () => <ContentCard ContentComponent={ContentComponent} />;

export const BasicLayout = Template.bind({});
