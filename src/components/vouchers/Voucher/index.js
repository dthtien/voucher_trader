import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import VoucherImage from './VoucherImage';
import VoucherContent from './VoucherContent';
import VoucherFooter from './VoucherFooter';
import VoucherType from '../shared/VoucherType';
import NumberToCurrency from '../../shared/NumberToCurrency';


export default class Voucher extends Component{
  render(){
    const {voucher, isEdit} = this.props
    console.log(voucher)
    return(
      <div className="col col-md-4 col-sm-6 item-voucher">
        <div className="voucher-detail">
          <div className="detail">
            <div className="top-voucher-detail">
              <div className="header row">
                <VoucherImage images={voucher.images} />
                <VoucherType kind={voucher.kind}/>
                <p className='text-danger font-weight-bold text-center price-voucher'>
                  <NumberToCurrency 
                    value={voucher.price} />
                </p>
                {isEdit && <Link to={`/vouchers/${voucher.id}/edit`} 
                  className='btn-edit-voucher'>
                  <i className="fa fa-edit fa-2x"></i>
                </Link>}
              </div>
              <div className="col col-md-12">
                <VoucherContent store={voucher.store} voucher={voucher}/>
                <VoucherFooter 
                  seller={voucher.seller} />
              </div>
            </div>
          </div>
        </div>
        <div className='text-center bottom-voucher-detail'>
          <Link 
            to={`/vouchers/${voucher.to_param}`}
            className="btn red">
            Xem chi tiết
          </Link>
        </div>
      </div>
    );
  }
}