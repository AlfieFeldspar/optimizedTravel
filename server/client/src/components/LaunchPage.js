import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllNurses } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


class LaunchPage extends Component {
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
              <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
              <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
              <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
      </DropdownButton>
          {/* <div className="col-sm-4 row">
            <select className="form-control ddform" id="dd-select">
              <option value="">-- Select --</option>
              <option onSelect={this.nameSelectHandler(UIEvent)} value="1">Margo Beasley</option>
              <option value="2">Elizabeth Jennings</option>
              <option value="3">Mark Jones</option>
              <option value="4">Stephen Kimmel</option>
              <option value="5">Wendy Rhodes</option>
              <option value="6">Philip Thorpe</option>
            </select> */}
          {/* </div> */}
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
