import React, { Component } from 'react';

class CategoryItem extends Component {
  onClick = (e) => {
    this.props.handleCategoryChange(this.props.id);
  }


  render() {
    const props = this.props
    return (
      <a className="btn btn-category-voucher" onClick={this.onClick.bind(this)}>  
        <span>{props.name}</span>
          {props.id === props.categoryID ? 
            <i className="fa fa-check float-right text-success"></i> :
            <i className="fa fa-angle-right float-right"></i>
          }
      </a>
    );
  }
}

export default CategoryItem;
