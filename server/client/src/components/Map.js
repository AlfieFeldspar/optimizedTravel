import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMapGL, { Marker } from "react-map-gl";

import { fetchPatientPoints } from "../actions";

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";

let ptCoords = [];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingRNCoords: {
        latitude: 35.9285,
        longitude: -78.9371
      },
      data: [],
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

  async componentDidMount() {
    const response = this.props.fetchPatientPoints(1);
    const json = await response;
    ptCoords = json.payload.data.map((item) => {
      const container = {};
      container.ptId = item.pt_Id;
      container.ptName = [item.ptFirstName, item.ptLastName].join(" ");
      container.nursingNeed = item.nursingNeed;
      container.visitPriority = item.visitPriority;
      container.Lng = item.ptHomeLng;
      container.Lat = item.ptHomeLat;
      return container;
    });

    this.setState({ data: ptCoords }, function () {});
    return ptCoords;
  }

  render() {
    console.log(ptCoords);
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
        mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
        mapboxApiAccessToken={mapboxToken}
      >
        {ptCoords.map((patient) => (
          <Marker
            key={patient._id}
            latitude={patient.Lat}
            longitude={patient.Lng}
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
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
        ))}
      </ReactMapGL>
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);