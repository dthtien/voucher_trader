import React from 'react';

const VoucherContent = (props) => {
  return(
    <div className="voucher-content">
      <h4 className="font-weight-bold">{props.store.name.toTitlelize()}</h4>
      <p className='text-danger font-weight-bold'>{props.price} VND</p>
    </div>
  );
}
export default VoucherContent;