import React, {Component} from 'react';

export default class DropDownSelect extends Component {
  renderSelectOptions = (value) => {
    return (
      <option key={value} value={value}>
        {value.capitalize()} Voucher
      </option>)
  }

  render(){ 
    const {input, values, className, label, meta: {error, touched} } = this.props
    return(
      <div>
        <label>{label.capitalize()}</label>
        <select {...input} className={className}>
          <option value="">Select</option> 
          {values.map(this.renderSelectOptions)}
        </select>
        {touched && (error && <span className='text-danger mt-2'>{error}</span>)}
      </div>
    );
  }
}