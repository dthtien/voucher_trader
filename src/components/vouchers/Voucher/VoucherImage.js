import React, {Component} from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../resources/default-image.jpg'

export default class VoucherImage extends Component{
  static propTypes= {
    images: PropTypes.array.isRequired
  }

  renderImage = () =>{
    const {images} = this.props;
    console.log(images);
    
    if (images.length === 0) {
      return(
        <img 
          src={defaultImage} 
          className="img-thumbnail" 
          alt="Cho Voucher"/>
      );
    } else {
      return(
        <img src={`http://localhost:6060${images[0].url_medium}`}
          className="img-thumbnail" 
          alt="Cho Voucher"/>
      );
    }
  }

  render(){
    return(
      <div className="voucher-image mb-2">
        {this.renderImage()}
      </div>
    );
  }
}