import React, { Component } from 'react';

class CategoryItem extends Component {
  onClick = (e) => {
    this.props.handleCategoryChange(this.props.id);
  }

  render() {
    const props = this.props
    return (
      <a className="btn" onClick={this.onClick.bind(this)}>
        <i className="material-icons float-left fa-2">restaurant</i>
        <span>{props.name}</span>
        <i className="material-icons float-right">
          {props.id === props.categoryID ? 
            'check' :
            'keyboard_arrow_right'
          }</i>
      </a>
    );
  }
}

export default CategoryItem;
