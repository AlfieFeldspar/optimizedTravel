import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPatientPoints } from "../actions/index";

let ptData = [];

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    const response = this.props.fetchPatientPoints(1);
    const json = await response;
    console.log("fetched data ", json.payload.data);
    ptData = json.payload.data.map((item) => {
      const container = {};
      container.ptId = item.pt_Id;
      container.ptName = [item.ptFirstName, item.ptLastName].join(" ");
      container.nursingNeed = item.nursingNeed;
      container.visitPriority = item.visitPriority;
      container.Lng = item.ptHomeLng;
      container.Lat = item.ptHomeLat;
      return container;
    });
    this.setState({ data: ptData }, function () {});
    return ptData;
  }

  render() {
    console.log(this.state.data);
    return (
      <table className="patient-table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Nursing Need</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {ptData.map((patient) => (
            <tr className="row-sm-1 patient-row" key={patient._id}>
              <th scope="col" className="col-sm-2 patient-name">
                {patient.ptName}
              </th>
              <th scope="col" className="col-sm-6 visit-reason">
                {patient.nursingNeed}
              </th>
              <th scope="col" className="col-sm-4 visit-priority">
                {patient.visitPriority}
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
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatientPoints }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
