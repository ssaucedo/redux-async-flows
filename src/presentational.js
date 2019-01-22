import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ConfirmationModal from "./components/Modal.jsx";
import TemporaryDrawer from "./components/Drawer";
import { connect } from "react-redux";
import { userInteractions } from "./actions";
import { userFlow } from "./flows";

const UserFlow = props => {
  console.log(props);
  return (
    <div style={{ padding: "1rem" }}>
      <Button variant="contained" color="primary" onClick={props.startFlow}>
        Start Flow
      </Button>
      {props.showCategories && (
        <div
          style={{
            display: "flex",
            padding: "1rem",
            justifyContent: "space-evenly"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={props.selectCategory}
          >
            Option One
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.selectCategory}
          >
            Option Two
          </Button>
        </div>
      )}
      <ConfirmationModal
        open={props.isModalOpen}
        confirmation={props.confirmation}
      />
      <TemporaryDrawer
        open={props.isSidebarOpen}
        selectOption={props.selectOption}
      />
    </div>
  );
};

UserFlow.propTypes = {
  startFlow: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectOption: PropTypes.func.isRequired,
  confirmation: PropTypes.func.isRequired,
  showCategories: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  isSidebarOpen: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    showCategories: state.categories.show,
    isModalOpen: state.modal.open,
    isSidebarOpen: state.sidebar.open
  };
};

const mapDispatchToProps = {
  startFlow: userFlow,
  selectCategory: userInteractions.selectCategory,
  selectOption: userInteractions.selectOption,
  confirmation: userInteractions.confirmation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFlow);
