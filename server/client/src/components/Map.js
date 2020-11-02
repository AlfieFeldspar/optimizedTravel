import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StaticMap, Marker } from "react-map-gl";
import {
  fetchOptimizedRouteLeg1,
  fetchOptimizedRouteLeg2,
  fetchPatientPoints,
} from "../actions";

const lineFeature = {
  type: "LineString",
  path: [],
  color: [255, 0, 0],
};

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingRNCoords: {
        lat: 35.9285,
        lng: -78.9371,
      },
      lineFeature: {},
      viewport: {
        latitude: 36.033376,
        longitude: -78.928621,
        zoom: 9,
        width: "100vw",
        height: "60vh",
        display: "block",
      },
    };
  }

  // Handler for the routing button. It does too much!
  // TODO: Make this a component?
  btnClickHandler = () => {
    // ALL STEPS BELOW are to process coordinate pairs into a nested array

    // FOR LEG1: From RN to priority patient
    // Compile the RN starting coordinates into an array
    const startCoordsLeg1 = [
      this.state.startingRNCoords.lng,
      this.state.startingRNCoords.lat,
    ];
    const middleCoords = [];
    const endPatientLeg1 = this.props.patientData.find((patient) => {
      return patient.visitPriority === "High";
    });
    const endCoordsLeg1 = [endPatientLeg1.ptHomeLng, endPatientLeg1.ptHomeLat];
    // Send start (RN starting point), middle (empty), & end (priority patient) to API
    this.props.fetchOptimizedRouteLeg1(
      startCoordsLeg1,
      middleCoords,
      endCoordsLeg1
    );
    // FOR LEG2: Start at priority patient, optimize to middle patients, end at RN starting poing
    const startCoordsLeg2 = endCoordsLeg1;
    const endCoordsLeg2 = startCoordsLeg1;
    const middlePatients = [];
    this.props.patientData.forEach((patient) => {
      if (patient.visitPriority === "Low") {
        let ptCoordArray = [patient.ptHomeLng, patient.ptHomeLat];
        middlePatients.push(ptCoordArray);
      }
      return middlePatients;
    });
    this.props.fetchOptimizedRouteLeg2(
      startCoordsLeg2,
      middlePatients,
      endCoordsLeg2
    );
    // Ensure all props are back
    setTimeout(() => {
      // Merge all coords into one trip
      // Format as nested array [[lng,lat],[lng,lat]
      let fullTrip = [...this.props.routeLeg1.coordinates];
      let leg2 = [...this.props.routeLeg2.coordinates];
      leg2.forEach((pair) => {
        return fullTrip.push(pair);
      });
      lineFeature.path.push(fullTrip);
      console.log("fulltrip=PATH in lineFeature", fullTrip);
    }, 3000);
    this.setState({ lineFeature: lineFeature });
  };

  render() {
    return (
      <>
        <div>
          <div className="map-title">Traveling Nurse Route Planner</div>
          <button
            className="btn btn-primary btn-sm map-button"
            type="button"
            onClick={this.btnClickHandler}
          >
            Route
          </button>
        </div>
        <StaticMap
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          id={"map"}
          ref={"map"}
          mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
          mapboxApiAccessToken={mapboxToken}
        >
          {this.props.patientData.map((patient) =>
            getMarkerForPatient(patient)
          )}

          {getMarkerForNurse()}

        </StaticMap>
      </>
    );
  }
}

function getMarkerForPatient(patient) {
  if (patient.visitPriority === "High") {
    return (
      <Marker
        key={patient.pt_id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/color/18/000000/high-priority.png" />
      </Marker>
    );
  } else {
    return (
      <Marker
        key={patient.pt_id}
        latitude={patient.ptHomeLat}
        longitude={patient.ptHomeLng}
        offsetLeft={-12}
        offsetTop={-24}
      >
        <img src="https://img.icons8.com/color/22/000000/2-circle-c--v1.png" />
      </Marker>
    );
  }

  // {
  //   /* // )
  //             // {/* <img src="https://img.icons8.com/color/22/000000/3-circle-c--v1.png"/> */
  // }
  // {
  //   /* <img src="https://img.icons8.com/color/22/000000/4-circle-c--v1.png"/> */
  // }
  // {
  //   /* <img src="https://img.icons8.com/color/22/000000/5-circle-c--v2.png"/> */
  // }
  // {
  //   /*<img src="https://img.icons8.com/color/22/000000/6-circle-c--v1.png"/> */
  // }

  //   switch(index) {
  //     case 2: return (<Marker>2</Marker>)
  //   }
  // }
}

function getMarkerForNurse() {
  if (this.props.nurseCoords.loc === "Home") {
    return (
      <Marker
            latitude={this.props.nurseCoords.lat}
            longitude={this.props.nurseCoords.lng}
            offsetLeft={-12}
            offsetTop={-24}
          >
      <img src="https://img.icons8.com/ios-glyphs/30/000000/city-buildings.png"/>
      </Marker>
    );
  } else {
    return (
      <Marker
            latitude={this.props.nurseCoords.lat}
            longitude={this.props.nurseCoords.lng}
            offsetLeft={-12}
            offsetTop={-24}
          >
        <img src="https://img.icons8.com/material/24/000000/cottage--v1.png"/>
      </Marker>
    );
  }

  {
    /* // )
              // {/* <img src="https://img.icons8.com/color/22/000000/3-circle-c--v1.png"/> */
  }
  {
    /* <img src="https://img.icons8.com/color/22/000000/4-circle-c--v1.png"/> */
  }
  {
    /* <img src="https://img.icons8.com/color/22/000000/5-circle-c--v2.png"/> */
  }
  {
    /*<img src="https://img.icons8.com/color/22/000000/6-circle-c--v1.png"/> */
  }

  //   switch(index) {
  //     case 2: return (<Marker>2</Marker>)
  //   }
  // }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    routeLeg1: state.routeLeg1,
    routeLeg2: state.routeLeg2,
    oneNurseById: state.oneNurseById,
    nurseCoords: state.nurseCoords,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchPatientPoints, fetchOptimizedRouteLeg1, fetchOptimizedRouteLeg2 },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
