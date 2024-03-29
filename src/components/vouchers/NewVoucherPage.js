import React, {Component} from 'react';
import VoucherFormPage from './VoucherFormPage';

class NewVoucherPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      store: {
        name: '',
        showStoreName: false,
        address: '',
        category_id: -1
      },

      voucher: {
        name: '',
        voucher_number: '',
        quantity: '1',
        date_start: {},
        date_end: {},
        instruction: '',
        approved_condition: '',
        kind: '',
        description: '',
        price: '',
        origin_price: '',
        code: '',
        address_receiver: '',
        post_to_facebook: false,
        image_ids: [],
        images: [],
        approved_regions_attributes: []
      },
    }
  }

  render(){
    return(<VoucherFormPage data={this.state}  />);
  }
}

export default NewVoucherPage;