import React, { Component } from 'react';
import '../../resources/home.scss';
import CategoryName from './CategoryName';
import SearchForm from '../shared/SearchForm';

import RestaurantImage from '../../resources/images/restaurant.jpg';
import SpaImage from '../../resources/images/spa.jpg';
import SportImage from '../../resources/images/sports.jpg';
import TravelImage from '../../resources/images/travel.jpg';
import AccessoriesImage from '../../resources/images/accessories.jpg';
import MomImage from '../../resources/images/mom.jpg';
import FoodImage from '../../resources/images/food.jpg';
import FashionImage from '../../resources/images/fashions.jpg';
import HomeImage from '../../resources/images/home.jpg';

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
    console.log('env', process.env.REACT_APP_TOKEN)
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
          <h4 className="text-center home-category-text"><span>Danh mục</span></h4>
          <div className="row">
            <CategoryName
              name="Tất cả"
              image={HomeImage}
            />
            <CategoryName 
              name="Ẩm Thực" 
              image={RestaurantImage}
            />
            <CategoryName 
              name="Du Lịch"
              image={TravelImage}
            />
            <CategoryName 
              name="Giải Trí và Thể Thao"
              image={SportImage}
            />
            <CategoryName 
              name="Spa và Làm đẹp"
              image={SpaImage}
            />

            <CategoryName 
              name="Sức Khỏe và Sắc Đẹp"
              image={SpaImage}
            />
            <CategoryName 
              name="Phụ Kiện - Thiết bị số"
              image={AccessoriesImage}
            />
            <CategoryName 
              name="Mẹ và Bé"
              image={MomImage}
            />
            <CategoryName 
              name="Thực Phẩm"
              image={FoodImage}
            />
            <CategoryName
              name="Thời Trang và Phụ Kiện"
              image={FashionImage}
            />
            <CategoryName
              name="Nhà Cửa và Đời Sống"
              image={HomeImage}
            />
            <CategoryName 
              name="Khác"
              image={AccessoriesImage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
