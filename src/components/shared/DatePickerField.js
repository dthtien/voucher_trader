import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

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
              floatingLabelText={this.props.label}
              name={this.props.name} 
              style={{borderBottom: '1px solid #bdbdbd'}} 
              id="datepicker"
              value={this.props.value} 
              autoOk={true}
              onChange={this.onChange.bind(this)}
              formatDate={(date) => moment(date).format('DD-MM-YYYY')}>
            </DatePicker>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
};
