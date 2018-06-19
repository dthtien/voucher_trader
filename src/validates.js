import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export const VoucherValidation = values => {
  const errors = {
  }
  if (Validator.isEmpty(values.name)) {
    errors.name = "This field is required"
  }

  if (values.quantity === '0' || values.quantity === '') {
    errors.quantity = "Quantity must be greater than 0"
  }

  if (JSON.stringify(values.date_start) === JSON.stringify({})) {
    errors.date_start = "This field is required"
  }

  if (JSON.stringify(values.date_end) === JSON.stringify({})) {
    errors.date_end = "This field is required"
  }

  if (values.date_start > values.date_end) {
    errors.date_end = "End date must greater than start date"
  }

  if (Validator.isEmpty(values.kind)) {
    errors.kind = 'This field is required';
  }

  if (Validator.isEmpty(values.price)) {
    errors.price = 'This field is required';
  }

  if (Validator.isEmpty(values.origin_price)) {
    errors.origin_price = 'This field is required';
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


  if (values.kind === 'general' && Validator.isEmpty(values.address_receiver)){
    errors.address_receiver = 'This field is required'
  }

  if (values.kind === 'general' && (values.image_ids.length < 1)) {
    errors.image_ids = 'Voucher must be have grester than 1 images'
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

export const loginValidation = values => {
  let errors = {};
  
  if (Validator.isEmpty(values.email)) {
    errors.email = "This field is required";
  }

  if (!Validator.isEmail(values.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(values.password)) {
    errors.password = "This field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}



export const signupValidation = values => {
  let errors = {};


  if (Validator.isEmpty(values.password)) {
    errors.password = "This field is required"
  }

  if (Validator.isEmpty(values.name)) {
    errors.name = "This field is required"
  }

   if (Validator.isEmpty(values.phone_number)) {
    errors.phone_number = "This field is required"
  }

  // if (JSON.stringify(values.date_of_birth) === JSON.stringify({})) {
  //   errors.date_of_birth = "This field is required"
  // }

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