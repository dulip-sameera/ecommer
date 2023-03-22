import { CheckoutFormInitialValues } from "@/shared/types";
import { spawn } from "child_process";
import { FormikErrors, FormikTouched, getIn } from "formik";
import "./shipping.styles.css";

type Type = "billingInformation" | "shippingInformation";

type Props = {
  type: Type;
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

const AddressForm = ({
  type,
  values,
  errors,
  handleBlur,
  handleChange,
  touched,
}: Props) => {
  // these functions allow for better code readability
  const formattedName = (field: string) => `${type}.${field}`;

  const formattedError = (field: string) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field: string) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  const getValue = (field: string) =>
    getIn(touched, formattedName(field)) && getIn(values, formattedName(field));
  return (
    <div>
      <div className="form__shipping__input_container">
        <div className="form__shipping__input__box form__shipping__input__box--firstName">
          <input
            type="text"
            className={` ${
              formattedError("firstName")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("firstName")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].firstName}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("firstName")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("firstName")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            First Name
          </span>
          {formattedError("firstName") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("firstName")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--lastName">
          <input
            type="text"
            className={` ${
              formattedError("lastName")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("lastName")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].lastName}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("lastName")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("lastName")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            Last Name
          </span>
          {formattedError("lastName") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("lastName")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--country">
          <input
            type="text"
            className={` ${
              formattedError("country")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("country")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].country}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("country")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("country")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            Country
          </span>
          {formattedError("country") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("country")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--street1">
          <input
            type="text"
            className={` ${
              formattedError("street1")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("street1")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].street1}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("street1")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("street1")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            Street Address
          </span>
          {formattedError("street1") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("street1")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--street2">
          <input
            type="text"
            className={` ${
              formattedError("street2")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("street2")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].street2}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("street2")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("street2")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            Street Address 2 (Optional)
          </span>
          {formattedError("street2") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("street2")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--city">
          <input
            type="text"
            className={` ${
              formattedError("city")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("city")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].city}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("city")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("city")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            City
          </span>
          {formattedError("city") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("city")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--state">
          <input
            type="text"
            className={` ${
              formattedError("state")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("state")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].state}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("state")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("state")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            State
          </span>
          {formattedError("state") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("state")}
            </span>
          )}
        </div>

        <div className="form__shipping__input__box form__shipping__input__box--zipCode">
          <input
            type="text"
            className={` ${
              formattedError("zipCode")
                ? "form__shipping__input__box--input-invalid "
                : "form__shipping__input__box--input"
            }`}
            name={formattedName("zipCode")}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].zipCode}
          />
          <span
            className={`form__shipping__input__box--span ${
              getValue("zipCode")
                ? "form__shipping__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("zipCode")
                ? "form__shipping__input__box--span-invalid "
                : ""
            }`}
          >
            Zip Code
          </span>
          {formattedError("zipCode") && (
            <span className="form__shipping__input__box--error_message">
              {formattedHelper("zipCode")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
