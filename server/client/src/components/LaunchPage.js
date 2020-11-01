import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllNurses } from "../actions/index";
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
    }
  }
  
  componentDidMount() {
    this.props.fetchAllNurses();
  }

  nameSelectHandler = (e) => {
    let selectedNurseData = this.props.allNurses.find((nurse) => {
      return nurse.rn_Id == e;
    });
    let rn_fullName =
    selectedNurseData.rnFirstName + " " + selectedNurseData.rnLastName;
    this.setState({ active_rn_Id: selectedNurseData.rn_Id, active_rn_name: rn_fullName });
  };

  departureSelectHandler = (e) => {
    // grab active nurse from the state
    let selectedNurseId = this.state.active_rn_Id;
    // find their data from props
    let selectedNurseData = this.props.allNurses.find(nurse => {
      return nurse.rn_Id == selectedNurseId;
    })
    // set state according to Home or Office starting point
    if (e === "Home") {
      this.setState({startingLocation: e, startingRNCoords_lat: selectedNurseData.rnHomeLat, startingRNCoords_lng: selectedNurseData.rnHomeLng})
    } else if (e === "Office") {
      this.setState({startingLocation: e, startingRNCoords_lat: selectedNurseData.rnOfficeLat, startingRNCoords_lng: selectedNurseData.rnOfficeLng})
    }
  }

  nurseAndLocationClickHandler = () => {
    console.log("clicked");
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllNurses }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPage);
