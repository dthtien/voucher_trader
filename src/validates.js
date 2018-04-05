import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const VoucherValidation = values => {
  const errors = {}
  if (!values.description) {
    errors.description = 'This field is required';
  } else if(!/^\S+$/.test(values.description)){
    errors.description = "Must not have white space";
  }
  if (!values.kind) {
    errors.kind = 'This field is required';
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

  if (values.password_confirmation && values.password !== values.password_confirmation) {
    errors.password_confirmation = "This field is not match to password"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}