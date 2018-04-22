import React from 'react';
import '../../resources/search.scss'

const SearchForm = (props) => {
  return(
    <div className='search-box'>
      <form className="search-form">
        <div id="custom-search-input">
          <div className="input-group col-md-12">
            <input type="text" className="form-control input-lg" placeholder="Type anything...." />
            <span className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button">
                    <i className="fa fa-search"></i>
                </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;