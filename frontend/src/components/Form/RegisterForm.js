import React from "react";
import { Formik } from "formik";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";
import { register } from "../../redux/actions/authActions";
import store from "../../redux/store/store";

const StyledForm = styled.form`
  position: relative;
  background: ${({ theme }) => theme.whitecolor};
  width: 500px;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(black, 0.1);
  box-sizing: border-box;
  padding: 40px;
  overflow: hidden;
`;
const StyledTitle = styled.h2`
  margin-bottom: 20px;
`;
const StyledFormControl = styled.div`
  margin: 20px 0;
`;

const RegisterForm = ({ title }) => {
  return (
    <Formik
      initialValues={{ login: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        //   return errors;
        if (!values.login) {
          errors.login = "Required";
        } else if (!/^[A-Z0-9._%+-]{2,}$/i.test(values.login)) {
          errors.login = "Invalid login";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (!/^[A-Z0-9._%+-]{2,}$/i.test(values.password)) {
          errors.password = "Invalid password";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const newUser = {
            login: values.login,
            email: values.email,
            password: values.password,
          };

          store.dispatch(register(newUser));
          setSubmitting(false);
        }, 100);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledTitle>{title}</StyledTitle>
          <StyledFormControl>
            <Input
              type="text"
              name="login"
              id="login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
              htmlFor="login"
              title="Nazwa użytkownika"
            />
            {errors.login && touched.login && errors.login}
            <Input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              htmlFor="email"
              title="Email"
            />
            {errors.email && touched.email && errors.email}
            <Input
              className="login-inputPassword"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              htmlFor="password"
              title="Hasło"
            />
            {errors.password && touched.password && errors.password}
          </StyledFormControl>
          <Button type="submit" disabled={isSubmitting}>
            Zatwiedź
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RegisterForm;
