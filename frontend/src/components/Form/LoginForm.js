import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import styled from "styled-components";

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

const LoginForm = ({ title, setAuth }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          axios
            .post("/user/login", {
              email: values.email,
              password: values.password,
            })
            .then((res) => {
              console.log(res);
              console.log(res.data);
              // if (data.token) {
              //   localStorage.setItem("token", data.token);
              //   setAuth(true);
              //   console.log(data.token);
              //   toast.success("Logged in Successfully");
              // } else {
              //   setAuth(false);
              //   toast.error(data);
              // }
            })
            .catch((err) => {
              console.log("error");
              alert(err);
            });
          setSubmitting(false);
        }, 400);
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
      }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledTitle>{title}</StyledTitle>
          <StyledFormControl>
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
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              htmlFor="password"
              title="Hasło"
            />
          </StyledFormControl>
          <Button type="submit" disabled={isSubmitting}>
            Zatwiedź
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
