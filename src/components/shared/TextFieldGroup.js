import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TextFieldGroup extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.bool]
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
      case "textarea":
      return (
        <textarea 
          value={props.value}
          onChange={props.handleChange.bind(this)}
          type={props.type}
          name={props.name}
          placeholder={props.label.capitalize()}
          className={classnames('form-control', 
            {'is-invalid': props.error})}/>
      )
      default:
        return (
          <input 
            value={props.value}
            onChange={props.handleChange.bind(this)}
            type={props.type}
            name={props.name}
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
      <div className='form-group'>
        <label className='control-label font-weight-bold'> 
          {props.label.toTitlelize()}</label>
        {this.renderWithType()}
        {props.error && <span className="text-danger">{props.error}</span>}
      </div>
    )
  }
}

export default TextFieldGroup;