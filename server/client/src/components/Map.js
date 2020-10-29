import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMapGL, { Marker } from "react-map-gl";

import { fetchOptimizedRouteLeg1, fetchPatientPoints } from "../actions";

const mapboxToken =
  "pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg";

let ptCoords = [];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingRNCoords: {
        lat: 35.9285,
        lng: -78.9371,
      },
      ptPointData: [],
      routeLeg1: [],
      routeLeg2: [],
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

    this.setState({ ptPointData: ptCoords }, function () {});
    return ptCoords;
  }

  btnClickHandler = () => {
    console.log("clicked!");
    // Compile the RN starting coordinates into an array 
    let startCoords = [this.state.startingRNCoords.lng,this.state.startingRNCoords.lat]

    // Compile patient coordinates
    let firstPatientCoords = [];
    let remainingPatientCoords = [];
    ptCoords.map(patient => {
      // Grab the priority (first) pt lng/lat and push into array
      if (patient.visitPriority === 1) {
        firstPatientCoords.push(patient.Lng) && firstPatientCoords.push(patient.Lat);
      } else {
        // If not a priority patient, push lng/lat into a second array
        remainingPatientCoords.push(patient.Lng) && remainingPatientCoords.push(patient.Lat)
      }
      return firstPatientCoords && remainingPatientCoords;
    })

    // Format coords for the Optimizer: join into comma-separated pairs. 
    // Concat the pairs with semi-colon between them.
    let commaPair1;
    let commaPair2;
    let firstLegCoordsForNursingRoute;
    let prepCoordsForFirstLegOfRoute = () => {
      commaPair1 = startCoords.join();
      commaPair2 = firstPatientCoords.join();
      firstLegCoordsForNursingRoute = commaPair1 +";"+commaPair2;
      return firstLegCoordsForNursingRoute;
    }
    prepCoordsForFirstLegOfRoute();

    this.props.fetchOptimizedRouteLeg1(firstLegCoordsForNursingRoute);
    this.setState({routeLeg1: this.props.routeLeg1});
    
  



      // firstLeg = json.payload.data.map((item) => {
      //   const container = {};
      //   container.ptId = item.pt_Id;
      //   container.ptName = [item.ptFirstName, item.ptLastName].join(" ");
      //   container.nursingNeed = item.nursingNeed;
      //   container.visitPriority = item.visitPriority;
      //   container.Lng = item.ptHomeLng;
      //   container.Lat = item.ptHomeLat;
      //   return container;
      // });
  
      

    




  };

  render() {
    console.log(ptCoords);
    return (
      <>
        <div>
          <div className="map-title">Traveling Nurse Route Planner</div>
          <button
            class="btn btn-primary btn-sm map-button"
            type="button"
            onClick={this.btnClickHandler}
          >
            Route
          </button>
        </div>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#ff6600"
              stroke-width="3"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </Marker>
        </ReactMapGL>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    ptPointData: state.ptPointData,
    routeLeg1: state.routeLeg1,
    routeLeg2: state.routeLeg2
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPatientPoints, fetchOptimizedRouteLeg1 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
