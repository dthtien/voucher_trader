import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// const CategoryName = (props) => {
//   const {image, name, classEmbed} = props
//   return(
//     <div className="col col-sm-6 col-xs-6 col-md-3">
//       <div className='category-detail'>
//         <Link to={`vouchers?cat=${name}`}>
//           <img
//             src={image}
//             alt="Cho Voucher"
//             className='img-thumbnail img-category'/>
//           <div className={`category-text`}>
//             {name}
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

const CategoryName = props => {
  const { image, name } = props;
  return (
    <div className="col-lg-3 col-md-3 col-sm-6">
      <div className="category-home">
        <div className="container-image-category-home">
          <Link to={`vouchers?cat=${name}`} className="img-category-home" style={{backgroundImage : `url(${image})`}} />
        </div>
        <div className="bottom-home-category">
          <div>
            <span className="text-category">{name}</span>
            <Link to={`vouchers?cat=${name}`} className="link-category-home"> Xem ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryName.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  classEmbed: PropTypes.string.isRequired
};

CategoryName.defaultProps = {
  classEmbed: ""
};

export default CategoryName;
