import { FormikTouched, FormikErrors, getIn } from "formik";

// // these functions allow for better code readability
function formattedName(field: string, type: string) {
  return `${type}.${field}`;
}

function formattedError<T>(
  field: string,
  type: string,
  touched: FormikTouched<T>,
  errors: FormikErrors<T>
) {
  return Boolean(
    getIn(touched, formattedName(field, type)) &&
      getIn(errors, formattedName(field, type))
  );
}

function formattedHelper<T>(
  field: string,
  type: string,
  touched: FormikTouched<T>,
  errors: FormikErrors<T>
) {
  return (
    getIn(touched, formattedName(field, type)) &&
    getIn(errors, formattedName(field, type))
  );
}

function getValue<T>(
  field: string,
  type: string,
  touched: FormikTouched<T>,
  values: T
) {
  return (
    getIn(touched, formattedName(field, type)) &&
    getIn(values, formattedName(field, type))
  );
}

export { formattedError, formattedHelper, formattedName, getValue };
