import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryName = (props) => {
  const {image, name} = props
  return(
    <div className="col col-sm-6 col-xs-6 col-md-3">
      <div className='category-detail'>
        <Link to={`vouchers?cat=${name}`}>
          <img 
            src={image} 
            alt="Cho Voucher"
            className='img-thumbnail img-category'/>
          <div className={`category-text`}>
            {name}
          </div>
        </Link>
      </div>
    </div>
  );
}

CategoryName.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default CategoryName;