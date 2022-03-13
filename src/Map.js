import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2VhbnlhcCIsImEiOiJja253cHNjeDUwdHNuMm9zN3JpdW5pMjh1In0.tPRrVItbczIscL75Q50Hfw';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.785091,
      lng: -73.968285,
      zoom: 11,
      //   pitch: 70,
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const { lng, lat, zoom, pitch } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      //style: 'mapbox://styles/mapbox/dark-v10', - this will make it dark
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      //   pitch: pitch,
    });

    // this.map.on('load', () => {
    //   this.map.addSource('neighborhoods', {
    //     type: 'geojson',
    //     data: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Neighborhood_Tabulation_Areas_2020/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson',
    //   });
    //   this.map.addLayer({
    //     id: 'neighborhoods',
    //     type: 'line',
    //     source: 'neighborhoods',
    //   });
    // });

    //this.setFill();
  }
  render() {
    return (
      <div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    );
  }
}

export default Map;
