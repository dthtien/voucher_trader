import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import {logout} from '../../actions/user';

class Header extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  logout = (e) => {
    this.props.logout();
  }

  render(){
    const { isAuthenticate, currentUser } = this.props.users;

    const userLinks = (
      <div className="collapse navbar" id="navbarTogglerDemo02" >
        <ul className="navbar-nav mt-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/vouchers/new">Create Voucher <span className="sr-only">(current)</span></NavLink>
          </li>
        </ul>
        <ul className='navbar-nav mt-2 pull-right'>
          <li className="nav-item pull-right">
            <a className="nav-link pull-right" href="/" 
              onClick={this.logout.bind(this)}>
              {currentUser && currentUser.email}
            </a>
          </li>
          <li className="nav-item pull-right">
            <a className="nav-link pull-right" href="/" 
              onClick={this.logout.bind(this)}>Log Out</a>
          </li>
        </ul>
      </div>
    );
    const guestLinks = (
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02" >
        <ul className='navbar-nav ml-auto mt-2'>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Sign up</NavLink>
          </li>
        </ul>
      </div>
    );

    return(
      <nav className="navbar navbar-default navbar-dark navbar-expand-lg bg-primary">
        <NavLink className="navbar-brand mt-1" to="/">Voucher Trader</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {isAuthenticate ? userLinks : guestLinks}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, {logout})(Header);