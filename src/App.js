import './App.css';
import React from 'react';
// import AccidentDisplay from './AccidentDisplay';
import Map from './Map';
// import { Link } from 'react-router';
import Navbar from './Navbar';

import { Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <AccidentDisplay /> */}
        <Navbar name='Graphs' page='/graphPage' />
        <Map />;{/* <Navbar name='Graphs' page='/graphPage' /> */}
      </div>
    );
  }
}

export default App;
