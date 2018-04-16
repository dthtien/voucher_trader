import React, {Component} from 'react';
import VoucherImage from './VoucherImage';


export default class Voucher extends Component{
  render(){
    return(
      <div className="row">
        <div className="col col-md-3">
          <VoucherImage />
        </div>
        <div className="col col-md-9">
          <h4>Voucherdetails</h4>
        </div>
      </div>
    );
  }
}