import React from 'react';

const Marker = (props) => {
  return (
    <div onClick={(e) => {console.log(props.lat)}}>
      {props.text}
    </div>
  )
}

export default Marker;