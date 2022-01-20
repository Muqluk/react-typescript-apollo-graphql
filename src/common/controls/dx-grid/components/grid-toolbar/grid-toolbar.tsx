/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import EnhancedFilter from '../enhanced-filter';

const MenuItemTemplate = React.memo(
  (
    opts: Partial<{
      onClick: () => void,
      style: any,
      label: any,
    }>
  ) => (
    <MenuItem {...opts}>{opts.label}</MenuItem>
  )
);

const toolBarContainer = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

const flexStyle = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  align-self: center;
  width: 100%;
  min-width: 100%;
  justify-content: space-between;
`;

const groupingPanelCss = css`
  height: 50px;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
  min-width: 100%;
  justify-content: space-between;
`;

// type TProps = {
//   emitGridChange: (event: any, values: any) => void;
//   missingKeyColumn: boolean;
//   selected: number;
//   hideSelected: boolean;
//   hideShowToggle: boolean;
// };

/*
// explore this crazy later.
  const toolbarTempProps = {
    allowMultiLine: true,
    singleLineDisplay: true,
    fetchAction: () => { },
    hideSelected: true,
    emitGridChange: () => { },
    allowFiltering: true,
    filters: [],
    showFilters: true,
    numSelected: 0,
    onUpdateFilter: () => { },
    chipFilters: [],
    // classes,
    columnOrder: [],
    columnWidths: [],
    defaultColumnWidths: [],
    gridOpts: {},
    hiddenColumns: [],
    lastUpdated: new Date(),
    selected: 0,
    visibleRowCount: 100,
  }
  */

type TState = {
  anchorEl: any
  menuOpen: boolean;
  showGridOpts: boolean;
};

class GridToolbar extends React.Component<any, TState> {
  state = {
    anchorEl: undefined,
    menuOpen: false,
    showGridOpts: false,
  };

  toggleGridOptionsBar = () => {
    this.setState((previousState) => ({ showGridOpts: !previousState.showGridOpts }));
  };

  menuShow = (e: any) => {
    this.setState({ menuOpen: true, anchorEl: e.currentTarget });
  };

  menuHide = () => {
    setTimeout(() => { this.setState({ menuOpen: false }); }, 100);
  };

  renderMenu() {
    const { anchorEl, menuOpen, showGridOpts } = this.state;
    const label = showGridOpts ? 'Hide' : 'Show';
    return (
      <IconButton onClick={this.menuShow}>
        <MoreVertIcon />
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onMouseUp={this.menuHide}
          onClose={this.menuHide}>
          <MenuItemTemplate onClick={this.toggleGridOptionsBar} label={`${label} Grouping`} />
          <Divider />
        </Menu>
      </IconButton>
    );
  }

  renderGridOptionsbar() {
    const { showGridOpts } = this.state;
    return showGridOpts
      ? (
        <div css={groupingPanelCss}>
          <TemplatePlaceholder />
        </div>
      )
      : null;
  }

  render() {
    return (
      <Plugin>
        <Template name="toolbarContent">
          <div css={toolBarContainer}>
            <div css={flexStyle}>
              <div>
                <EnhancedFilter {...this.props} />
              </div>
              <div>
                {this.renderMenu()}
              </div>
            </div>
            <div>
              {this.renderGridOptionsbar()}
            </div>
          </div>
        </Template>
      </Plugin>
    );
  }
}

export default GridToolbar;
