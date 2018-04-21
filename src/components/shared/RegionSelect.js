import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/scss/default.scss';
import {CITIES} from '../../data';

const MAX_CITIES = 6;
const ASYNC_DELAY = 500;

class RegionSelect extends Component{
  constructor(props){
    super(props);
    this.state={
      value: ""
    }
  }

  onChange  = (value) => {
    this.setState({
      value: value,
    });
  }

  getContributors (input, callback) {
    input = input.toLowerCase();
    var options = CITIES.filter(i => {
      return i.github.substr(0, input.length) === input;
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
        <Select.Async multi value={this.state.value} onChange={this.onChange} onValueClick={this.gotoContributor} valueKey="github" labelKey="name" loadOptions={this.getContributors} />
      </div>
    );
  }
}

export default RegionSelect;