import React, { Component } from 'react';

class CategoryItem extends Component {
  onClick = (e) => {
    this.props.handleCategoryChange(this.props.id);
  }

  renderCategoryIcon = () =>{
    switch(this.props.name){
      case "Ẩm Thực":
        return (<i className="material-icons float-left">restaurant</i>);
      case "Spa và Làm đẹp":
        return <i className="material-icons float-left">face</i>;
      case "Giải Trí và Thể Thao":
        return (<i className="material-icons float-left">gamepad</i>);
      case "Du Lịch":
        return (<i className="material-icons float-left">flight</i>);
      case "Thời Trang và Phụ Kiện":
        return (<i className="material-icons float-left">shopping_basket</i>);
      case "Mẹ và Bé":
        return (<i className="material-icons float-left">pregnant_woman</i>);
      case "Thực Phẩm":
        return (<i className="material-icons float-left">free_breakfast</i>);
      case "Sức Khỏe và Sắc Đẹp":
        return (<i className="material-icons float-left">accessibility</i>);
      case "Phụ Kiện - Thiết bịsố":
        return (<i className="material-icons float-left">phonelink</i>);
      default:
        return (<i className="material-icons float-left">home</i>);
    }
  }

  render() {
    const props = this.props
    return (
      <a className="btn btn-category-voucher" onClick={this.onClick.bind(this)}>
        {this.renderCategoryIcon()}
        <span>{props.name}</span>
          {props.id === props.categoryID ? 
            <i className="material-icons float-right text-success">check</i> :
            <i className="material-icons float-right">keyboard_arrow_right</i>
          }
      </a>
    );
  }
}

export default CategoryItem;
