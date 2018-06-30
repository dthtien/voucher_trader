import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';

class ImageSlider extends Component {
  static propTypes = {
    sourceImages: PropTypes.array,
    images: PropTypes.array,
  };

  static defaultProps = {
    images: [
      {
        url_origin: 'http://envato.megadrupal.com/html/couponday/images/ex/01_banner.jpg',
        url_medium: 'http://envato.megadrupal.com/html/couponday/images/ex/01_banner.jpg'
      },
      {
        url_origin: 'http://envato.megadrupal.com/html/couponday/images/ex/01_banner.jpg',
        url_medium: 'http://envato.megadrupal.com/html/couponday/images/ex/01_banner.jpg'
      },
    ]
  }

  mapToImageGallery = () => {
    if (this.props.images) {
      return this.props.images.map(image => {
        return{
          original: image.url_origin,
          thumbnail: image.url_medium
        }
      });
    } else{
      return []
    }
  }
  render() {
    return (
      <ImageGallery showPlayButton={false} items={this.mapToImageGallery()} />
    );
  }
}



export default ImageSlider;
