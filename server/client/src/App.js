import React, {PureComponent, Component, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const mapboxToken = 'pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dyOHBteHIwOHdoMnFzMGZ0dzhrdWx0In0.seq5jj6Q5Hhw2Fb-ecBskg';

class App extends PureComponent {
    state = {
       viewport: {    
        latitude: 35.997425,
        longitude: -78.905461,
        zoom: 10,
        width: '100vw',
        height: '40vh',
        display: 'block',
       }
    };
  

  componentDidMount() {

  }

  render() {
     return (
       <>
       <ReactMapGL
         {...viewport}
         mapStyle="mapbox://styles/alfiefeldspar/ckgrbnv1m03yo19mae6w18rjn"
         mapboxApiAccessToken={mapboxToken}
         onViewportChange={nextViewport => setViewport(nextViewport)}
         <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
          <div>You are here</div>
        </Marker>
       />
       </   } 
}

export default App;
________________________________________________


const CITIES = [...];

// PureComponent ensures that the markers are only rerendered when data changes
class Markers extends PureComponent {
  render() {
    const {data} = this.props;
    return data.map(
      city => <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} ><img src="pin.png" /></Marker>
    )
  }
}

class Map extends PureComponent {
  state = {
    viewport: {
      latitude: 37.78,
      longitude: -122.41,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL {...this.state.viewport} onViewportChange={viewport => this.setState({viewport})}>
        <Markers data={CITIES} />
      </ReactMapGL>
    );
  }
}