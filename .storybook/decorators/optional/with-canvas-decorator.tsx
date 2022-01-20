/**@jsx jsx */
import { css, jsx } from '@emotion/react';

const defaultStyle = {
  canvas: css`
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-sizing: bounding-box;
    background-image:
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAH0lEQVQY02OcxQADZ+AsJgYsYKgIsiD8YTJInEShIAA1NwKQeKc4/QAAAABJRU5ErkJggg==);
  `,
  container: css`
    padding: 50px 75px;
    min-width: 50px;
    box-sizing: bounding-box;
  `,
  wrapper: css`
    background-color: rgba(255, 255, 255, .2);
    border-radius: 5px;
    padding: 5px;
    box-sizing: bounding-box;
  `,
};

type Props = {
  canvas: Partial<typeof defaultStyle.canvas>,
  container: Partial<typeof defaultStyle.container>,
  wrapper: Partial<typeof defaultStyle.wrapper>,
  children: React.ReactNode
};

export const WithCanvasDecorator = (props: Props) => {
  const { children, canvas, container, wrapper } = props;
  const css = {
    canvas: {
      ...defaultStyle.canvas,
      ...canvas,
    },
    container: {
      ...defaultStyle.container,
      ...container,
    },
    wrapper: {
      ...defaultStyle.wrapper,
      ...wrapper,
    },
  };
  return (
    <div css={css.canvas}>
      <div css={css.container}>
        <div css={css.wrapper}>{children}</div>
      </div>
    </div>
  );
};

WithCanvasDecorator.defaultProps = {
  canvas: {},
  container: {},
  wrapper: {},
};
