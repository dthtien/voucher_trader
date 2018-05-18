import React from 'react';

const VoucherType = (props) =>{
  if (props.kind === 'e') {
    return(
      <div className="col-md-6 col-sm-6 pr-0">
        <span className="voucher-type">
          <i className="material-icons">explicit</i>
          E-Voucher
        </span>
      </div>
    );
  } else {
    return(
      <div className="col-md-6 col-sm-6 pr-0">
        <span className="voucher-type ">
          <i className="material-icons">description</i>
          General Voucher
        </span>
      </div>
    );
  }
}

export default VoucherType;