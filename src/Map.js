import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

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
  componentDidMount() {
    const { lng, lat, zoom, pitch } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      //   style: 'mapbox://styles/mapbox/dark-v10', //- this will make it dark
      style: 'mapbox://styles/mapbox/streets-v11',
      //   style: 'mapbox://styles/seanyap/cl0pp9oce000a14o05d0edtg7/draft',
      //   style: 'mapbox://styles/malyesh/cl0r1o31s000g15oy5h12b2s8',
      //   style: 'mapbox://styles/malyesh/cl0rfzotv001014pay99m50x8',
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
    });
    map.on('load', () => {
      map.addSource('neighborhoods', {
        type: 'geojson',
        //data: './neighborhood-test.geojson',
        //data: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Neighborhood_Tabulation_Areas_2020/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson',
        data: 'https://data-beta-nyc-files.s3.amazonaws.com/resources/6df127b1-6d04-4bb7-b983-07402a2c3f90/f4129d9aa6dd4281bc98d0f701629b76nyczipcodetabulationareas.geojson?Signature=CE38L1nGKDASjhCTElb5C8Y4EW0%3D&Expires=1647462955&AWSAccessKeyId=AKIAWM5UKMRH2KITC3QA',
        generateId: true,
      });
      map.addLayer({
        id: 'neighborhoods-viz',
        //type: 'fill-extrusion',
        type: 'fill',
        source: 'neighborhoods',
        paint: {
          'fill-color': 'blue',
          'fill-opacity': 0.4,
          'fill-outline-color': 'black',
          // 'fill-extrusion-color': ['get', 'color'],

          // Get `fill-extrusion-height` from the source `height` property.
          // 'fill-extrusion-height': ['get', 'height'],
        },
      });
      //   map.addLayer({
      //     id: 'neighborhoods-viz-line',
      //     type: 'line',
      //     source: 'neighborhoods',
      //     paint: {
      //       'line-color': 'black',
      //       'line-width': 2,
      //     },
      //   });
      //   map.addSource('crashes', {
      //     type: 'geojson',
      //     data: `https://data.cityofnewyork.us/resource/h9gi-nx95.geojson`,
      //     generateId: true,
      //   });
      //   map.addLayer({
      //     id: 'crashes-viz',
      //     type: 'circle',
      //     source: 'crashes',
      //     paint: {
      //       'circle-stroke-color': '#000',
      //       'circle-stroke-width': 1,
      //       'circle-color': '#000',
      //     },
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
  }
  render() {
    return (
      <div>
        <div className='accident-info'>
          <div>
            <strong>Zip:</strong> <span id='loc'></span>
          </div>
          <div>
            <strong>Date:</strong> <span id='date'></span>
          </div>
          <div>
            <strong>People Injured:</strong> <span id='inj'></span>
          </div>
        </div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}

export default Map;
