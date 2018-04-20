import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DatePickerField from './DatePickerField';
import { Input } from 'mdbreact';

class TextFieldGroup extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]
    ),
    error: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
  }
  
  static defaultProps = {
    type: 'text',
  }

  renderWithType = () =>{
    const props = this.props;
    switch(props.type){
      case "datepicker":
        return(
          <DatePickerField 
            value={props.value}  
            name={props.name}
            label={props.label}
            handleChange={props.handleChange} />
        );
      default:
        return (
          <Input 
            value={props.value}
            onChange={props.handleChange.bind(this)}
            type={props.type}
            name={props.name}
            label={props.label}
            placeholder={props.label.capitalize()}
            className={classnames('form-control', 
              {'is-invalid': props.error}, 
              {'datepicker': props.type === 'datepicker'})}/>
        );
    }
  }
  render(){
    const props = this.props;
    return(
      <div>
        {this.renderWithType()}
        {props.error && <span className="text-danger">{props.error}</span>}
      </div>
    )
  }
}

export default TextFieldGroup;