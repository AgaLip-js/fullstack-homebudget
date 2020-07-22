import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  background: ${({ theme }) => theme.primarycolor};
  width: 50%;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  color: ${({ theme }) => theme.whitecolor};
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 20px;
`;

const Button = ({ type, disabled, children }) => {
  return (
    <StyledButton type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
