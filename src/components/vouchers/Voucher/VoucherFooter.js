import React from 'react';
import {Link} from 'react-router-dom';

const VoucherFooter = (props) => {
  return(
     <div className="voucher-footer">
        <div className="owner-voucher">
          <Link to={`/profile/${props.seller.id}`} >
            {props.owner_name}
          </Link>
        </div>
      </div>
  );
}

export default VoucherFooter;