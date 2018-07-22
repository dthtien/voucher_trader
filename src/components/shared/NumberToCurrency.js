import React from 'react';
import { FormattedNumber } from 'react-intl';
const NumberToCurrency = ({value}) => (
  <span className='number-to-currency'>
    <FormattedNumber 
      value={value} 
      currency="VND"/>
      <span className='ml-1'>
        VNĐ
      </span>
  </span>
)

export default NumberToCurrency;