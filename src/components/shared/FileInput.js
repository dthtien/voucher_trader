import React, { Component, PropTypes } from 'react';
import DropZone from 'react-dropzone';
import axios from 'axios';

class FileInput extends Component {
  onDrop = (acceptFiles) => {
    this.props.handleChange(acceptFiles);
  }

  renderImage = () =>{
    const {values} = this.props
    if (values.length > 0) {
      return values.map(value => {
        return(
          <div className="col col-md-3" key={value.id}>
            <img 
              src={`http://localhost:6060${value.url_medium}`} alt="cho-voucher"
              className="img-thumbnail"
            />
          </div>
        );
      });
    }
  } 

  render() {
    return (
      <div className="uploadImage">
        <div className="row">
        {this.renderImage()}
        <DropZone onDrop={this.onDrop} className="col col-md-3 fileuploader">
          <div className="text-center align-middle">
            <p>Click hoặc kéo hình bạn muốn đăng vào đây</p>
            <span>(ít nhất 2 hình)</span>
          </div>
        </DropZone>
        </div>
      </div>
    );
  }
}

export default FileInput;
