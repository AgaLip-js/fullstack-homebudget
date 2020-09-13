import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import Sidebar from "../components/Sidebar/Sidebar";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store/store";
import { loadUser } from "../redux/actions/authActions";

const Summary = () => {
  return (
    <>
      <UserPageTemplate pageContext="summary"></UserPageTemplate>
    </>
  );
};

export default Summary;
