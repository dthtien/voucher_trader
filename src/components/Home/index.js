import React, { Component } from 'react';
import '../../resources/home.scss';
import CategoryList from './CategoryList';
import SearchForm from '../shared/SearchForm';
import NewestVouchers from './NewestVouchers';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: ''
    }
  }

  handleTextChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  handleSearchSubmit = () => {
    this.props.history.push(`/vouchers?q=${this.state.searchText}`)
  }

  render() {
    return (
      <div id="home">
        <div className = "full overlay white-text text-center" 
          style={{
            backgroundImage: `url('http://htmlbeans.com/html/coupon/images/img29.jpg')`,
          }} 
          >
          <div className="row">
            <div className="col-sm-12">
              <div className="banner-text">
                <h2>Tìm mã giảm gía và deals rẻ</h2>
                <h5>Hơn 3000+ của hàng có tại đây</h5>
              </div>
            </div>
            <div className="col-sm-12">
              <div className=" container home-search">
                <SearchForm 
                  onSearch={this.handleSearchSubmit}
                  searchText = {this.state.searchText}
                  handleTextChange={this.handleTextChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h4 className="text-center home-category-text">
            <span>Danh mục</span>
          </h4>
          <CategoryList />

          <h4 className="text-center home-category-text">
            <span>Mã gỉam gía mới nhất</span>
          </h4>

          <NewestVouchers />
        </div>
      </div>
    );
  }
}

export default Home;
