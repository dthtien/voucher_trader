import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const VoucherValidation = values => {
  const errors = {}
  console.log(values);

  if (!values.description) {
    errors.description = 'This field is required';
  }

  if (isEmpty(values.kind) || values.kind === "") {
    errors.kind = 'This field is required';
  }

  if (values.kind !== 'e' && values.kind !== 'general') {
    errors.kind = 'Type is invalid';
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