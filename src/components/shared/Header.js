import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarNav, 
  NavbarToggler, 
  Collapse, 
  NavItem,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu
} from 'mdbreact';
import {logout} from '../../actions/user';

class Header extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    };

    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }

    onClick(){
      this.setState({
        collapse: !this.state.collapse,
      });
    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

  logout = (e) => {
    // e.preventDefault();
    this.props.logout();
  }



  render(){
    const { isAuthenticate, currentUser } = this.props.users;

    const userLinks = (
      <NavbarNav right>
        <NavItem>
          <NavLink className="nav-link" to="/vouchers/new">
            Create voucher</NavLink>
        </NavItem>
        <NavItem>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>{currentUser.email}</DropdownToggle>
            <DropdownMenu>
              <a className="dropdown-item waves-effect waves-light" onClick={this.logout.bind(this)} href="/">
                <i className="fa fa-sign-out mr-2"></i> Logout
              </a>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
        {
          (currentUser && currentUser.id) &&
          <NavItem>
            <Link className="nav-link" to={`/profile/${currentUser.id}`}>Profile</Link>
          </NavItem>
        }
      </NavbarNav>
    );
    const guestLinks = (
      <NavbarNav right>
        <NavItem>
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/signup">Sign up</NavLink>
        </NavItem>
      </NavbarNav>
    );

    return(
      <Navbar color="indigo" dark expand="md" scrolling color="red" fixed="top">
        <NavbarBrand href="/">
          <strong>Chợ voucher</strong>
        </NavbarBrand>
        { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
        <Collapse isOpen = { this.state.collapse } navbar>
          { isAuthenticate ? userLinks : guestLinks}
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, {logout})(Header);