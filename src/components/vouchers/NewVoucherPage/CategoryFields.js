import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import '../../../resources/categories.scss'

class CategoryFields extends Component {
  componentWillMount(){
    this.props.getCategories();
  }

  constructor(props) {
    super(props);
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
      <div className='col-md-4 offset-md-4'>
        <div className="btn-group-vertical categories">
          <h4 className="font-weight-bold mb-3">
            Mời bạn chọn danh mục</h4>
            {this.props.isLoading ? 
              <h3>Loading..</h3> :
              this.renderCategoriesList()
            }
        </div>
      </div>
    );
  }
}

export default CategoryFields;