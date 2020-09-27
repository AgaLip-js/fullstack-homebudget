import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import HeaderTitle from "../atoms/HeaderTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const StyledWrapper = styled.div`
  height: fit-content;
`;
const StyledGridHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ primary }) =>
    primary ? "repeat(3, 1fr)" : "repeat(5, 1fr)"};
  text-align: center;
  background: ${({ theme }) => theme.primarycolor};
  color: ${({ theme }) => theme.whitecolor};
  padding: 10px 0;
`;
const StyledGrid = styled(StyledGridHeader)`
  background: ${({ theme }) => theme.whitecolor};
`;
const StyledColumn = styled.div`
  color: ${({ primary }) => (primary ? "white" : "black")};
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledIcon = styled.span`
  color: ${({ theme }) => theme.primarycolor};
  cursor: pointer;
`;

const DataExpenses = ({ newData, expCategoryList, expGraphTable }) => {
  const { account } = useSelector((store) => ({
    account: store.analysis.account,
  }));
  const [showBtn, setShowBtn] = useState(false);
  const showEditButtons = () => {
    setShowBtn(!showBtn);
  };
  return (
    <>
      {newData && account.type !== "Wydatek" && (
        <>
          <StyledWrapper>
            <HeaderTitle>Lista wydatków</HeaderTitle>
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
                  <StyledColumn>{data.groupcategory} </StyledColumn>
                  <StyledColumn>{data.quantity} </StyledColumn>
                </StyledGrid>
              );
            })}
          </StyledWrapper>
        </>
      )}

      {expGraphTable &&
        expCategoryList.length !== 0 &&
        account.type === "Wydatek" && (
          <StyledWrapper>
            <HeaderTitle>Wykres wydatków</HeaderTitle>
            <StyledGridHeader primary>
              <StyledColumn primary> Kategoria </StyledColumn>
              <StyledColumn primary> Podgrupa kategorii </StyledColumn>
              <StyledColumn primary> Ilość [zł] </StyledColumn>
            </StyledGridHeader>
            {expGraphTable.map((data) => {
              if (data.category === account.category) {
                return (
                  <>
                    <StyledGrid primary key={data.id}>
                      <StyledColumn>{data.category} </StyledColumn>
                      <StyledColumn>{data.groupcategory} </StyledColumn>
                      <StyledColumn>{data.quantity} </StyledColumn>
                    </StyledGrid>
                  </>
                );
              }
              return null;
            })}
          </StyledWrapper>
        )}
      {expGraphTable &&
        expCategoryList.length === 0 &&
        account.type === "Wydatek" && (
          <StyledWrapper>
            <HeaderTitle>Wykres wydatków</HeaderTitle>
            <StyledGridHeader primary>
              <StyledColumn primary> Kategoria </StyledColumn>
              <StyledColumn primary> Podgrupa kategorii </StyledColumn>
              <StyledColumn primary> Ilość [zł] </StyledColumn>
            </StyledGridHeader>
            {expGraphTable.map((data) => {
              return (
                <StyledGrid primary key={data.id}>
                  <StyledColumn>{data.category} </StyledColumn>
                  <StyledColumn>{data.groupcategory} </StyledColumn>
                  <StyledColumn>{data.quantity} </StyledColumn>
                </StyledGrid>
              );
            })}
          </StyledWrapper>
        )}
      {newData && account.type === "Wydatek" && (
        <StyledWrapper>
          <StyledHeader>
            <HeaderTitle>Lista wydatków</HeaderTitle>
            <StyledIcon>
              <FontAwesomeIcon icon={faPencilAlt} />
            </StyledIcon>
          </StyledHeader>

          <StyledGridHeader>
            <StyledColumn primary> Data </StyledColumn>
            <StyledColumn primary> Tytuł </StyledColumn>
            <StyledColumn primary> Kategoria </StyledColumn>
            <StyledColumn primary> Podgrupa kategorii </StyledColumn>
            <StyledColumn primary> Ilość [zł] </StyledColumn>
          </StyledGridHeader>

          {newData.map((data) => {
            if (
              data.category === account.category ||
              account.category === "Wszystkie wydatki"
            ) {
              return (
                <StyledGrid key={data.id}>
                  <StyledColumn>{data.date} </StyledColumn>
                  <StyledColumn>{data.title} </StyledColumn>
                  <StyledColumn>{data.category} </StyledColumn>
                  <StyledColumn>{data.groupcategory} </StyledColumn>
                  <StyledColumn>{data.quantity} </StyledColumn>
                </StyledGrid>
              );
            }
            return null;
          })}
        </StyledWrapper>
      )}
    </>
  );
};

export default DataExpenses;
