import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class InputSwitch extends Component {
  onToggle = (e, value) => {

    this.props.handleChange(value)
  }
  
  render() {
    const props = this.props;
    return (
      <MuiThemeProvider>
        <Toggle
          name={props.name}
          value={this.value}
          onToggle={this.onToggle.bind(this)}
          label={props.label}
          defaultToggled={false}
        />
      </MuiThemeProvider>
    );
  }
}


