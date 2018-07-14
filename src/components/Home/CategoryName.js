import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const CategoryName = props => {
  const { image, name, vouchersCount } = props;
  
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="category-home">
        <div className="container-image-category-home">
          <Link to={`vouchers?cat=${name}`} className="img-category-home" style={{backgroundImage : `url(${image})`}} />
        </div>
        <div className="bottom-home-category">
          <div>
            <span className="text-category">
              {name}
            </span>
            <Link to={`vouchers?cat=${name}`} className="link-category-home"> Xem ngay 
              {(vouchersCount !== undefined) ? 
                `(${vouchersCount})` : ''
              } 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryName.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default CategoryName;
