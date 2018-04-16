import React, {Component} from 'react';
import defaultImage from '../../resources/default-image.jpg'

export default class VoucherImage extends Component{
  render(){
    return(
      <div className="voucher-image mb-2">
        <img src={defaultImage} className="img-thumbnail"/>
      </div>
    )
  }
}