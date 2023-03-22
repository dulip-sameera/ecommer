import { CheckoutFormInitialValues } from "@/shared/types";
import { FormikErrors, FormikTouched } from "formik";
import AddressForm from "./AddressForm";
import "./shipping.styles.css";

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
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const Shipping = ({
  values,
  errors,
  handleBlur,
  handleChange,
  touched,
  setFieldValue,
}: Props) => {
  return (
    <div className="form__shipping">
      <h1 className="form__shipping__input__header">Billing Information</h1>
      <AddressForm
        type="billingInformation"
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />

      <div className="form__shipping__checkbox">
        <label
          htmlFor="sameAsShippingAddress"
          className="form__shipping__checkbox--label"
        >
          <input
            type="checkbox"
            id="sameAsShippingAddress"
            className="form__shipping__checkbox--input"
            onChange={() =>
              setFieldValue(
                "shippingInformation.isSameAddress",
                !values.shippingInformation.isSameAddress
              )
            }
            checked={values.shippingInformation.isSameAddress}
          />
          <span className="form__shipping__checkbox--text">
            Same for Shipping Address
          </span>
        </label>
      </div>

      {!values.shippingInformation.isSameAddress && (
        <div className="form__shipping">
          <h1 className="form__shipping__input__header">
            Shipping Information
          </h1>
          <AddressForm
            type="shippingInformation"
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default Shipping;
