import React, { useEffect } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import OptionWrapper from "../atoms/OptionWrapper";
import {
  getSumAccounts,
  getSumExpenses,
} from "../../redux/actions/aggregateFunctions";
import { StaticRouter } from "react-router-dom";

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

const AccountsList = ({
  selectAcc,
  activeBar,
  all,
  title,
  allExp,
  sumAllExp,
  selectExp,
  setSelectWallet,
}) => {
  const { accounts, expenses, sumAccounts, sumExpenses, userID } = useSelector(
    (store) => ({
      accounts: store.analysis.accounts,
      expenses: store.analysis.expenses,
      sumAccounts: store.aggregate.sumAccounts,
      sumExpenses: store.aggregate.sumExpenses,
      userID: store.auth.user.id,
    })
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (userID) {
      dispatch(getSumAccounts(userID));
      dispatch(getSumExpenses(userID));
    }
  }, [dispatch, userID, accounts, expenses]);

  const sumA = (array) => {
    return array.map((a) => parseInt(a.sum)).reduce((a, b) => a + b, 0);
  };

  return (
    <StyledSection>
      <StyledTitle>{title}</StyledTitle>
      {title === "Konta" ? (
        <>
          {sumAccounts && sumAccounts.length ? (
            <>
              <StyledFirstSection
                onClick={() => {
                  selectAcc(all, accounts);
                }}
                active={activeBar === all.category}
              >
                <StyledParagraph primary>Wszystkie</StyledParagraph>
                <StyledQuantity primary>{sumA(sumAccounts)} PLN</StyledQuantity>
              </StyledFirstSection>

              {sumAccounts.map((acc) => {
                return (
                  <StyledFirstSection
                    key={acc.category}
                    onClick={() => {
                      selectAcc(acc, accounts);
                    }}
                    active={activeBar === acc.category}
                  >
                    <StyledParagraph primary>{acc.category}</StyledParagraph>
                    <StyledQuantity primary>{acc.sum} PLN</StyledQuantity>
                  </StyledFirstSection>
                );
              })}
            </>
          ) : (
            <p>...Loading</p>
          )}
          <OptionWrapper
            icon={faPlusCircle}
            title="Dodaj konto"
            category="Konto"
            setSelectWallet={setSelectWallet}
          />
        </>
      ) : (
        <>
          <StyledFirstSection
            onClick={() => {
              selectExp(allExp, expenses);
            }}
            active={activeBar === allExp.category}
          >
            <StyledParagraph primary>Wszystkie</StyledParagraph>
            <StyledQuantity primary>{sumAllExp} PLN</StyledQuantity>
          </StyledFirstSection>

          {sumExpenses && sumExpenses.length ? (
            sumExpenses.map((acc) => {
              return (
                <StyledFirstSection
                  key={acc.category}
                  onClick={() => {
                    selectExp(acc, expenses);
                  }}
                  active={activeBar === acc.category}
                >
                  <StyledParagraph primary>{acc.category}</StyledParagraph>
                  <StyledQuantity primary>{acc.sum} PLN</StyledQuantity>
                </StyledFirstSection>
              );
            })
          ) : (
            <p>Loading....</p>
          )}

          <OptionWrapper
            icon={faPlusCircle}
            title="Dodaj wydatek"
            category="Wydatek"
            setSelectWallet={setSelectWallet}
          />
        </>
      )}
    </StyledSection>
  );
};

export default AccountsList;
