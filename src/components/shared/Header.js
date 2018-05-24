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
      dropdownOpen: false,
      total_cart_item : props.total_cart_item || 0,
    };

    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      if(typeof this.props.total_cart_item !== nextProps.total_cart_item && typeof nextProps.total_cart_item !== 'undefined'){
        this.setState((prevState) => (
          { ...prevState , total_cart_item : nextProps.total_cart_item}
        ));
      }
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
    e.preventDefault();
    this.props.logout();
  }
  
  render(){
    const { isAuthenticate, currentUser } = this.props.users;
    const userLinks = (
      <NavbarNav right>
        <NavItem>
        <NavLink className="nav-link upload-btn" to="/vouchers/new">
          Đăng mã giảm giá
          </NavLink>
        </NavItem>
        <NavItem className="button-cart">
          <NavLink className="nav-link " to="/cart">
            <i className="fa fa-shopping-cart"></i>
            <span>Giỏ hàng</span>
            <span className="number-item-of-cart">{typeof this.state.total_cart_item === 'number' ? this.state.total_cart_item  : 0}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>{currentUser.name}</DropdownToggle>
            <DropdownMenu>
              <Link className="dropdown-item waves-effect waves-light" to={`/profile/${currentUser.id}`}>
                <i className="fa fa-user-circle mr-2"></i>Profile
              </Link>
              <a className="dropdown-item waves-effect waves-light" onClick={this.logout.bind(this)} href="/">
                <i className="fa fa-sign-out mr-2"></i> Logout
              </a>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </NavbarNav>
    );
    const guestLinks = (
      <NavbarNav right>
        <NavItem>
          <NavLink className="nav-link upload-btn" to="/vouchers/new">
            Đăng mã giảm giá
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/signup">Sign up</NavLink>
        </NavItem>
        <NavItem className="button-cart">
          <NavLink className="nav-link " to="/cart">
            <i className="fa fa-shopping-cart"></i>
            <span>Giỏ hàng</span>
            <span className="number-item-of-cart">{typeof this.state.total_cart_item === 'number' ? this.state.total_cart_item  : 0}</span>
          </NavLink>
        </NavItem>
      </NavbarNav>
    );

    return(
      <Navbar color="indigo" dark expand="md" scrolling color="red" fixed="top">
        <NavbarBrand href="/">
          <div className='logo'>
            <span className='logo-cho'>Chợ</span>
            <span className='logo-voucher'>Voucher</span>
          </div>
        </NavbarBrand>
        { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
        <Collapse cisopen={ this.state.collapse.toString() } navbar>
          { isAuthenticate ? userLinks : guestLinks}
        </Collapse>
      </Navbar>
    );
  
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  total_cart_item : state.cart.total_cart_item
})

export default connect(mapStateToProps, {logout})(Header);