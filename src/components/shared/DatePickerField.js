import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

export default class DatePickerField extends Component  {
  componentDidMount() {
    let datePickerHr = document.querySelector('.datepicker-wrapper').getElementsByTagName('hr')[0];
    datePickerHr.style.border = "none";
  }

  onChange = (e, value) => {
    this.props.handleChange(value, this.props.name)
  }

  render() {
    return(
      <div className="md-form">
        <MuiThemeProvider>
          <div className="datepicker-wrapper">
            <DatePicker 
              name={this.props.name} 
              style={{borderBottom: '1px solid #bdbdbd', height: '3rem'}} 
              id="datepicker" textFieldStyle={{width: '100%'}} 
              hintText={this.props.label}
              value={this.props.value} 
              autoOk={true}
              onChange={this.onChange.bind(this)}></DatePicker>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
};
