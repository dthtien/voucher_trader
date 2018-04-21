import React from 'react';

const MaterialInputField = (props) => {
  return(
    <div className="md-form">
      <input 
        type={props.type} 
        onChange={props.handleChange.bind(this)} 
        value={props.value}
        id="inputMDEx" className="form-control"/>
      <label for="inputMDEx">{props.label}</label>
    </div>
  );
}

export default MaterialInputField;
