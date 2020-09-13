import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h4`
  text-align: ${({ start }) => (start ? "start" : "center")};
  font-size: 18px;
  color: #1383c5;
  font-weight: 700;
  padding: 0 20px;
`;

const HeaderTitle = ({ children, ...props }) => {
  return <StyledHeader {...props}>{children}</StyledHeader>;
};

export default HeaderTitle;
