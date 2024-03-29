import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';

class UpdatePhoneNumberPageForm extends Component {
  constructor(props){
    super(props)

    console.log('props', this.props);

    this.state = {
      phone_number: '',
      error: "",
    }
  }
  static contextTypes = {
    router: PropTypes.object
  };

  handleChange = (e) => {
    this.setState({ 
      error: '',
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.update_phone_number(this.state)
    .then(response => {
      console.log(response);
      this.props.loggedIn(response.data.access_token);
      this.context.router.history.push('/verify');
    })
    .catch(error => {
      this.setState({
        ...this.state,
        error: error.response.data.message
      })
      
      console.log(error.response)
    })
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p className="text-danger">{this.state.error}</p>

        <TextFieldGroup 
          type='text'
          name='phone_number'
          value={this.state.phone_number}
          handleChange={this.handleChange}
          label="Số điện thoại"
        />

        <button className="btn btn-primary">
          Xác nhận >
        </button>
      </form>
    );
  }
}

export default UpdatePhoneNumberPageForm;
