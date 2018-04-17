import React from 'react';
import Moment from 'react-moment';

const VoucherFooter = (props) => {
  return(
     <div className="voucher-footer">
        <div className='row'>
          <div className="col col-md-6">
            <i className="pull-left">
              <Moment fromNow>{props.create_at}</Moment>
            </i>
          </div>
          <div className="col col-md-6">
            <div className="owner-voucher">
              <p className='font-weight-light pull-right'>
                {props.owner_name}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default VoucherFooter;