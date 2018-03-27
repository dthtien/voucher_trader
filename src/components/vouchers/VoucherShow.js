import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVoucher, deleteVoucher } from '../../actions/voucher';

class VoucherShow extends Component {
  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  }

  renderVoucherContent = () => {
    if (this.props.loading) {
      return (<h4>Loading...</h4>);
    } else {
      return (<h4>{this.props.voucher.content} - {this.props.voucher.price}</h4>);
    }
  }

  deleteVoucher = () => {
    console.log(this);
  }

  render(){
    console.log(this.props);
    return(
      <div className="container">
        <h1 className="text-center m-3">
          Show Voucher
        </h1>

        {this.renderVoucherContent()}

        <Link to={this.props.match.url} 
          className="btn btn-danger"
          onClick={this.deleteVoucher.bind(this)}> 
          Delete </Link>
      </div>
    );
  } 
}

const mapStateToProps = state => ({
  voucher: state.vouchers.voucher,
  loading: state.vouchers.loading
});

export default connect(mapStateToProps, 
  {
    getVoucher: getVoucher, 
    deleteVoucher: deleteVoucher
  })(VoucherShow);