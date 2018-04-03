import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const InputSignupForm = (props) => {
  console.log()
  return (
    <div className='form-group'>
      <label className='control-label font-weight-bold'> {props.name.capitalize()} </label>
      <input 
        value={props.password}
        onChange={props.handleChange.bind(this)}
        type={props.type}
        name={props.name}
        className={classnames('form-control', 
          {'is-invalid': props.error[props.name]})}/>
        {props.error[props.name] && <span className="text-danger">{props.error[props.name]}</span>}
    </div>
  );
}

InputSignupForm.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
}

export default InputSignupForm;