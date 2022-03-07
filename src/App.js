import './App.css';
// import React, { useRef, useEffect, useState } from 'react';
import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2VhbnlhcCIsImEiOiJja253cHNjeDUwdHNuMm9zN3JpdW5pMjh1In0.tPRrVItbczIscL75Q50Hfw';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.785091,
      lng: -73.968285,
      zoom: 11,
      pitch: 70,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom, pitch } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
    });
  }
  render() {
    return (
      <div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}

export default App;
