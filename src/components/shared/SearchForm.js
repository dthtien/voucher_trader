import React, { Component } from 'react';
import '../../resources/search.scss'

class SearchForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.query.value);
    this.props.onSearch(this.query.value);
  }

  render(){
    return(
      <div className='search-box'>
        <form className="search-form" onSubmit={this.handleSubmit.bind(this)}>
          <div id="custom-search-input">
            <div className="input-group col-md-12">
              <input type="text" 
                className="form-control input-lg" 
                placeholder="Type anything...."
                ref={(input) => this.query = input} 
              />
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
}

export default SearchForm;