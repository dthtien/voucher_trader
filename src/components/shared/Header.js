import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-inverse navbar-fixed-top navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">Voucher Trader</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mt-2 mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/vouchers/new">Create Voucher <span className="sr-only">(current)</span></NavLink>
            </li>
          </ul>
          <ul className='navbar-nav mt-2'>
            <li className="nav-item pull-right">
              <NavLink className="nav-link pull-right" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header