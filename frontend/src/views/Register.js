import React from "react";
import img from "../assets/pictures/undraw_welcome.svg";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import RegisterForm from "../components/Form/RegisterForm";
import styled from "styled-components";

const StyledLoginWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const StyledLoginContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledLoginImg = styled.img`
  width: 400px;
  margin: 0 50px;
`;

const Register = () => {
  return (
    <StyledLoginWrapper>
      <Navbar />
      <StyledLoginContent>
        <StyledLoginImg src={img} alt={img} />
        <RegisterForm title="Zarejestruj się" />
      </StyledLoginContent>
      <Footer />
    </StyledLoginWrapper>
  );
};

export default Register;
