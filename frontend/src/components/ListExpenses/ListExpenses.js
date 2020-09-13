import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledWrapper = styled.div`
  width: 50%;
  height: fit-content;
  border: 1px solid black;
  background: white;
`;
const StyledGridHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  background: #1383c5;
  color: white;
`;
const StyledGrid = styled(StyledGridHeader)`
  background: white;
`;
const StyledColumn = styled.div`
  color: ${({ primary }) => (primary ? "white" : "black")};
`;

const ListExpenses = ({ newData }) => {
  const { accounts, expenses, account } = useSelector((store) => ({
    accounts: store.analysis.accounts,
    expenses: store.analysis.expenses,
    account: store.analysis.account,
  }));

  return (
    <StyledWrapper>
      <StyledGridHeader>
        <StyledColumn primary> Data </StyledColumn>
        <StyledColumn primary> Tytuł </StyledColumn>
        <StyledColumn primary> Kategoria </StyledColumn>
        <StyledColumn primary> Podgrupa kategorii </StyledColumn>
        <StyledColumn primary> Ilość [zł] </StyledColumn>
      </StyledGridHeader>
      {account ? (
        <>
          {newData.map((data) => {
            return (
              <StyledGrid>
                <StyledColumn>{data.date} </StyledColumn>
                <StyledColumn>{data.title} </StyledColumn>
                <StyledColumn>{data.category} </StyledColumn>
                <StyledColumn>{data.groupCategory} </StyledColumn>
                <StyledColumn>{data.quantity} </StyledColumn>
              </StyledGrid>
            );
          })}
        </>
      ) : (
        <p>Guni</p>
      )}
    </StyledWrapper>
  );
};

export default ListExpenses;
