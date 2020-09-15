import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { openMiniModal } from "../../redux/actions/analysisActions";

const StyledFirstSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active }) => (active ? "#05273B" : "white")};
`;
const StyledOptionWrapper = styled.div`
  background: ${({ theme }) => theme.lightcolor};
  color: black;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;
const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.h3`
  color: white;
  text-align: center;
`;
const StyledParagraph = styled.p`
  padding: 5px;
  max-width: 50%;
  font-size: ${({ primary }) => (primary ? "16px" : "14px")};
`;
const StyledQuantity = styled(StyledParagraph)``;
const StyledIcon = styled.span`
  cursor: pointer;
  color: black;
  font-size: 18px;
  margin-left: 10px;
`;
const StyledAddTitle = styled.p`
  font-size: 12px;
  padding: 0 10px;
`;

const AccountsList = ({
  selectAcc,
  activeBar,
  newAccounts,
  sumAll,
  all,
  title,
  allExp,
  newExpensesCategory,
  sumAllExp,
  selectExp,
}) => {
  const { accounts, open, expenses } = useSelector((store) => ({
    accounts: store.analysis.accounts,
    open: store.analysis.open,
    expenses: store.analysis.expenses,
  }));

  const dispatch = useDispatch();
  const opentModal = (category) => {
    dispatch(openMiniModal(category));
    console.log(open);
  };
  console.log(activeBar);

  return (
    <StyledSection>
      <StyledTitle>{title}</StyledTitle>
      {title === "Konta" ? (
        <>
          <StyledFirstSection
            onClick={() => {
              selectAcc(all, accounts);
            }}
            active={activeBar === all.category}
          >
            <StyledParagraph primary>Wszystkie</StyledParagraph>
            <StyledQuantity primary>{sumAll} PLN</StyledQuantity>
          </StyledFirstSection>
          {newAccounts.map((acc) => {
            return (
              <StyledFirstSection
                key={acc.id}
                onClick={() => {
                  selectAcc(acc, accounts);
                }}
                active={activeBar === acc.category}
              >
                <StyledParagraph primary>{acc.category}</StyledParagraph>
                <StyledQuantity primary>{acc.quantity} PLN</StyledQuantity>
              </StyledFirstSection>
            );
          })}
          <StyledOptionWrapper>
            <StyledAddTitle>Dodaj konto</StyledAddTitle>
            <StyledIcon onClick={() => opentModal("Konto")}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ margin: "0 10px" }}
              />
            </StyledIcon>
          </StyledOptionWrapper>
        </>
      ) : (
        <>
          <StyledFirstSection
            onClick={() => {
              selectAcc(allExp, accounts);
            }}
            active={activeBar === allExp.category}
          >
            <StyledParagraph primary>Wszystkie</StyledParagraph>
            <StyledQuantity primary>{sumAllExp} PLN</StyledQuantity>
          </StyledFirstSection>

          {newExpensesCategory.map((acc) => {
            return (
              <StyledFirstSection
                key={acc.category}
                onClick={() => {
                  selectExp(acc, expenses);
                }}
                active={activeBar === acc.category}
              >
                <StyledParagraph primary>{acc.category}</StyledParagraph>
                <StyledQuantity primary>{acc.quantity} PLN</StyledQuantity>
              </StyledFirstSection>
            );
          })}

          <StyledOptionWrapper>
            <StyledAddTitle>Dodaj wydatek</StyledAddTitle>
            <StyledIcon onClick={() => opentModal("Wydatek")}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ margin: "0 10px" }}
              />
            </StyledIcon>
          </StyledOptionWrapper>
        </>
      )}
    </StyledSection>
  );
};

export default AccountsList;
