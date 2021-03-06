import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAllNurses,
  fetchPatientPoints,
  fetchNurseById,
  sendNurseStartingCoords,
} from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

class LaunchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_rn_Id: null,
      active_rn_name: "",
      startingLocation: "",
      startingRNCoords_lat: null,
      startingRNCoords_lng: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllNurses();
  }

  // Handler for the name dropdown. e=dropdown value, entered as rn_Id
  nameSelectHandler = (e) => {
    let integer_e = parseInt(e);
    // Find the active nurse by Id
    let selectedNurseData = this.props.allNurses.find((nurse) => {
      return nurse.rn_Id === integer_e;
    });
    // Concatenate name for display
    let rn_fullName =
      selectedNurseData.rnFirstName + " " + selectedNurseData.rnLastName;
    // set Id and name to local state
    this.setState({
      active_rn_Id: selectedNurseData.rn_Id,
      active_rn_name: rn_fullName,
    });
  };

  // Handler for the starting location dropdown
  departureSelectHandler = (e) => {
    // find nurse data again
    let selectedNurseData = this.props.allNurses.find((nurse) => {
      return nurse.rn_Id === this.state.active_rn_Id;
    });
    // set state according to Home or Office starting point
    if (e === "Home") {
      this.setState({
        startingLocation: e,
        startingRNCoords_lat: selectedNurseData.rnHomeLat,
        startingRNCoords_lng: selectedNurseData.rnHomeLng,
      });
    } else if (e === "Office") {
      this.setState({
        startingLocation: e,
        startingRNCoords_lat: selectedNurseData.rnOfficeLat,
        startingRNCoords_lng: selectedNurseData.rnOfficeLng,
      });
    }
    setTimeout(() => {
      this.props.sendNurseStartingCoords(
        this.state.startingRNCoords_lng,
        this.state.startingRNCoords_lat,
        this.state.startingLocation
      );
    }, 10);
  };
  // Handler for "click to load patients"
  nurseAndLocationClickHandler = () => {
    // Make sure active_rn_Id is an interger
    let integer_rn_Id = parseInt(this.state.active_rn_Id);
    // Fetch points for the nurse's patients - add to props
    this.props.fetchPatientPoints(integer_rn_Id);
    // Fetch patients for the active nurse
    this.props.fetchNurseById(this.state.active_rn_Id);

    // Route to the map and table
    this.props.history.push("/app");
  };

  render() {
    return (
      <div id="LaunchPage" className="my-launch-page">
        <div className="launch-title">
          Traveling Nurse Route Planner - Welcome!
        </div>
        <DropdownButton
          aligncenter="true"
          title="Your name"
          id="dropdown-menu-align-center"
          className="ddform-name"
          onSelect={this.nameSelectHandler}
        >
          {/* HARDCODED FOR NOW */}
          <Dropdown.Item eventKey="1">Margo Beasley</Dropdown.Item>
          <Dropdown.Item eventKey="2">Elizabeth Jennings</Dropdown.Item>
          <Dropdown.Item eventKey="3">Mark Jones</Dropdown.Item>
          <Dropdown.Item eventKey="4">Stephen Kimmel</Dropdown.Item>
          <Dropdown.Item eventKey="5">Wendy Rhodes</Dropdown.Item>
          <Dropdown.Item eventKey="6">Philip Thorpe</Dropdown.Item>
        </DropdownButton>
        <p>
          <b className="name-textbox">{this.state.active_rn_name}</b>
        </p>

        <DropdownButton
          aligncenter="true"
          title="Your starting location"
          id="dropdown-menu-align-center"
          className="ddform-start"
          onSelect={this.departureSelectHandler}
        >
          {/* HARDCODED FOR NOW */}
          <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
          <Dropdown.Item eventKey="Office">Office</Dropdown.Item>
        </DropdownButton>
        <p>
          <b className="location-textbox">{this.state.startingLocation}</b>
        </p>
        <Button
          variant="success"
          className="nurse-location-button"
          onClick={this.nurseAndLocationClickHandler}
        >
          Click to load patients
        </Button>
        {/* The image footer */}
        <footer className="LaunchFooter">
          <div className="empty-container"></div>
          <div className="launch-image"></div>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allNurses: state.allNurses,
    patientData: state.patientData,
    oneNurseById: state.oneNurseById,
    nurseCoords: state.nurseCoords,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllNurses,
      fetchPatientPoints,
      fetchNurseById,
      sendNurseStartingCoords,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPage);
