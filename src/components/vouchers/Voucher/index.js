import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import VoucherImage from './VoucherImage';
import VoucherContent from './VoucherContent';
import VoucherFooter from './VoucherFooter';


export default class Voucher extends Component{
  render(){
    const {voucher} = this.props
    return(
      <div className="voucher-detail mt-1">
        <Link 
          to={`/vouchers/${voucher.id}`}>
          <div className="row">
            <div className="col col-md-3">
              <VoucherImage images={voucher.images} />
            </div>
            <div className="col col-md-9">
              <VoucherContent store={voucher.store} voucher={voucher}/>
              <VoucherFooter 
                create_at={voucher.created_at} owner_name="Owner name" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}