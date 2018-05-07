import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryName = (props) => {
  const {image, name, classEmbed} = props
  return(
    <div className="col col-md-3">
      <Link to={`vouchers?cat=${name}`}>
        <img 
          src={image} 
          alt="Cho Voucher"
          className='img-thumbnail img-category'/>
        <div className={`${classEmbed} category-text`}>
          {name}
        </div>
      </Link>
    </div>
  );
}

CategoryName.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  classEmbed: PropTypes.string.isRequired
}

CategoryName.defaultProps = {
  classEmbed: ""
}

export default CategoryName;