import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

const SimpleModal = props => {
  const { open, confirmation, classes } = props;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={confirmation}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Operation Confirmation
          </Typography>
          <div
            style={{
              display: "flex",
              padding: "1rem",
              justifyContent: "space-evenly"
            }}
          >
            <Button onClick={confirmation} variant="contained" color="primary">
              Confirm
            </Button>
            <Button
              onClick={confirmation}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  confirmation: PropTypes.func
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
