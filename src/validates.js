import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const VoucherValidation = values => {
  const errors = {}
  if (!values.descriptions) {
    errors.descriptions = 'Required';
  } else if(!/^\S+$/.test(values.descriptions)){
    errors.descriptions = "Must not have white space";
  }
  if (!values.kind) {
    errors.kind = 'Required';
  } else if (!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(values.kind)) {
    errors.kind = 'Must be a number';
  }

  return errors
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

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "This field is not match to password"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}