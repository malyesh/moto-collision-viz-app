import React from 'react';
import './navbar.css';
// import { Link } from 'react-router';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <Link to={`${this.props.page}`}>{this.props.name}</Link>
      </div>
    );
  }
}

export default Navbar;
