import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../../assets/pictures/BUDŻETOMAT3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const backgroundTheme = {
  summary: "#1383c5",
  analysis: "#1383c5",
  planning: "white",
};

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 220px;
  height: 100px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  border: none;
  background-size: 100%;
  background-position: center;
  margin: 10px;
`;

const StyledLogout = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: black;
  padding: 0 30px;
  font-weight: 700;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
`;
const StyledSection = styled(NavLink)`
  color: black;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  padding: 0 30px;
  &.active {
    color: #1383c5;
  }
`;

const Sidebar = ({ setAuth, logout }) => (
  <StyledWrapper>
    <StyledLogoLink to="/" />
    <StyledLinksList>
      <li>
        <StyledSection to="/dashboard/summary" activeClassName="active">
          Podsumowanie
        </StyledSection>
      </li>
      <li>
        <StyledSection
          as={NavLink}
          to="/dashboard/analysis"
          activeclass="active"
        >
          Analiza Wydatków
        </StyledSection>
      </li>
      <li>
        <StyledSection
          as={NavLink}
          to="/dashboard/planning"
          activeclass="active"
        >
          Planowanie Budżetu
        </StyledSection>
        <StyledLogout to="/login" onClick={(e) => logout(e)}>
          <FontAwesomeIcon icon={faSignOutAlt} alt={"Wyloguj Się"} />
        </StyledLogout>
      </li>
    </StyledLinksList>
  </StyledWrapper>
);
export default Sidebar;
