import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";

import {
  fetchOptimizedRouteLeg1,
  fetchOptimizedRouteLeg2,
  fetchPatientPoints,
} from "../actions";

const lineFeature = {
    type: "LineString",
    coordinates: [],
};

const lineLayer = {
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#888",
    "line-width": 8,
  },
}


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
      viewport: {
        latitude: 35.989341,
        longitude: -78.926232,
        zoom: 10,
        width: "100vw",
        height: "50vh",
        display: "block",
      },
    };
  }

  btnClickHandler = () => {
    console.log("clicked!");
    // Compile the RN starting coordinates into an array
    const startCoordsLeg1 = [
      this.state.startingRNCoords.lng,
      this.state.startingRNCoords.lat,
    ];
    const middleCoords = [];
    const endPatientLeg1 = this.props.patientData.find((patient) => {
      return patient.visitPriority === "High";
    });
    // console.log("endPatientData",endPatientLeg1 );
    const endCoordsLeg1 = [endPatientLeg1.ptHomeLng, endPatientLeg1.ptHomeLat];
    this.props.fetchOptimizedRouteLeg1(
      startCoordsLeg1,
      middleCoords,
      endCoordsLeg1
    );

    // grab details for second leg of route
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
      console.log("timeout!")
      let fullTrip = [...this.props.routeLeg1.coordinates];
      let leg2 = [...this.props.routeLeg2.coordinates];
      leg2.forEach(pair => {
        return fullTrip.push(pair)
      })
      lineFeature.coordinates.push(fullTrip);
      console.log("linefeature", lineFeature)
    }, 1000);

    // SO NOW DISPLAY THE LINE!
  }
  

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
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          id={"map"}
          ref={"map"}
          mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
          mapboxApiAccessToken={mapboxToken}
        >
          {this.props.patientData.map((patient) => (
            <Marker
              key={patient.pt_id}
              latitude={patient.ptHomeLat}
              longitude={patient.ptHomeLng}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <svg
                className="marker"
                style={{
                  width: "24px",
                  height: "24px",
                }}
                viewBox="0 0 24 24"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </Marker>
          ))}
          <Marker
            latitude={this.state.startingRNCoords.lat}
            longitude={this.state.startingRNCoords.lng}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <svg
              className="feather feather-truck"
              style={{
                width: "24",
                height: "24",
              }}
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#ff6600"
              strokeWidth="3"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </Marker>
          {lineFeature && (
            <Source type="geojson" data={lineFeature}>
              <Layer {...lineLayer}></Layer>
            </Source>
          )}
        </ReactMapGL>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    patientData: state.patientData,
    routeLeg1: state.routeLeg1,
    routeLeg2: state.routeLeg2,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchPatientPoints, fetchOptimizedRouteLeg1, fetchOptimizedRouteLeg2 },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
