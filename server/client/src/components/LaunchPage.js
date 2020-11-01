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
      rn_Id: 1,
      rn_name: '',
      startingLocation: '',
      startingRNCoords: {
        lat: 35.9285,
        lng: -78.9371,
      },
    };
  }
  componentDidMount() {
    this.props.fetchAllNurses();
  }

  nameSelectHandler = (e) => {
    console.log(e);
    // let element = document.getElementById("dd-select");
    // console.log("element", element)
    // let result = element.options[element.selectedIndex].value;
    // result=document.getElementById("result").innerHTML;
    // console.log("value",result)
  };

  departureSelectHandler = (e) => {
    console.log(e);
  };

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
          <b className="name-textbox">{this.state.rn_name}</b>
        </p>

        <DropdownButton
          alignCenter
          title="Your starting location"
          id="dropdown-menu-align-center"
          className="ddform-start"
          onSelect={this.departureSelectHandler}
        >
          <Dropdown.Item eventKey="1-home">Home</Dropdown.Item>
          <Dropdown.Item eventKey="2-office">Office</Dropdown.Item>
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
        <footer className='LaunchFooter'>
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
