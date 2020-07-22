import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const StyledFooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: ${({ theme }) => theme.primarycolor};
  z-index: 99;
`;
const StyledFooterList = styled.div`
  display: flex;
  justify-content: center;
  list-style-type: none;
  align-items: center;
  color: ${({ theme }) => theme.whitecolor};
  padding-left: 0;
  margin: 0;
  padding: 0;
`;
const StyledFooterFont = styled.div``;
const StyledFooterTitle = styled.p`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.font600};
  margin: 15px;
`;

const Footer = () => {
  return (
    <StyledFooterContainer>
      <StyledFooterList>
        <StyledFooterFont>
          <FontAwesomeIcon icon={faCopyright} />
        </StyledFooterFont>
        <StyledFooterTitle>Copyright 2020, Agata Lipiak</StyledFooterTitle>
      </StyledFooterList>
    </StyledFooterContainer>
  );
};

export default Footer;
