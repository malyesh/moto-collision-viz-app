import React from 'react';
import Navbar from './Navbar';
import DataController from './DataController';
import myData from './crashes2.json';
// import { Link } from 'react-router';

class GraphPage extends React.Component {
  componentDidMount() {
    console.log(myData);
  }
  render() {
    return (
      <div>
        <Navbar name='Map' page='/' />
        {/* <DataController /> */}
        {/* <div>Hello</div> */}
      </div>
    );
  }
}

export default GraphPage;
