import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllNurses } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


class LaunchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rn_Id: 1,
      startingRNCoords: {
        lat: 35.9285,
        lng: -78.9371,
      },
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
  }
  
  departureSelectHandler = (e) => {
    console.log(e)
  }
 

  render() {
    return (
      <div id="LaunchPage">
           <div className="launch-title">Traveling Nurse Route Planner - Welcome!</div>
        <h4 className="name-select">Pick your name</h4>
        <DropdownButton
          alignRight
          title="Dropdown right"
          id="dropdown-menu-align-right"
          onSelect={this.nameSelectHandler}
            >
              <Dropdown.Item eventKey="1">Margo Beasley</Dropdown.Item>
              <Dropdown.Item eventKey="2">Elizabeth Jennings</Dropdown.Item>
              <Dropdown.Item eventKey="3">Mark Jones</Dropdown.Item>
              <Dropdown.Item eventKey="4">Stephen Kimmel</Dropdown.Item>
              <Dropdown.Item eventKey="5">Wendy Rhodes</Dropdown.Item>
              <Dropdown.Item eventKey="6">Philip Thorpe</Dropdown.Item>
      </DropdownButton>

      <h4 className="name-select">Pick your starting location (home or office)</h4>
        <DropdownButton
          alignRight
          title="Dropdown right"
          id="dropdown-menu-align-right"
          onSelect={this.departureSelectHandler}
            >
              <Dropdown.Item eventKey="1-home">Home</Dropdown.Item>
              <Dropdown.Item eventKey="2-office">Office</Dropdown.Item>

      </DropdownButton>

        <image className="img-roads" src="optimizedTravel/server/client/src/components/assets/cartoon-seamless-pattern-cars-trees-roads-road-signs-37018953.jpg" />
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
