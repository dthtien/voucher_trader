import React, { Component, PropTypes } from 'react';
import DropZone from 'react-dropzone';
import axios from 'axios';

class FileInput extends Component {
  onDrop = (acceptFiles) => {
    this.props.handleChange(acceptFiles);
  }

  render() {
    return (
      <DropZone onDrop={this.onDrop}>
        <div>
          Drop some files here!
        </div>
      </DropZone>
    );
  }
}

export default FileInput;
