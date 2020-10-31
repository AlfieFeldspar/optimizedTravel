import React, { Component } from "react";
import { connect } from "react-redux";
import { changePatientPriority } from "../actions/index";
import { bindActionCreators } from "redux";

class PatientList extends Component {

  
  handlePriorityChange = (event, pt_Id) => {
    let priority;
    console.log("clicked!", event.target.value);
    console.log("Pt in event handler", pt_Id);
    event.target.value === 'Low' ? (priority = 'High') : (priority = 'Low');
    console.log("target", event.target.value, "priority", priority);
    changePatientPriority(pt_Id, priority);
  };

  render() {
    return (
      <table className="patient-table table-striped">
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
                  className="btn priority-button"
                  onClick={(event) => {
                    this.handlePriorityChange(event, patient.pt_Id);
                  }}
                  style={
                    patient.visitPriority === "High"
                      ? { color: "red" }
                      : { color: "black" }
                  }
                >
                  {patient.visitPriority}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    changedPtPriority: state.changedPtPriority,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePatientPriority }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
