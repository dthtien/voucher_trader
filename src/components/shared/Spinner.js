import React from 'react';
import '../../resources/spinner.scss'

const Spinner = (props) => {
  return(
    <div className="text-center">
      <a className="btn red text-center">
        <span className="fa fa-spinner fa-2x refresh-animate"></span>
      </a>
    </div>
  );
}

export default Spinner;