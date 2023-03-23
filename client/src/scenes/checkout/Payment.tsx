import { CheckoutFormInitialValues } from "@/shared/types";
import { FormikErrors, FormikTouched } from "formik";
import "./payment.styles.css";
type Props = {
  values: CheckoutFormInitialValues;
  errors: FormikErrors<CheckoutFormInitialValues>;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  touched: FormikTouched<CheckoutFormInitialValues>;
};

const Payment = ({
  values,
  errors,
  handleBlur,
  handleChange,
  touched,
}: Props) => {
  console.log(touched);

  console.log(errors);

  return (
    <div className="form__payment">
      <h1 className="form__payment__input__header">Contact Info</h1>

      <div className="form__payment__input__container">
        <div className="form__payment__input__box">
          <input
            type="text"
            className={` ${
              !!touched.email && !!errors.email
                ? "form__payment__input__box--input-invalid "
                : "form__payment__input__box--input"
            }`}
            name="email"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          <span
            className={`form__payment__input__box--span ${
              // here || is added to set the styles when user press back btn and then come back to this component
              (!!touched.email && !!values.email) || !!values.email
                ? "form__payment__input__box--input--contain__value--span"
                : ""
            } ${
              !!touched.email && !!errors.email
                ? "form__payment__input__box--span-invalid "
                : ""
            }`}
          >
            Email
          </span>
          {!!touched.email && !!errors.email && (
            <span className="form__payment__input__box--error_message">
              {touched.email && errors.email}
            </span>
          )}
        </div>

        <div className="form__payment__input__box form__payment__input__box--lastName">
          <input
            type="text"
            className={` ${
              !!touched.phoneNumber && !!errors.phoneNumber
                ? "form__payment__input__box--input-invalid "
                : "form__payment__input__box--input"
            }`}
            name="phoneNumber"
            id="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <span
            className={`form__payment__input__box--span ${
              // here || is added to set the styles when user press back btn and then come back to this component
              (!!touched.phoneNumber && !!values.phoneNumber) ||
              !!values.phoneNumber
                ? "form__payment__input__box--input--contain__value--span"
                : ""
            } ${
              !!touched.phoneNumber && !!errors.phoneNumber
                ? "form__payment__input__box--span-invalid "
                : ""
            }`}
          >
            Phone Number
          </span>
          {!!touched.phoneNumber && !!errors.phoneNumber && (
            <span className="form__payment__input__box--error_message">
              {touched.phoneNumber && errors.phoneNumber}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
