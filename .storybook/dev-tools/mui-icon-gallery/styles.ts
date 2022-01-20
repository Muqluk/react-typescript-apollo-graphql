import { css } from '@emotion/react';

export default css`
  * {
    box-sizing: border-box;
  }

  .icon-gallery {
    width: 810px;
    padding: 5px 5px 10px 5px;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #DDD;
  }

  .icon-gallery__icon-search {
    width: 800px;
    margin: 0 0 10px;
    padding: 5px; 10px 20px 10px;
    background-color: #DDD;
  }
  .icon-gallery__icon-search-field {
    display: flex;
    flex: 1 1 auto;
  }

  .icon-gallery__gallery-container {
    height: 400px;
    width: 800px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 5px 0 5px 15px;
  }

  .icon-gallery__gallery-items {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
  }

  .icon-gallery__item {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 90px;
    padding: 5px 0;
    border: 1px solid black;
    background-color: white;
  }

  .icon-gallery__item--icon {
    font-size: 36px;
    border: 1px solid silver;
    padding: 3px;
    border-radius: 3px;
    // &:before {
    //   background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAAH0lEQVQY02OcxQADZ+AsJgYsYKgIsiD8YTJInEShIAA1NwKQeKc4/QAAAABJRU5ErkJggg==);
    //   opacity: .5;
    // }
  }

  .icon-gallery__item--name {
    margin-top: 10px;
    font-size: .8rem;
  }
`;

export const withCanvasWrapperCss = css`
  background-color: none;
`;
