import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Highlighter from "react-highlight-words";


// eslint-disable-next-line
import thunks from '!raw-loader!../thunks.js';
// eslint-disable-next-line
import flows from '!raw-loader!../flows.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: '#f8f8f2',

  },
  tabsIndicator: {
    backgroundColor: '#1890ff',

  },
  tabRoot: {
    height: '100%',
    textTransform: 'initial',
    minWidth: 72,
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {
    
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const fakeEditorStyles = {
      padding: '16px',
      color: '#f8f8f2',
      whiteSpace: 'pre',
      textAlign: 'left',
      background: '#282a36',
      fontWeight: 'lighter',
      lineHeight: '1.4',
      letterSpacing: '0.5px',
      flexGrow: '1',
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            centered
            value={value}
            onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Async Flows"
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Thunks"
            />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <div style={fakeEditorStyles}>
            <Highlighter
              highlightTag={({ children, highlightIndex }) => (
                <strong style={{ color: '#1890ff', fontWeight: 'lighter' }}>{children}</strong>
              )}
              searchWords={['take']}
              autoEscape={true}
              textToHighlight={flows}
            />,
        </div>}
        {value === 1 && <div style={fakeEditorStyles}>{thunks}</div>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);