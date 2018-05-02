import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../resources/home.scss';
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
  render() {
    return (
      <div className="container" id="home">
        <div className="row">
          <div className="col col-md-3">
            <img src={RestaurantImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Ảm thực 
            </div>
          </div>
          <div className="col col-md-3">
            <img src={SpaImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Làm đẹp và đời sông
            </div>
          </div>
          <div className="col col-md-3">
            <img src={SportImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Thể thao giải trí
            </div>
          </div>
          <div className="col col-md-3">
            <img src={TravelImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Du lịch
            </div>
          </div>
          <div className="col col-md-3">
            <img src={AccessoriesImage} className="img-thumbnail img-category"/>
            <div className="category-text text-muted">
              Phụ Kiện- Thiết bị số
            </div>
          </div>
          <div className="col col-md-3">
            <img src={MomImage} className="img-thumbnail img-category"/>
            <div className="category-text text-muted">
              Mẹ & Bé
            </div>
          </div>
          <div className="col col-md-3">
            <img src={FoodImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Thực Phẩm
            </div>
          </div>
          <div className="col col-md-3">
            <img src={FashionImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Thời Trang & Phụ Kiện
            </div>
          </div>
          <div className="col col-md-3">
            <img src={HomeImage} className="img-thumbnail img-category"/>
            <div className="category-text">
              Nhà Cửa & Đời Sống
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
