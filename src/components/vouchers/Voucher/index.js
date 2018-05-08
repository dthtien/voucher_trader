import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import VoucherImage from './VoucherImage';
import VoucherContent from './VoucherContent';
import VoucherFooter from './VoucherFooter';
import VoucherType from '../shared/VoucherType';


export default class Voucher extends Component{
  render(){
    const {voucher} = this.props
    return(
      <div className="col col-md-4 col-sm-6">
        <div className="voucher-detail mt-1">
          <div className="detail">
            <div className="header">
              <VoucherImage images={voucher.images} />
              <VoucherType kind={voucher.kind}/>
              <p className='text-danger font-weight-bold text-center'>
                {voucher.price} VND
              </p>
            </div>
            <div className="col col-md-12">
              <VoucherContent store={voucher.store} voucher={voucher}/>
              <VoucherFooter 
                date_end={voucher.date_end} 
                owner_name="Owner name"
                seller={voucher.seller} />
            </div>
            <div className='text-center'>
              <Link 
                to={`/vouchers/${voucher.id}`}
                className="btn red">
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}