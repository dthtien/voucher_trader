import React from 'react';
import { FormattedNumber } from "react-intl"; 

const CartInfo = ({totalQuantity, totalPrice}) => {
  return(
    <div className="col-md-12 col-sm-12 top-shipping">
      <div className="total-product col-3 pl-0">
        <span className="text-title-shipping">Sản phẩm:  {totalQuantity}</span>
      </div>
      <div className="total-product col-9">
        <span className="text-title-shipping">
          Tổng tiền: 
          <FormattedNumber 
          value={totalPrice}
          style='currency' 
          currency='VND'
          />
        </span>
      </div>
    </div>
  )
}
export default CartInfo;