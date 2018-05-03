import React from 'react';

const VoucherType = (props) =>{
  if (props.kind === 'e') {
    return(
      <span className="voucher-type ml-4">
        <i className="material-icons">explicit</i>
        E-Voucher
      </span>
    );
  } else {
    return(
      <span className="voucher-type ml-4">
        <i className="material-icons">description</i>
        General Voucher
      </span>
    );
  }
}

export default VoucherType;