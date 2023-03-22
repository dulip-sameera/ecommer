import { CheckoutFormInitialValues } from "@/shared/types";
import { Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { useState } from "react";
import * as Yup from "yup";
import "./checkout.styles.css";
import Shipping from "./Shipping";

const initialValues: CheckoutFormInitialValues = {
  billingInformation: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingInformation: {
    // isSameAddress is here because when validating using Yup it needs to be in the same level as the other fields to create a condition to validate those fields only when the isSameAddress false
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const validationSchema = [
  Yup.object({
    billingInformation: Yup.object().shape({
      firstName: Yup.string().required("required"),
      lastName: Yup.string().required("required"),
      country: Yup.string().required("required"),
      street1: Yup.string().required("required"),
      street2: Yup.string(),
      city: Yup.string().required("required"),
      state: Yup.string().required("required"),
      zipCode: Yup.string().required("required"),
    }),
    shippingInformation: Yup.object({
      isSameAddress: Yup.boolean(),
      firstName: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("required"),
      }),
      lastName: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => {
          return schema.required("required");
        },
      }),
      country: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("required"),
      }),
      street1: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("required"),
      }),
      street2: Yup.string(),
      city: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("required"),
      }),
      state: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("required"),
      }),
      zipCode: Yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("required"),
      }),
    }),
  }),
  Yup.object().shape({
    email: Yup.string().required(),
    phoneNumber: Yup.string().required(),
  }),
];

enum FORM_STEP {
  BILLING = 0,
  PAYMENT = 1,
}

type Props = {};

const Checkout = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(FORM_STEP.BILLING);
  const handleSubmit = (
    values: CheckoutFormInitialValues,
    actions: FormikHelpers<CheckoutFormInitialValues>
  ) => {
    setCurrentStep(FORM_STEP.PAYMENT);
    // copies the billing address onto shipping address
    if (
      currentStep === FORM_STEP.BILLING &&
      values.shippingInformation.isSameAddress
    ) {
      actions.setFieldValue("shippingInformation", {
        ...values.billingInformation,
        isSameAddress: true,
      });
    }

    console.log(currentStep);

    console.log(values);
    console.log(actions);
  };

  return (
    <section className="checkout__form">
      <div className="checkout__form__container">
        {/* STEP DISPLAY */}
        <div className="checkout__form__step__container">
          <div
            className={`checkout__form_step ${
              currentStep === FORM_STEP.BILLING
                ? "checkout__form__step--selected"
                : ""
            }`}
          >
            Billing
          </div>

          {/* Line */}
          <span className="checkout__form__step__divider--line"></span>

          <div
            className={`checkout__form_step ${
              currentStep === FORM_STEP.PAYMENT
                ? "checkout__form__step--selected"
                : ""
            }`}
          >
            Payment
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema[currentStep]}
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {currentStep === FORM_STEP.BILLING && (
                <Shipping
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}
              {currentStep === FORM_STEP.BILLING && (
                <button type="submit" className="checkout__form__btn">
                  NEXT
                </button>
              )}

              {currentStep === FORM_STEP.PAYMENT && (
                <div>
                  <button
                    className="checkout__form__btn"
                    onClick={() => setCurrentStep(FORM_STEP.BILLING)}
                  >
                    BACK
                  </button>
                  <button type="submit" className="checkout__form__btn">
                    PLACE ORDER
                  </button>
                </div>
              )}
            </form>
          )}
          {/* if step 1 then Step 1 form */}
          {/* if step 2 then Step 2form */}
          {/* if step 1 show next button */}
          {/* if step 2 show two buttons prev and place order */}
        </Formik>
      </div>
    </section>
  );
};

export default Checkout;
