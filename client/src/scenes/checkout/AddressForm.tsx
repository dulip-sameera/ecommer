import { CheckoutFormInitialValues } from "@/shared/types";
import {
  formattedError,
  formattedHelper,
  formattedName,
  getValue,
} from "@/utils/formTextFormatting";
import { spawn } from "child_process";
import { FormikErrors, FormikTouched, getIn } from "formik";
import { useEffect, useState } from "react";
import "./address.styles.css";

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
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div>
      <div className="form__address__input_container">
        <div className="form__address__input__box form__address__input__box--firstName">
          <input
            type="text"
            className={` ${
              formattedError("firstName", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("firstName", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].firstName}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("firstName", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("firstName", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            First Name
          </span>
          {formattedError("firstName", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("firstName", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--lastName">
          <input
            type="text"
            className={` ${
              formattedError("lastName", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("lastName", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].lastName}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("lastName", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("lastName", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            Last Name
          </span>
          {formattedError("lastName", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("lastName", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--country">
          <input
            type="text"
            className={` ${
              formattedError("country", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("country", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].country}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("country", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("country", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            Country
          </span>
          {formattedError("country", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("country", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--street1">
          <input
            type="text"
            className={` ${
              formattedError("street1", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("street1", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].street1}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("street1", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("street1", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            Street Address
          </span>
          {formattedError("street1", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("street1", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--street2">
          <input
            type="text"
            className={` ${
              formattedError("street2", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("street2", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].street2}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("street2", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("street2", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            Street Address 2 (Optional)
          </span>
          {formattedError("street2", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("street2", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--city">
          <input
            type="text"
            className={` ${
              formattedError("city", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("city", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].city}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("city", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("city", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            City
          </span>
          {formattedError("city", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("city", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--state">
          <input
            type="text"
            className={` ${
              formattedError("state", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("state", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].state}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("state", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("state", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            State
          </span>
          {formattedError("state", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("state", type, touched, errors)}
            </span>
          )}
        </div>

        <div className="form__address__input__box form__address__input__box--zipCode">
          <input
            type="text"
            className={` ${
              formattedError("zipCode", type, touched, errors)
                ? "form__address__input__box--input-invalid "
                : "form__address__input__box--input"
            }`}
            name={formattedName("zipCode", type)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[type].zipCode}
          />
          <span
            className={`form__address__input__box--span ${
              getValue("zipCode", type, touched, values)
                ? "form__address__input__box--input--contain__value--span"
                : ""
            } ${
              formattedError("zipCode", type, touched, errors)
                ? "form__address__input__box--span-invalid "
                : ""
            }`}
          >
            Zip Code
          </span>
          {formattedError("zipCode", type, touched, errors) && (
            <span className="form__address__input__box--error_message">
              {formattedHelper("zipCode", type, touched, errors)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
