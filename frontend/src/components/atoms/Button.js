import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  background: ${(props) => (props.secondary ? "white" : "#1383c5")};
  width: ${(props) => (props.width ? "150px" : "fit-content")};
  height: 40px;
  border: 0;
  border-radius: 4px;
  padding: ${(props) => (props.width ? "10px 10px" : "12px 20px")};
  color: ${(props) => (props.secondary ? "#1383c5" : "white")};
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: inherit;
  text-transform: uppercase;
  cursor: pointer;
  border: ${(props) => (props.secondary ? "1px solid #1383c5" : "none")};
  margin: ${(props) =>
    props.primary ? "0px 0px 20px 0px" : "20px 0px 0px 0px"};
`;

const Button = ({
  type,
  disabled,
  children,
  secondary,
  primary,
  width,
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      secondary={secondary}
      primary={primary}
      width={width}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
