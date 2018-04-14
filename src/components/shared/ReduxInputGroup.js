import React from 'react';

const ReduxInputGroup = (props) => {
  console.log(props);
  const { input, value, type, meta: { touched, error, warning } } = props;

  return(
    <div className="form-group">
      <label className='font-weight-bold'>
        {input.name.toTitlelize()}
      </label>
      <input {...input} 
        type={type}
        value={value}
        className="form-control"
        onChange={props.handleChange.bind(this)}/>
      {touched && ((error && <span className='text-danger mt-2'>{error}</span>) || 
        (warning && <span className='text-warning mt-2'>{warning}</span>))}
    </div>
  );
}

export default ReduxInputGroup;