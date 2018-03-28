import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVoucher, deleteVoucher } from '../../actions/voucher';

class VoucherShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  };
  
  renderVoucherContent = () => {
    if (this.props.loading) {
      return (<h4>Loading...</h4>);
    } else {
      return (
        <h4>
          {this.props.voucher.content} - {this.props.voucher.price}
        </h4>);
    }
  }

  deleteVoucher = () => {
    const id = this.props.match.params.id;
    console.log(this.props);
    this.props.deleteVoucher(id, () => {
      this.context.router.history.push('/')
    });
  }

  render(){
    return(
      <div className="container">
        <h1 className="text-center m-3">
          Show Voucher
        </h1>

        {this.renderVoucherContent()}
        
        <a className="btn btn-danger"
          onClick={ () => {
            if(window.confirm('Delete the item?')){
              this.deleteVoucher();
            }
          }}> Delete </a>
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