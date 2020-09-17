import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openMiniModal } from "../../redux/actions/analysisActions";

const StyledOptionWrapper = styled.div`
  background: ${(props) => (props.secondary ? "white" : "#e8f3f9")};
  color: black;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => (props.secondary ? "20px" : "10px 0px")};
  padding: ${(props) => (props.secondary ? "10px" : "0px")};
  z-index: 1;
`;
const StyledIcon = styled.span`
  cursor: pointer;
  color: black;
  font-size: 18px;
  margin-left: 10px;
  position: relative;
  z-index: 1;
`;
const StyledAddTitle = styled.p`
  font-size: 12px;
  padding: 0 10px;
  z-index: 1;
`;

const OptionWrapper = ({
  icon,
  title,
  category,
  secondary,
  walletCategory,
  setSelectWallet,
}) => {
  const { open } = useSelector((store) => ({
    open: store.analysis.open,
  }));

  const dispatch = useDispatch();
  const opentModal = (category, title) => {
    dispatch(openMiniModal(category, title));
  };
  const opentModalZero = (category, title) => {
    setSelectWallet("");
    dispatch(openMiniModal(category, title));
  };
  return (
    <StyledOptionWrapper secondary={secondary}>
      <StyledAddTitle>{title}</StyledAddTitle>
      {walletCategory ? (
        <StyledIcon onClick={() => opentModal(category, title)}>
          <FontAwesomeIcon
            icon={icon}
            style={{ margin: "0 10px" }}
            secondary={secondary}
          />
        </StyledIcon>
      ) : (
        <StyledIcon
          onClick={() => {
            opentModalZero(category, title);
          }}
        >
          <FontAwesomeIcon icon={icon} style={{ margin: "0 10px" }} />
        </StyledIcon>
      )}
    </StyledOptionWrapper>
  );
};

export default OptionWrapper;
