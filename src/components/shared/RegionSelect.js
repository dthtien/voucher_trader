import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/scss/default.scss';
import {CITIES} from '../../data';

const MAX_CITIES = 6;
const ASYNC_DELAY = 200;

class RegionSelect extends Component{
  onChange  = (value) => {
    this.props.handleChange(value);
  }

  getContributors (input, callback) {
    input = input.toLowerCase();
    var options = CITIES.filter(i => {
      var name = i.acrnomy.substr(0, input.length).toLowerCase();
      var ortherName = i.name.substr(0, input.length).toLowerCase();

      return name === input || ortherName === input;
    });

    var data = {
      options: options.slice(0, MAX_CITIES),
      complete: options.length <= MAX_CITIES,
    };

    setTimeout(function() {
      callback(null, data);
    }, ASYNC_DELAY);
  }

  render () {
    return (
      <div className="section">
        <Select.Async multi joinValues 
          value={this.props.approved_regions} 
          onChange={this.onChange.bind(this)}
          valueKey="region_id" labelKey="name" 
          loadOptions={this.getContributors} />
      </div>
    );
  }
}

export default RegionSelect;