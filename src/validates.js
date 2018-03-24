export const VoucherValidation = values => {
  const errors = {}
  if (!values.content) {
    errors.content = 'Required';
  } else if(!/^\S+$/.test(values.content)){
    errors.content = "Must not have white space";
  }
  if (!values.price) {
    errors.price = 'Required';
  } else if (!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(values.price)) {
    errors.email = 'Must be a number';
  }

  return errors
}