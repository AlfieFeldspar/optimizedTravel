import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAllNurses,
  fetchPatientPoints,
  fetchNurseById,
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
      startingRNCoords_lat: 35.996,
      startingRNCoords_lng: -78.9014,
    };
  }

  componentDidMount() {
    this.props.fetchAllNurses();
  }

  nameSelectHandler = (e) => {
    let integer_e = parseInt(e);
    let selectedNurseData = this.props.allNurses.find((nurse) => {
      return nurse.rn_Id === integer_e;
    });
    let rn_fullName =
      selectedNurseData.rnFirstName + " " + selectedNurseData.rnLastName;
    this.setState({
      active_rn_Id: selectedNurseData.rn_Id,
      active_rn_name: rn_fullName,
    });
  };

  departureSelectHandler = (e) => {
    // find nurse data
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
  };

  nurseAndLocationClickHandler = () => {
    // Make sure Id is an interger
    let integer_rn_Id = parseInt(this.state.active_rn_Id);
    // Fetch points for the nurse's patients - add to props
    this.props.fetchPatientPoints(integer_rn_Id);
    // ensure all props are back
    setTimeout(() => {
      console.log("timeout!");
      console.log(this.props.patientData);
    }, 1000);
    // pass selected nurse data through props
    console.log("nurseID", this.state.active_rn_Id);
    this.props.fetchNurseById(
      this.state.active_rn_Id,
    );
    setTimeout(() => {
      console.log("timeout!");
      console.log(this.props.oneNurseById);
    }, 1000);
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
          alignCenter
          title="Your name"
          id="dropdown-menu-align-center"
          className="ddform-name"
          onSelect={this.nameSelectHandler}
        >
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
          alignCenter
          title="Your starting location"
          id="dropdown-menu-align-center"
          className="ddform-start"
          onSelect={this.departureSelectHandler}
        >
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchAllNurses, fetchPatientPoints, fetchNurseById },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPage);
