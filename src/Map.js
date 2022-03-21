import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import Navbar from './Navbar';
// import * as Papa from 'papaparse';
// import csvFilePath from './crashes.csv';
// import myData from './crashes2.json';
import myData from './crashes.geojson';

// var csv = require('jquery-csv');
// import { Link } from 'react-router-dom';

mapboxgl.accessToken =
  //   'pk.eyJ1IjoibWFseWVzaCIsImEiOiJjbDBxdXR2NTMyZHBjM2RtZ2hsNjF6d245In0.2X12OJcEz-K6xghrR8QekA';
  //   'pk.eyJ1Ijoic2VhbnlhcCIsImEiOiJja253cHNjeDUwdHNuMm9zN3JpdW5pMjh1In0.tPRrVItbczIscL75Q50Hfw';
  'pk.eyJ1IjoibWFseWVzaCIsImEiOiJjbDBxdXR2NTMyZHBjM2RtZ2hsNjF6d245In0.2X12OJcEz-K6xghrR8QekA';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.7294,

      lng: -73.9066,
      // lat: 40.6094,
      //lng: -74.0285,
      //   lat: 40.5755,
      //   lng: -73.9707,
      zoom: 9.25,
      pitch: 50,
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom, pitch } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      //   style: 'mapbox://styles/mapbox/dark-v10', //- this will make it dark
      style: 'mapbox://styles/mapbox/streets-v11',
      //   style: 'mapbox://styles/seanyap/cl0pp9oce000a14o05d0edtg7/draft',
      //   style: 'mapbox://styles/malyesh/cl0r1o31s000g15oy5h12b2s8',
      //   style: 'mapbox://styles/malyesh/cl0rfzotv001014pay99m50x8',
      //   style: 'mapbox://styles/malyesh/cl0vqzzz2000214ul1onhipr7',
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
    });
    // const urlSource = './crashes.geojson';
    let hoveredStateId = null;
    map.on('load', () => {
      map.addSource('neighborhoods', {
        type: 'geojson',
        data: myData,
      });
      map.addLayer({
        id: 'neighborhoods-viz',
        type: 'fill-extrusion',
        // type: 'fill',
        source: 'neighborhoods',
        paint: {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'Crashes'],
            8,
            '#eef91a',
            3997.13,
            '#f2c936',
            7986.25,
            '#e89c4f',
            11975.4,
            '#d36d64',
            15964.5,
            '#b9467a',
            19953.7,
            '#96228e',
            23942.8,
            '#67009e',
          ],
          'fill-extrusion-height': ['get', 'Crashes'],
          'fill-extrusion-opacity': 0.8,
        },
      });

      //   map.addLayer({
      //     id: 'neighborhoods-viz-line',
      //     type: 'line',
      //     source: 'neighborhoods',
      //     paint: {
      //       'line-color': 'black',
      //       'line-width': 1.5,
      //     },
      //   });
      const location = document.getElementById('loc');
      const accidents = document.getElementById('acc');

      map.on('click', 'neighborhoods-viz', (e) => {
        map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 11,
          pitch: 0,
        });
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: 'neighborhoods', id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'neighborhoods', id: hoveredStateId },
            { hover: true }
          );
          map.getCanvas().style.cursor = 'pointer';

          location.textContent = e.features[0].properties.NTAName;
          accidents.textContent = e.features[0].properties.Crashes;
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', 'neighborhoods-viz', () => {
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: 'neighborhoods', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      //   map.addSource('crashes', {
      //     // type: 'geojson',
      //     // data: './moto-data.geojson',
      //     // data: `https://data.cityofnewyork.us/resource/h9gi-nx95.geojson`,
      //     data: 'mapbox://malyesh.9eyxk0nc',
      //     // minzoom: 6,
      //     // maxzoom: 14,
      //     // generateId: true,
      //     //   data: './Motor Vehicle Collisions - Crashes Joined to Neighborhood Data.geojson',
      //     //   data: 'mapbox://styles/malyesh/cl0vqzzz2000214ul1onhipr7',
      //   });
      //   map.addLayer({
      //     id: 'crashes-viz',
      //     type: 'circle',
      //     source: 'crashes',
      //     paint: {
      //       'circle-color': '#7F3121',
      //       'circle-opacity': 0.75,
      //       'circle-radius': 3,
      //     },
      //   });
      //   map.addLayer({
      //     id: 'crashes-viz',
      //     type: 'circle',
      //     source: 'crashes',
      // paint: {
      //   'fill-color': 'blue',
      //   'fill-opacity': 0.4,
      //   'fill-outline-color': 'black',
      // },

      // paint: {
      //   'circle-color': '#7F3121',
      //   'circle-opacity': 0.75,
      //   'circle-radius': 3,
      // },
      //   });
    });
  }
  render() {
    return (
      <div>
        <div className='accident-info'>
          <div>
            <strong>Neighborhood:</strong> <span id='loc'></span>
          </div>
          <div>
            <strong>Accidents:</strong> <span id='acc'></span>
          </div>
          {/* <div>
            <strong>People Injured:</strong> <span id='inj'></span>
          </div> */}
        </div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}

export default Map;
