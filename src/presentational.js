import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ConfirmationModal from "./components/Modal.jsx";
import Sidebar from "./components/Sidebar";
import { connect } from "react-redux";
import { userInteractions } from "./actions";
import { userFlow } from "./flows";

/**
 * const codeSandboxURL = "https://codesandbox.io/s/5x2p6j4n6n";
 <a href={codeSandboxURL}>
    {"Go to code sandbox"}
  </a>  
 */

const UserFlow = props => {
  console.log(props.sidebarOptions);
  return (
    <div style={{ padding: "3rem" }}>
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
            onClick={() => props.selectCategory('flights')}
          >
            Flights
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => props.selectCategory('hotels')}
          >
            Hotels
          </Button>
        </div>
      )}
      <ConfirmationModal
        open={props.isModalOpen}
        confirmation={props.confirmation}
      />
      <Sidebar
        open={props.isSidebarOpen}
        options={props.sidebarOptions}
        title={`Select ${props.selectedCategory}`}
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
  console.log(state.data)
  return {
    showCategories: state.categories.show,
    isModalOpen: state.modal.open,
    isSidebarOpen: state.sidebar.open,
    isSidebarLoading: state.sidebar.loading,
    selectedCategory: state.categories.selected,
    sidebarOptions: state.data[state.categories.selected] || [],
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
