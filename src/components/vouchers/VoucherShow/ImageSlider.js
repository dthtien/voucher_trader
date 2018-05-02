import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';

class ImageSlider extends Component {
  static propTypes = {
    images: PropTypes.array,
  };

  mapToImageGallery = () => {
    if (this.props.images) {
      return this.props.images.map(image => {
        return{
          original: `http://localhost:6060${image.url_origin}`,
          thumbnail: `http://localhost:6060${image.url_medium}`
        }
      });
    } else{
      return []
    }
  }
  render() {
    console.log(this.props.images);
    return (
      <ImageGallery showPlayButton={false} items={this.mapToImageGallery()} />
    );
  }
}

export default ImageSlider;
