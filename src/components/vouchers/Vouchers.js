import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import Voucher from './Voucher';
import SlideBar from '../shared/SlideBar';
import '../../resources/vouchers.scss'
import SearchForm from '../shared/SearchForm';


class Vouchers extends Component {
  componentWillMount(){
    const query = this.props.location.search ? this.props.location.search.match(/^\?cat=(.+)$/)[1] : "";
    this.props.getVouchers({cat: query});
  };

  handleSearchSubmit = (query) => {
    this.props.getVouchers({q: query});
  }

  renderVoucherList = () => {
    if (!this.props.vouchers) {
      return (<li>Loading..</li>);
    } else {
      const vouchersList = this.props.vouchers.map(voucher => {
        return <Voucher key={voucher.id} voucher={voucher} />;
      });
      return(
        <div className="voucher-list">
          {vouchersList}
        </div>
      );
    }
  }
  
  render() {
    return (
      <div className="vouchers">
        <div className="row">
          <div className="col col-md-8 offset-md-2">
            <SearchForm onSearch={this.handleSearchSubmit}/>
            <div className="mt-1">
              {this.renderVoucherList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
});

export default connect(mapStateToProps, {getVouchers: getVouchers})(Vouchers);