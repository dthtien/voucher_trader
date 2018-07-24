import React, {Component} from 'react';
import CategoryName from './CategoryName';
import {getCategories} from '../../actions/category';
import { connect } from 'react-redux';
import Spinner from '../shared/Spinner';

class CategoryList extends Component {
  componentWillMount(){
    this.props.getCategories();
  }

  renderCategoriesList = () => {
    if (this.props.isLoading) {
      return <Spinner />
    } else {
      const IMAGE_URL = 'https://s3-ap-southeast-1.amazonaws.com/voucher-trader/';
      return this.props.categories.map(category => (
        <CategoryName
          key={category.id}
          name={category.name} 
          image={`${IMAGE_URL}${category.path}`}
          vouchersCount={category.vouchers_count}
        />
      ));
    }
  }
  render(){
    const IMAGE_URL = 'https://s3-ap-southeast-1.amazonaws.com/voucher-trader/';
    return(
      <div className="row">
        <CategoryName
          name="Tất cả"
          image={`${IMAGE_URL}home.jpg`}
        />
        {this.renderCategoriesList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.categories.isLoading,
  categories: state.categories.categories
})

export default connect(mapStateToProps, {getCategories})(CategoryList);
