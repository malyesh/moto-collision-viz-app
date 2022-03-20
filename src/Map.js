import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import Navbar from './Navbar';
// import * as Papa from 'papaparse';
// import csvFilePath from './crashes.csv';
// import myData from './crashes2.json';
import myData from './crashes.json';

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
      //   lat: 40.785091,

      //   lng: -73.968285,
      lat: 40.6094,
      lng: -74.0285,
      zoom: 10.5,
      pitch: 50,
    };
    this.mapContainer = React.createRef();
  }

  //   getHeight(data) {
  //     console.log('data:', data.data);

  //   }
  //   getName(data, name) {
  //     console.log('in get name');
  // for (var i = 0; i < data.length; i++) {
  //   console.log('hereeeee');
  //   if (data[i][1] === name) {
  //     console.log(name + ' ' + data[i][2]);
  //   }
  // }
  //   }
  getHeight(name) {
    for (var i = 1; i < myData.length; i++) {
      if (myData[i].NTAName === name) {
        console.log(name + ' ' + myData[i].Crashes);
        return myData[i].Crashes;
      }
    }
    // for (const n in myData[1]) {
    //   if (n === name) {
    //     console.log();
    //   }
    // }
    // console.log(myData[1].NTAName);
  }
  //   getHeight(name) {
  //     // console.log('here');
  //     //gets the amount of crashes
  //     //console.log(data.data[1][2]);
  //     fetch(csvFilePath)
  //       .then((response) => response.text())
  //       .then((responseText) => {
  //         var data = Papa.parse(responseText);
  //         // console.log(data);
  //         this.getName(data, name);

  //         //this.getHeight(data);

  //         //setText( responseText );
  //       });
  //   }

  componentDidMount() {
    // fetch(csvFilePath)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     var data = Papa.parse(responseText);
    //     // this.getHeight(data);
    //     console.log(data);

    //     //setText( responseText );
    //   });
    // console.log(myData);
    const { lng, lat, zoom, pitch } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      //   style: 'mapbox://styles/mapbox/dark-v10', //- this will make it dark
      //   style: 'mapbox://styles/mapbox/streets-v11',
      //   style: 'mapbox://styles/seanyap/cl0pp9oce000a14o05d0edtg7/draft',
      //   style: 'mapbox://styles/malyesh/cl0r1o31s000g15oy5h12b2s8',
      //   style: 'mapbox://styles/malyesh/cl0rfzotv001014pay99m50x8',
      style: 'mapbox://styles/malyesh/cl0vqzzz2000214ul1onhipr7',
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
    });
    let hoveredStateId = null;
    map.on('load', () => {
      map.addSource('neighborhoods', {
        type: 'geojson',
        // data: 'malyesh.943zs2ei',
        // data: './neighborhood-test.geojson',
        //data: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Neighborhood_Tabulation_Areas_2020/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson',
        // data: 'https://data-beta-nyc-files.s3.amazonaws.com/resources/6df127b1-6d04-4bb7-b983-07402a2c3f90/f4129d9aa6dd4281bc98d0f701629b76nyczipcodetabulationareas.geojson?Signature=CE38L1nGKDASjhCTElb5C8Y4EW0%3D&Expires=1647462955&AWSAccessKeyId=AKIAWM5UKMRH2KITC3QA',
        data: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Neighborhood_Tabulation_Areas_2020/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson',
        generateId: true,
      });
      map.addLayer({
        id: 'neighborhoods-viz',
        // type: 'fill-extrusion',
        type: 'fill',
        source: 'neighborhoods',
        paint: {
          'fill-color': '#627BC1',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5,
          ],
        },
        // paint: {
        //   'fill-color': 'blue',
        //   'fill-opacity': 0.4,
        //   'fill-outline-color': 'black',
        //   //   'fill-extrusion-color': ['get', 'red'],
        //   //   Get `fill-extrusion-height` from the source `height` property.
        //   //   'fill-extrusion-height': ['get', this.getHeight()],
        // },
      });

      map.addLayer({
        id: 'neighborhoods-viz-line',
        type: 'line',
        source: 'neighborhoods',
        paint: {
          'line-color': 'black',
          'line-width': 1.5,
        },
      });
      const location = document.getElementById('loc');
      const accidents = document.getElementById('acc');
      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.on('click', 'neighborhoods-viz', (e) => {
        map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 12,
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
          accidents.textContent = this.getHeight(
            e.features[0].properties.NTAName
          );
          //   console.log(e.features[0].properties.NTAName);
          //   console.log(e.lngLat.lng);
          //   this.getHeight(e.features[0].properties.NTAName);
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      //   map.on('mouseleave', 'neighborhoods-viz', () => {
      //     if (hoveredStateId !== null) {
      //       map.setFeatureState(
      //         { source: 'neighborhoods', id: hoveredStateId },
      //         { hover: false }
      //       );
      //     }
      //     hoveredStateId = null;
      //   });
      //const motoData = map.getSource('malyesh.943zs2ei');

      // console.log(motoData);

      //   const locDisplay = document.getElementById('loc');
      //   const dateDisplay = document.getElementById('date');
      //   const injDisplay = document.getElementById('inj');
      //   map.on('mouseover', motoData, (event) => {
      //     map.getCanvas().style.cursor = 'pointer';
      //     locDisplay.textContent = event.features[0].properties.zip_code;
      //     dateDisplay.textContent = event.features[0].properties.crash_date;
      //     injDisplay.textContent =
      //       event.features[0].properties.number_of_persons_injured;
      //   });
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
      //   const locDisplay = document.getElementById('loc');
      //   const dateDisplay = document.getElementById('date');
      //   const injDisplay = document.getElementById('inj');
      //   map.on('mouseover', 'crashes-viz', (event) => {
      //     map.getCanvas().style.cursor = 'pointer';
      //     locDisplay.textContent = event.features[0].properties.zip_code;
      //     dateDisplay.textContent = event.features[0].properties.crash_date;
      //     injDisplay.textContent =
      //       event.features[0].properties.number_of_persons_injured;
      //   });
    });
    // const load = function(){

    // };
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
