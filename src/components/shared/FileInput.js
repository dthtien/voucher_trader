import React, { Component } from 'react';
import DropZone from 'react-dropzone';

class FileInput extends Component {
  onDrop = (acceptFiles) => {
    this.props.handleChange(acceptFiles);
  }

  onDelete = (e, value) => {
    e.preventDefault()
    this.props.handleDeleteFile(value)
  }

  renderImage = () =>{
    const {values} = this.props
    if (values.length > 0) {
      return values.map(value => {
        return(
          <div className="col col-md-3" key={value.id}>
            <a onClick={e => {this.onDelete(e, value)}}
              className="deleteImage"
            >
              <i className="fa fa-trash"></i>
            </a>
            <img 
              src={value.url_medium} alt="cho-voucher"
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
            <span>(ít nhất 1 hình)</span>
          </div>
        </DropZone>
        </div>
      </div>
    );
  }
}

export default FileInput;
