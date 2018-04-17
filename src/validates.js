import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const VoucherValidation = values => {
  const errors = {
  }

  if (Validator.isEmpty(values.description)) {
    errors.description = 'This field is required';
  }

  if (Validator.isEmpty(values.kind)) {
    errors.kind = 'This field is required';
  }

  if (Validator.isEmpty(values.price)) {
    errors.price = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export const VoucherMoreInfoValidation = (values) =>{
  const errors = {}
  if (values.kind !== 'e' && values.kind !== 'general') {
    errors.kind = 'Type is invalid';
  }

  if (values.kind === 'e' && Validator.isEmpty(values.code)) {
    errors.code="This field is required"
  }


  if (values.kind === 'general' && Validator.isEmpty(values.address_receiver)) {
    errors.address_receiver = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export const StoreValidation = (values) => {
  const errors = {}

  if (Validator.isEmpty(values.name)) {
    errors.name = "This field is required"
  }

  if (Validator.isEmpty(values.address)) {
    errors.address = "This field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }; 
}



export const signupValidation = values => {
  let errors = {};

  if (Validator.isEmpty(values.email)) {
    errors.email = "This field is required"
  }

  if (Validator.isEmpty(values.password)) {
    errors.password = "This field is required"
  }

  if (!Validator.isEmail(values.email)) {
    errors.email = 'Email is invalid'
  }

  if (values.password_confirmation && values.password !== values.password_confirmation) {
    errors.password_confirmation = "This field is not match to password"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}