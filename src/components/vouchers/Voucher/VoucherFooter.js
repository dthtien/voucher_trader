import React from 'react';
import {Link} from 'react-router-dom';

const VoucherFooter = (props) => {
  const {seller} =  props;
  return(
     <div className="voucher-footer">
        <div className="owner-voucher">
          <Link to={`/profile/${seller.id}`} >
            {seller.name}
          </Link>
        </div>
      </div>
  );
}

export default VoucherFooter;