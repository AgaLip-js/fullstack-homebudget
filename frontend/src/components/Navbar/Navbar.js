import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/pictures/BUDŻETOMAT3.jpg";
import "aos/dist/aos.css";
import styled from "styled-components";

const StyledNavWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.whitecolor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
`;
const StyledImgLogo = styled.div`
  margin: 10px;
`;
const StyledImage = styled.img``;

const StyledSignContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 20px;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.blackcolor};
  padding: 20px;
  font-weight: ${({ theme }) => theme.font700};
  cursor: pointer;
  &.active,
  &:hover {
    color: ${({ theme }) => theme.primarycolor};
  }
`;

const Navbar = ({ aos }) => {
  return (
    <StyledNavWrapper data-aos={aos}>
      <StyledImgLogo>
        <Link to="/">
          <StyledImage src={logo} width="250px" alt={logo} />
        </Link>
      </StyledImgLogo>
      <StyledSignContainer>
        <StyledNavLink to="/login" activeClassName="active">
          Zaloguj się
        </StyledNavLink>
        <StyledNavLink to="/register" activeClassName="active">
          Zarejestruj się
        </StyledNavLink>
      </StyledSignContainer>
    </StyledNavWrapper>
  );
};

export default Navbar;
