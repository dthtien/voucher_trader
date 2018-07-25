import React from 'react';
import VoucherImage from '../../../resources/images/voucher.jpg'

const VoucherDescriptionImage = (props) => {
  return(
    <div className="ml-2 text-center">
      <img src={VoucherImage} 
        alt="cho-voucher" 
        className=' img-fluid img-responsive'/>
    </div>
  )
}

export default VoucherDescriptionImage;