import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  list: {
    width: 250
  }
};

const TemporaryDrawer = props => {
  const { open, selectOption, classes } = props;

  const sideList = (
    <div className={classes.list}>
      <List>
        {["Option 1", "Option 2", "Option 3"].map((item, key) => (
          <ListItem key={key} button onClick={selectOption}>
            {item}
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
          {sideList}
        </div>
      </Drawer>
  );
};

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  selectOption: PropTypes.func
};

export default withStyles(styles)(TemporaryDrawer);
