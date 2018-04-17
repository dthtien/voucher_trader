import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import VoucherImage from './VoucherImage';
import VoucherContent from './VoucherContent';
import VoucherFooter from './VoucherFooter';


export default class Voucher extends Component{
  render(){
    const {voucher} = this.props
    return(
      <Link className="voucher-detail mt-1" 
        to={`vouchers/${voucher.id}`}>
        <div className="row">
          <div className="col col-md-3">
            <VoucherImage />
          </div>
          <div className="col col-md-9">
            <VoucherContent store={voucher.store} price={voucher.price}/>
            <VoucherFooter 
              create_at={voucher.created_at} owner_name="Owner name" />
          </div>
        </div>
      </Link>
    );
  }
}