import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 100%;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 12px 20px;
  color: ${({ theme }) => theme.blackcolor};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.font500};
  line-height: inherit;
  transition: 0.3s ease;
`;
const StyledLabel = styled.label`
  display: block;
  margin: 10px;
  color: ${({ theme }) => theme.blackcolor};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.font500};
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const Input = ({ type, name, id, onChange, onBlur, value, title }) => {
  return (
    <>
      <StyledInput
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <StyledLabel htmlFor={id}>{title}</StyledLabel>
    </>
  );
};

export default Input;
