import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllNurses } from "../actions/index";

class LaunchPage extends Component {
  handleNurseChange = (event, rn_Id) => {
    console.log("clicked!", event.target.value);
    // event.target.value === "Low" ? (priority = "High") : (priority = "Low");
    // changePatientPriority(pt_Id, priority);
    // setTimeout(() => {
    //   this.props.fetchPatientPoints(1);
    // }, 100);
  };

  render() {
    return (
      <>
        <div className="launch-title">
          Traveling Nurse Route Planner: Welcome!
        </div>
        <div>
          <select className="custom-select">
            <option>Pizzas</option>
            <option>Burger</option>
            <option>Ice Cream</option>
            <option>Fried Potatoes</option>
          </select>{" "}
        </div>

        {/* <table className="patient-table table-striped">
          <thead>
            <tr className="table-headers">
              <th scope="col">Name</th>
              <th scope="col">Nursing Need</th>
              <th scope="col">Priority</th>
            </tr>
          </thead>
          <tbody>
            {this.props.patientData.map((patient) => (
              <tr className="row-sm-3 patient-row" key={patient.pt_Id}>
                <th scope="col" className="patient-name">
                  {patient.ptLastName}
                </th>
                <th scope="col" className="visit-reason">
                  {patient.nursingNeed}
                </th>
                <th scope="col" className="visit-priority">
                  <button
                    input
                    type="button"
                    value={patient.visitPriority}
                    className="btn btn-sm"
                    style={
                      patient.visitPriority === "High"
                        ? { color: "red" }
                        : { color: "black" }
                    }
                    onClick={(event) => {
                      this.handlePriorityChange(event, patient.pt_Id);
                    }}
                  >
                    {patient.visitPriority}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table> */}
      </>
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
