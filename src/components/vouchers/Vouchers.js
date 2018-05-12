import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import Voucher from './Voucher';
import SlideBar from '../shared/SlideBar';
import '../../resources/vouchers.scss';
import { hasKey } from "../utils/utils";
import SearchForm from '../shared/SearchForm';
import Spinner from '../shared/Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import qs from 'querystringify';


class Vouchers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cat: '',
      q: '',
      page: 1,
      totalPage: null,
      vouchers: [],
      hasMore: true
    }
  }

  componentDidMount(){
    const query = qs.parse(this.props.location.search)
    console.log(query);

    if (decodeURIComponent(query.cat) === 'Tất cả') {
      this.props.getVouchers({cat: '', q: query.q});
    } else{
      this.setState({
        query
      })

      this.props.getVouchers(query);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps !== "undefined" &&
      nextProps !== this.props &&
      hasKey(nextProps.vouchers)
    ) {
      const vouchers = [...this.state.vouchers, ...nextProps.vouchers];
      if (this.state.page === 2) {
        this.setState({ 
          ...this.state,
          vouchers: nextProps.vouchers,
        });
      } else {
        if (nextProps.totalVouchers !== this.state.vouchers.length) {
          this.setState({ 
            ...this.state,
            vouchers: vouchers,
            totalPage: Math.round(nextProps.totalVouchers / 25)
          });
        }
      }

    }
  }

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
    })

    this.props.getVouchers(this.state);
  }

  handleLoadMore = (page) => {
    if (this.state.page <= this.state.totalPage-1) {
      this.setState({
        ...this.state,
        page: this.state.page + 1
      })

      this.props.getVouchers(this.state);
    } else{
      this.setState({
        ...this.state,
        hasMore: false
      })
    }
  }

  renderVoucherList = () => {
    if (this.state.vouchers.length === 0) {
      return (
        <Spinner key={0} />
       );
    } else {
      const vouchersList = this.state.vouchers.map((voucher, index) => {
        return <Voucher key={index} voucher={voucher} />;
      });
      return(
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleLoadMore.bind(this)}
          hasMore={this.state.hasMore}
          loader={
            <Spinner key={1} />
          }
          className="row">
          {vouchersList}
        </InfiniteScroll>
      );
    }
  }
  
  render() {
    return (
      <div className="vouchers">
        <div className="vouchers-banner overlay full" style={{
            backgroundImage: `url('http://htmlbeans.com/html/coupon/images/img30.jpg')`,
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
          <div className="mt-1">
            {this.renderVoucherList()}
          </div>
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