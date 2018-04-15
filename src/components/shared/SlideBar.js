import React, {Component} from 'react';
import '../../resources/slidebar.css';
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
      <ul className='bg-secondary'>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </ul>
    );
  }
}