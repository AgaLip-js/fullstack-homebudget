import React from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledWrapper = styled.div`
  background-color: grey;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 16;
`;
const StyledContainer = styled.div`
  position: fixed;
  top: 25%;
  left: 0;
  width: 100%;
  /* height: 50%; */
  background-color: white;
  z-index: 16;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
`;
const StyledTitle = styled.p`
  margin: 20px 0px;
`;

const WarningModal = ({ title, removeAcc, warningModalClose, newWallet }) => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledHeader>
          <Button primary onClick={() => removeAcc(newWallet)}>
            Tak
          </Button>
          <Button primary onClick={warningModalClose}>
            Anuluj
          </Button>
        </StyledHeader>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default WarningModal;
