/*
  eslint-disable
    react/destructuring-assignment,
    react/no-access-state-in-setstate,
    react/no-array-index-key,
*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

// const styles = () => ({
//   root: {
//     width: 300,
//     maxWidth: 360,
//   },
//   sortItem: {
//     zIndex: 9900,
//   },
// });

type TProps = {
  columnDefs: any[];
  onApply: (p1: any) => void;
  open: any;
  onClose: any;
  classes: any
};

type Tchecked = {
  name: string;
  value: any;
};

type TState = {
  columnDefs: any[];
  checked: Tchecked[];
};

class EditColumnsDialog extends React.Component<TProps, TState> {
  UNSAFE_componentWillMount() { // eslint-disable-line
    const { columnDefs } = this.props;
    const items = [...columnDefs.sort((a: any, b: any) => a.sequence - b.sequence)];
    this.setState({ columnDefs: items });

    const checked = [...columnDefs.filter((x: any) => x.isShowing).map((x) => x.name)];
    this.setState({ checked });
  }

  onSortEnd = ({ oldIndex, newIndex }: { oldIndex: any, newIndex: any }) => {
    const newDefs = arrayMove(this.state.columnDefs, oldIndex, newIndex);
    this.setState({
      columnDefs: newDefs,
    });
  };

  handleToggle = (event: any, value: any) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  handleOnApply = () => {
    const currentCols = [...this.state.columnDefs];
    const columnDefs = currentCols.map((x, index) => Object.assign(x, {
      sequence: index,
      isShowing: this.state.checked.indexOf(x.name) !== -1
    }));

    this.props.onApply(columnDefs);
  };

  render() {
    const { open, onClose, classes } = this.props;

    const SortableItem = SortableElement(({ value }: any) => (
      <ListItem
        dense
        button
        key={`editCol_${value.name}`}
        onClick={(event: any) => this.handleToggle(event, value.name)}>
        {value.alwaysShow
          && (
            <FormControlLabel
              disabled
              control={<Checkbox checked value="checkValue" />}
              label="" />
          )}
        {!value.alwaysShow
          && (
            <Checkbox
              checked={this.state.checked.indexOf(value.name) !== -1}
              tabIndex={-1}
              disableRipple />
          )}
        <ListItemText primary={value.label} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Move">
            <DragHandleIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    const SortableList = SortableContainer(({ items }: any) => (
      <List>
        {items.map((item: any, index: any) => (
          <SortableItem
            key={`colItem-${index}-${item.name}`}
            index={index}
            value={item} />
        ))}
      </List>
    ));

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}>
        <DialogTitle>Columns</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Divider />
            <SortableList
              items={this.state.columnDefs}
              onSortEnd={this.onSortEnd}
              lockToContainerEdges
              hideSortableGhost
              helperClass={classes.sortItem} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOnApply} color="primary">
            Apply
          </Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditColumnsDialog;
