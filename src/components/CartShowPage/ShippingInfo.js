import React from 'react';

const ShippingInfo = ({shipping, payType}) => {
  if (shipping.direct_contact) {
    return(
      <p>Phương thức mua hàng: Liên hệ trực tiếp</p>
    )
  } else {
    return (
      <div>
        <p>Địa chỉ vận chuyển: {shipping.shipping_address} </p>
        <p>
          { payType=== 'payment' ? "Thanh toán bằng hình thức Thẻ ATM nội địa" : ''}
          {payType === 'cod' ? "Thanh toán bằng hình thức COD" : ''}
        </p>
      </div>
    )
  }
}

export default ShippingInfo;