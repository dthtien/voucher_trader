import React, {Component} from 'react';
import '../../resources/slidebar.scss';
import { slide as Menu } from 'react-burger-menu'

export default class SlideBar extends Component {
  constructor(props){
    super(props);
    this.state= {
      isOpen: true
    }
  }
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <div className="sidenav">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
      </div>
    );
  }
}