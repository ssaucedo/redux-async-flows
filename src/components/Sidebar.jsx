import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  list: {
    width: 250
  }
};

const Sidebar = props => {
  const { open, selectOption, classes } = props;

  const sideList = (
    <div className={classes.list}>
      <List>
        {props.options.map((item, key) => (
          <ListItem key={key} button onClick={() => selectOption(item)}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
      <Drawer anchor="right" open={open} onClose={() => console.log("close")}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => console.log("close")}
          onKeyDown={() => console.log("close")}
        >
        <div>{props.title}</div>
          {sideList}
        </div>
      </Drawer>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  selectOption: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
};

export default withStyles(styles)(Sidebar);
