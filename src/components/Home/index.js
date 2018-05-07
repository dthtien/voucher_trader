import React, { Component } from 'react';
import '../../resources/home.scss';
import CategoryName from './CategoryName';

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
          <CategoryName
            name="Tất cả"
            image={HomeImage}
          />
          <CategoryName 
            name="Ẩm Thực" 
            image={RestaurantImage}
          />
          <CategoryName 
            name="Làm đẹp và đời sông"
            image={SpaImage}
          />
          <CategoryName 
            name="Giải Trí và Thể Thao"
            image={SportImage}
          />
          <CategoryName 
            name="Du lịch"
            image={TravelImage}
          />
          <CategoryName 
            name="Phụ Kiện- Thiết bị số"
            image={AccessoriesImage}
            classEmbed="text-muted"
          />
          <CategoryName 
            name="Mẹ và Bé"
            image={MomImage}
            classEmbed="text-muted"
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
        </div>
      </div>
    );
  }
}

export default Home;
