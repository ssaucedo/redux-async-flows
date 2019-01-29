import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from '@material-ui/core/CircularProgress';

const Sidebar = props => {
  const { open, selectOption } = props;

  const sideList = (
    <div style={{width: '90%',}}>
      <List>
        {props.options.map((item, key) => (
          <div style={{marginLeft: '1rem'}}>
          {item.label}
          <ListItem style={{ marginTop: '2px', backgroundColor: item.name, height: '4rem', marginBottom: '1rem' }} key={key} button onClick={() => selectOption(item)} />
          </div>
        ))}
      </List>
    </div>
  );

  return (
      <Drawer anchor="right" open={open} onClose={() => console.log("close")}>
        <div
          style={{ width: '300px', height: '100%', display: 'flex', flexDirection: 'column'}}
          tabIndex={0}
          role="button"
          onClick={() => console.log("close")}
          onKeyDown={() => console.log("close")}
        >
        <div style={{ textAlign: 'center', padding: '3rem'}}>{props.title}</div>
          {
            props.options.length === 0 ? <CircularProgress style={{ alignSelf: 'center'}} /> : sideList
          }
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

export default Sidebar;
