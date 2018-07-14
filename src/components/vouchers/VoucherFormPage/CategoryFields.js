import React, { Component, Fragment } from 'react';
import CategoryItem from './CategoryItem';
import '../../../resources/categories.scss'

class CategoryFields extends Component {
  componentWillMount(){
    this.props.getCategories();
  }

  renderCategoriesList(){
    return this.props.categories.map(category => {
      return(
        <CategoryItem 
          key={category.id}
          id={category.id}
          name={category.name} 
          handleCategoryChange={this.props.handleCategoryChange}
          categoryID={this.props.categoryID}/>
      );
    })
  }

  render() {
    return (
      <Fragment>
        <div className="col-12 col-md-12 text-center">
          <h4 className="title-category-voucher"> Mời bạn chọn danh mục</h4>
        </div>
        <div className='col-md-6 offset-md-3 mt-2 mb-2'>
          <div className="btn-group-vertical categories">
              {this.props.isLoading ? 
                <h3>Loading..</h3> :
                this.renderCategoriesList()
              }
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CategoryFields;