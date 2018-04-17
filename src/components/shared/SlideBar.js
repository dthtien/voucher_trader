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
      <div>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#clients">Clients</a></li>
        <li><a href="#contact">Contact</a></li>
      </div>
    );
  }
}