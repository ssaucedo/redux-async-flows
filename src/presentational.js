import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ConfirmationModal from "./components/Modal.js";
import Sidebar from "./components/Sidebar.js";
import { connect } from "react-redux";
import { userInteractions } from "./actions";
import { userFlow } from "./async/flows";

const UserFlow = props => {
  return (
    <div style={{
      padding: "3rem", width: '600px',
      height: '300px',
    }}>
      {!props.showItems &&
        < Button variant="contained" color="primary" onClick={() => {
          console.log('UserFlow');
          props.startFlow();
        }}>
          Start Flow
    </Button>
      }
      {
        props.showItems && (
          <div>
            {'Select Item'}
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
                onClick={() => props.selectItem('jeans')}
              >
                Jeans
          </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.selectItem('shirts')}
              >
                Shirts
          </Button>
            </div>
          </div>
        )
      }
      <ConfirmationModal
        open={props.isModalOpen}
        confirmation={props.confirmation}
      />
      <Sidebar
        open={props.isSidebarOpen}
        options={props.sidebarOptions}
        title={`Select ${props.selectedItem} color!`}
        selectOption={props.selectColor}
      />
    </div >
  );
};

UserFlow.propTypes = {
  startFlow: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  selectColor: PropTypes.func.isRequired,
  confirmation: PropTypes.func.isRequired,
  showItems: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  isSidebarOpen: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    showItems: state.items.show,
    isModalOpen: state.modal.open,
    isSidebarOpen: state.sidebar.open,
    isSidebarLoading: state.sidebar.loading,
    selectedItem: state.items.selected,
    sidebarOptions: state.data[state.items.selected] || [],
  };
};

const mapDispatchToProps = {
  startFlow: userFlow,
  selectItem: userInteractions.selectItem,
  selectColor: userInteractions.selectColor,
  confirmation: userInteractions.confirmation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFlow);
