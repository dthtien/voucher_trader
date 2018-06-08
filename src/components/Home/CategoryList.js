import React from 'react';
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

const CategoryList = (props) => {
  return(
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
  );
}

export default CategoryList;