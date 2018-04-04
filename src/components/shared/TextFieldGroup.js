import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = (props) => {
  return (
    <div className='form-group'>
      <label className='control-label font-weight-bold'> 
        {props.name.toTitlelize()} </label>
      <input 
        value={props.password}
        onChange={props.handleChange.bind(this)}
        type={props.type}
        name={props.name}
        className={classnames('form-control', 
          {'is-invalid': props.error})}/>
        {props.error && <span className="text-danger">{props.error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;