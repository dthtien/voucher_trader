import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import Voucher from './Voucher';
import '../../resources/vouchers.scss';
import VouchersBannerImage from '../../resources/images/vouchers_banner.jpg';
import SearchForm from '../shared/SearchForm';
import Spinner from '../shared/Spinner';
import qs from 'querystringify';
import ReactPaginate from 'react-paginate';

class Vouchers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cat: '',
      q: '',
      page: 0,
    }
  }

  componentDidMount(){
    const query = qs.parse(this.props.location.search)
    console.log(query);
    const category_endcode = decodeURIComponent(query.cat)

    if (category_endcode === 'Tất cả') {
      this.props.getVouchers({cat: '', q: query.q});
    } else{
      this.setState({
        query
      })

      this.props.getVouchers(query);
    }

    document.title=`Chợ voucher - Mã giảm gía - ${category_endcode}`
  };

  handleTextChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSearchSubmit = (query) => {
    this.setState({
      ...this.state,
      q: query,
      page: 0,
      isSearched: true
    })

    this.props.getVouchers(this.state);
  }

  handlePageClick = ({selected}) => {
    console.log(selected);
    this.setState({
      ...this.state,
      page: selected
    })

    this.props.getVouchers({...this.state, page: selected})
  }

  renderVoucherList = () => {
    if (this.props.loading) {
      return (
        <Spinner key={0} />
       );
    } else {
      const vouchersList = this.props.vouchers.map((voucher, index) => {
        return <Voucher key={voucher.id} voucher={voucher} />;
      });

      const pageCount = this.props.totalVouchers/24

      return(
        <div className="row">
          {vouchersList}
          <nav className="pagination">
            <ReactPaginate previousLabel="Trở lại"
              nextLabel="Tiếp"
              breakLabel={<a href="">...</a>}
              breakClassName="break-me"
              pageCount={pageCount}
              forcePage={this.state.page}
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
      );
    }
  }
  
  render() {
    return (
      <div className="vouchers">
        <div className="vouchers-banner overlay full" style={{
            backgroundImage: `url(${VouchersBannerImage})`,
          }} >
          <div className="container holder">
            <div className="row">
              <div className='col col-xs-12'>
                <h1>Danh sách mã giảm gía</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <SearchForm 
            onSearch={this.handleSearchSubmit} 
            searchText={this.state.q}
            handleTextChange={this.handleTextChange}
          />
          {this.renderVoucherList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading,
  totalVouchers: state.vouchers.totalVouchers
});

export default connect(mapStateToProps, {getVouchers: getVouchers})(Vouchers);