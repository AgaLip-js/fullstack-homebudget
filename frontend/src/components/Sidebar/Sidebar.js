import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../../assets/pictures/BUDŻETOMAT3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import store from "../../redux/store/store";
import { logoutUser } from "../../redux/actions/authActions";

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
  z-index:99;
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

const Sidebar = () => {
  const logoutFn = () => {
    store.dispatch(logoutUser());
  };
  return (
    <StyledWrapper>
      <StyledLogoLink to="/" />
      <StyledLinksList>
        <li>
          <StyledSection as={NavLink} to="/dashboard/summary" activeClassName="active">
            Podsumowanie
          </StyledSection>
        </li>
        <li>
          <StyledSection
            as={NavLink}
            to="/dashboard/analysis"
            activeClassName="active"
          >
            Analiza Wydatków
          </StyledSection>
        </li>
        <li>
          <StyledSection
            as={NavLink}
            to="/dashboard/planning"
            activeClassName="active"
          >
            Planowanie Budżetu
          </StyledSection>
          <StyledSection as={NavLink} to="/dashboard/userpanel" activeclass="active" >
            <FontAwesomeIcon icon={faUserAlt} alt="Panel użytkownika"/>
          </StyledSection>
          <StyledLogout to="/login" onClick={logoutFn}>
            <FontAwesomeIcon icon={faSignOutAlt} alt={"Wyloguj Się"} />
          </StyledLogout>
        </li>
      </StyledLinksList>
    </StyledWrapper>
  );
};
export default Sidebar;
