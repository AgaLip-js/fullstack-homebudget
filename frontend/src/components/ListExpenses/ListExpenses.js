import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import HeaderTitle from "../atoms/HeaderTitle";

const StyledWrapper = styled.div`
  height: fit-content;
`;
const StyledGridHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ primary }) =>
    primary ? "repeat(3, 1fr)" : "repeat(5, 1fr)"};
  text-align: center;
  background: #1383c5;
  color: white;
  padding: 10px 0;
`;
const StyledGridHeaderAll = styled(StyledGridHeader)`
  grid-template-columns: repeat(2, 1fr);
`;
const StyledGrid = styled(StyledGridHeader)`
  background: white;
`;
const StyledGridAll = styled(StyledGridHeaderAll)`
  background: white;
`;
const StyledColumn = styled.div`
  color: ${({ primary }) => (primary ? "white" : "black")};
`;
const StyledGraphTitle = styled.h4`
  text-align: start;
  font-size: 18px;
  color: #1383c5;
  font-weight: 700;
  padding: 0 20px;
`;

const ListExpenses = ({ newData, expCategoryList, newExpensesCategory }) => {
  const { accounts, expenses, account } = useSelector((store) => ({
    accounts: store.analysis.accounts,
    expenses: store.analysis.expenses,
    account: store.analysis.account,
  }));
  console.log(expCategoryList);

  return (
    <>
      {newData && (
        <StyledWrapper>
          <StyledGridHeader>
            <StyledColumn primary> Data </StyledColumn>
            <StyledColumn primary> Tytuł </StyledColumn>
            <StyledColumn primary> Kategoria </StyledColumn>
            <StyledColumn primary> Podgrupa kategorii </StyledColumn>
            <StyledColumn primary> Ilość [zł] </StyledColumn>
          </StyledGridHeader>

          {newData.map((data) => {
            return (
              <StyledGrid key={data.id}>
                <StyledColumn>{data.date} </StyledColumn>
                <StyledColumn>{data.title} </StyledColumn>
                <StyledColumn>{data.category} </StyledColumn>
                <StyledColumn>{data.groupCategory} </StyledColumn>
                <StyledColumn>{data.quantity} </StyledColumn>
              </StyledGrid>
            );
          })}
        </StyledWrapper>
      )}
      {expCategoryList && expCategoryList.length !== 0 && (
        <StyledWrapper>
          <HeaderTitle>Wykres wydatków</HeaderTitle>
          <StyledGridHeader primary>
            <StyledColumn primary> Kategoria </StyledColumn>
            <StyledColumn primary> Podgrupa kategorii </StyledColumn>
            <StyledColumn primary> Ilość [zł] </StyledColumn>
          </StyledGridHeader>
          {expCategoryList.map((data) => {
            return (
              <StyledGrid primary key={data.id}>
                <StyledColumn>{data.category} </StyledColumn>
                <StyledColumn>{data.groupCategory} </StyledColumn>
                <StyledColumn>{data.quantity} </StyledColumn>
              </StyledGrid>
            );
          })}
        </StyledWrapper>
      )}
      {newExpensesCategory && expCategoryList.length === 0 && (
        <StyledWrapper>
          <HeaderTitle>Wykres wydatków</HeaderTitle>
          <StyledGridHeaderAll>
            <StyledColumn primary> Kategoria </StyledColumn>
            <StyledColumn primary> Ilość [zł] </StyledColumn>
          </StyledGridHeaderAll>
          {newExpensesCategory.map((data) => {
            return (
              <StyledGridAll key={data.id}>
                <StyledColumn>{data.category} </StyledColumn>
                <StyledColumn>{data.quantity} </StyledColumn>
              </StyledGridAll>
            );
          })}
        </StyledWrapper>
      )}
    </>
  );
};

export default ListExpenses;
