/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Header } from './header';
import { Routes } from './routes';

const layoutCss = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
`;

const Layout = () => (
  <div css={layoutCss}>
    <Header />
    <Routes />
  </div>
);

export default Layout;
