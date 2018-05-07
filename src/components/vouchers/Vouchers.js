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
    const query = this.props.location.search ? this.props.location.search.match(/^\?cat=(.+)$/)[1] : "";

    if (decodeURIComponent(query) === 'Tất cả') {
      this.props.getVouchers();
    } else{
      this.setState({
        ...this.state,
        cat: query
      })

      this.props.getVouchers({cat: query});
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps !== "undefined" &&
      nextProps !== this.props &&
      hasKey(nextProps.vouchers)
    ) {
      const vouchers = [...this.state.vouchers, ...nextProps.vouchers];
      console.log(this.state.page);
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
      console.log('renderVoucher => ', this.state.vouchers)
      const vouchersList = this.state.vouchers.map((voucher, index) => {
        return <Voucher key={index} voucher={voucher} />;
      });
      return(
        <div className="voucher-list">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.handleLoadMore.bind(this)}
            hasMore={this.state.hasMore}
            loader={
              <Spinner key={1} />
            }
          >
            {vouchersList}
          </InfiniteScroll>
        </div>
      );
    }
  }
  
  render() {
    return (
      <div className="vouchers">
        <div className="row">
          <div className="col col-md-8 offset-md-2">
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