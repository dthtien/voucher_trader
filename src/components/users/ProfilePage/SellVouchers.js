import React, {Component} from 'react';
import {connect} from 'react-redux';
import Voucher from '../../vouchers/Voucher';
import { getSellingVouchers } from '../../../actions/user';
import Spinner from '../../shared/Spinner';
import ReactPaginate from 'react-paginate';

class SellVouchers extends Component {
  componentDidMount(){
    this.props.getSellingVouchers({id: this.props.profileId});
  }

  renderVoucherList = () =>{
    return this.props.vouchers.map((voucher, index) => (
      <Voucher key={index} voucher={voucher} />
    ))
  }

  handlePageClick = ({selected}) =>  {
    this.props.getSellingVouchers({id: this.props.profileId, page: selected})
  }
  render(){
    if (this.props.loading) {
      return( <Spinner />);
    } else {
      const {totalVouchers} = this.props;
      const pageCount = totalVouchers/24
      return(
        <div className="vouchers">
          <div className="row">
            {this.renderVoucherList()}
            <nav className="pagination">
              <ReactPaginate previousLabel="Trở lại"
                nextLabel="Tiếp"
                breakLabel={<a href="">...</a>}
                breakClassName="break-me"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName="pagination pg-blue"
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                pageLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeClassName="active" />
            </nav>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) =>({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading,
  totalVouchers: state.vouchers.totalVouchers
})
export default connect(mapStateToProps, {getSellingVouchers})(SellVouchers);