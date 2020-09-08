import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCaretRight,
  faSortDown,
  faPenAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAccount,
  openMiniModal,
} from "../../redux/actions/analysisActions";
import { v4 as uuidv4 } from "uuid";

const StyledWalletNavbar = styled.div`
  width: 350px;
  height: 100%;
  background: ${({ theme }) => theme.primarycolor};
  left: 0;
  padding: 20px;
`;
const StyledCategoryNavbar = styled(StyledWalletNavbar)``;
const StyledOpenSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  color: white;
  ::before,
  ::after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: ${({ theme }) => theme.whitecolor};
    transition: 0.5s ease all;
  }
  ::before {
    left: 0%;
    width: ${({ props }) => (props ? "100%" : "0")};
  }
  ::after {
    left: 0%;
    width: ${({ props }) => (props ? "100%" : "0")};
  }

  &:hover {
    ::before {
      width: 100%;
    }
    ::after {
      width: 100%;
    }
  }
`;

const StyledFirstSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  font-weight: ${({ props }) => (props ? "700" : "400")};
  color: white;
`;
const StyledSecondSection = styled.div`
  display: ${({ props }) => (props ? "block" : "none")};
`;
const StyledGroupQuantity = styled(StyledFirstSection)``;

const StyledItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  color: white;
`;
const StyledOptionWrapper = styled.div`
  background: #e8f3f9;
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
const StyledAddTitle = styled.p`
  font-size: 12px;
  padding: 0 10px;
`;
const StyledLabel = styled.h4`
  color: white;
`;
const StyledIcon = styled.span`
  cursor: pointer;
  color: black;
  font-size: 18px;
  margin-left: 10px;
`;
const StyledAccData = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.2s linear;
  &:hover {
    color: white;
    cursor: pointer;
    background-color: #50aade;
  }
`;
const StyledItemBar = styled.span`
  position: relative;
  display: block;
  margin-top: 5px;
  ::before,
  ::after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: ${({ theme }) => theme.whitecolor};
    transition: 0.2s ease all;
  }
  ::before {
    left: 50%;
  }
  ::after {
    right: 50%;
  }
  ${StyledFirstSection}:hover & {
    ::before {
      width: 50%;
    }
    ::after {
      width: 50%;
    }
  }
`;

const AnalysisSidebar = ({
  newAccounts,
  newExpensesCategory,
  newExpensesGroupCategory,
}) => {
  const { accounts, account, select, open, expenses } = useSelector(
    (store) => ({
      accounts: store.analysis.accounts,
      account: store.analysis.account,
      select: store.analysis.select,
      open: store.analysis.open,
      expenses: store.analysis.expenses,
    })
  );
  console.log(expenses);
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
  const sumAll = sumValues(accounts.map((account) => account.quantity));
  const sumAllExp = sumValues(expenses.map((exp) => exp.quantity));

  const sumFn = (acc, cat) =>
    sumValues(
      acc.map((account) => account.category === cat && account.quantity)
    );

  const sumWalletAll = sumFn(accounts, "Portfel");
  const sumSaveaccAll = sumFn(accounts, "Konto oszczędnościowe");
  const sumShoppingExp = sumFn(expenses, "Zakupy");

  const filterByCategory = (data, category) => {
    return data.map((obj) => (obj.category === category ? obj : null));
  };

  const all = {
    id: uuidv4(),
    quantity: sumAll,
    category: "Wszystkie konta",
    title: "Wszystkie",
  };
  const allExp = {
    id: uuidv4(),
    quantity: sumAllExp,
    category: "Wszystkie wydatki",
    title: "Wszystkie",
  };

  const dispatch = useDispatch();

  const selectAcc = (acc) => {
    dispatch(selectAccount(acc));
  };
  const opentModal = (category) => {
    dispatch(openMiniModal(category));
    console.log(open);
  };

  const [active, setActive] = useState(false);

  const [openWallet, setopenWallet] = useState(false);

  const [openSaveAcc, setopenSaveAcc] = useState(false);
  const [openExpenses, setopenExpenses] = useState(false);
  return (
    <StyledWalletNavbar>
      <StyledTitle>Konta</StyledTitle>
      <StyledSection>
        <StyledFirstSection
          onClick={() => {
            selectAcc(all);
          }}
        >
          <StyledParagraph primary>Wszystkie</StyledParagraph>
          <StyledQuantity primary>{sumAll} PLN</StyledQuantity>
        </StyledFirstSection>
      </StyledSection>
      <StyledSection>
        {newAccounts.map((acc) => {
          return (
            <StyledFirstSection
              onClick={() => {
                selectAcc(acc);
              }}
            >
              <StyledParagraph primary>{acc.category}</StyledParagraph>
              <StyledQuantity primary>{acc.quantity} PLN</StyledQuantity>
            </StyledFirstSection>
          );
        })}
        <StyledOptionWrapper>
          <StyledAddTitle>Dodaj konto</StyledAddTitle>
          <StyledIcon onClick={() => opentModal("Konto")}>
            <FontAwesomeIcon icon={faPlusCircle} style={{ margin: "0 10px" }} />
          </StyledIcon>
        </StyledOptionWrapper>

        <StyledTitle>Kategorie wydatków</StyledTitle>
        <StyledSection>
          <StyledFirstSection
            onClick={() => {
              selectAcc(allExp);
            }}
          >
            <StyledParagraph primary>Wszystkie</StyledParagraph>
            <StyledQuantity primary>{sumAllExp} PLN</StyledQuantity>
          </StyledFirstSection>
        </StyledSection>
        <StyledSection>
          {newExpensesCategory.map((acc) => {
            return (
              <StyledFirstSection
                onClick={() => {
                  selectAcc(acc);
                }}
              >
                <StyledParagraph primary>{acc.category}</StyledParagraph>
                <StyledQuantity primary>{acc.quantity} PLN</StyledQuantity>
              </StyledFirstSection>
            );
          })}
        </StyledSection>
        <StyledOptionWrapper>
          <StyledAddTitle>Dodaj wydatek</StyledAddTitle>
          <StyledIcon onClick={() => opentModal("Wydatek")}>
            <FontAwesomeIcon icon={faPlusCircle} style={{ margin: "0 10px" }} />
          </StyledIcon>
        </StyledOptionWrapper>

        {/* <StyledOpenSection
          onClick={() => {
            setopenWallet(!openWallet);
            selectAcc(allWallets);
          }}
          props={openWallet}
        >
          <StyledParagraph primary>Portfel</StyledParagraph>
          <StyledQuantity primary>{sumWalletAll} PLN</StyledQuantity>
        </StyledOpenSection>
        <StyledSecondSection props={openWallet}>
          <StyledItemWrapper>
            {filterByCategory(accounts, "Portfel").map(
              (acc) =>
                acc !== null && (
                  <StyledAccData
                    onClick={() => {
                      selectAcc(acc);
                    }}
                    key={acc.id}
                  >
                    <StyledParagraph>{acc.title}</StyledParagraph>
                    <StyledQuantity>{acc.quantity} PLN </StyledQuantity>
                  </StyledAccData>
                )
            )}
          </StyledItemWrapper>
          <StyledOptionWrapper>
            <StyledAddTitle>Dodaj portfel</StyledAddTitle>
            <StyledIcon onClick={() => opentModal("Portfel")}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ margin: "0 10px" }}
              />
            </StyledIcon>
          </StyledOptionWrapper>
        </StyledSecondSection>
      </StyledSection>

      <StyledSection>
        <StyledOpenSection
          onClick={() => {
            setopenSaveAcc(!openSaveAcc);
            selectAcc(allSaveAcc);
          }}
          props={openSaveAcc}
        >
          <StyledParagraph primary> Konto oszczędnościowe</StyledParagraph>
          <StyledQuantity primary>{sumSaveaccAll} PLN</StyledQuantity>
        </StyledOpenSection>
        <StyledSecondSection props={openSaveAcc}>
          <StyledItemWrapper>
            {filterByCategory(accounts, "Konto oszczędnościowe").map(
              (acc) =>
                acc !== null && (
                  <StyledAccData
                    onClick={() => {
                      selectAcc(acc);
                    }}
                    key={acc.id}
                  >
                    <StyledParagraph>{acc.title}</StyledParagraph>
                    <StyledQuantity>{acc.quantity} PLN </StyledQuantity>
                  </StyledAccData>
                )
            )}
          </StyledItemWrapper>
          <StyledOptionWrapper>
            <StyledAddTitle>Dodaj Konto </StyledAddTitle>
            <StyledIcon onClick={() => opentModal("Konto oszczędnościowe")}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ margin: "0 10px" }}
              />
            </StyledIcon>
          </StyledOptionWrapper>
        </StyledSecondSection>
      </StyledSection>
      <StyledTitle>Kategorie wydatków</StyledTitle>
      <StyledSection>
        <StyledFirstSection>
          <StyledParagraph primary>Wszystkie</StyledParagraph>
          <StyledQuantity primary>{sumAllExp} PLN</StyledQuantity>
        </StyledFirstSection>
        <StyledSection>
          <StyledOpenSection
            onClick={() => {
              setopenExpenses(!openExpenses);
            }}
            props={openExpenses}
          >
            <StyledParagraph primary> Zakupy</StyledParagraph>
            <StyledQuantity primary>{sumShoppingExp} PLN</StyledQuantity>
          </StyledOpenSection>
          <StyledSecondSection props={openExpenses}>
            <StyledItemWrapper>
              {filterByCategory(expenses, "Zakupy").map(
                (acc) =>
                  acc !== null && (
                    <StyledAccData
                      onClick={() => {
                        selectAcc(acc);
                      }}
                      key={acc.id}
                    >
                      <StyledParagraph>{acc.groupCategory}</StyledParagraph>
                      <StyledQuantity>{acc.quantity} PLN </StyledQuantity>
                    </StyledAccData>
                  )
              )}
            </StyledItemWrapper>
          </StyledSecondSection>
        </StyledSection>
        <StyledSection>
          <StyledOpenSection
            onClick={() => {
              setopenExpenses(!openExpenses);
            }}
            props={openExpenses}
          >
            <StyledParagraph primary> Zakupy</StyledParagraph>
            <StyledQuantity primary>{sumShoppingExp} PLN</StyledQuantity>
          </StyledOpenSection>
          <StyledSecondSection props={openExpenses}>
            <StyledItemWrapper>
              {filterByCategory(expenses, "Zakupy").map(
                (acc) =>
                  acc !== null && (
                    <StyledAccData
                      onClick={() => {
                        selectAcc(acc);
                      }}
                      key={acc.id}
                    >
                      <StyledParagraph>{acc.groupCategory}</StyledParagraph>
                      <StyledQuantity>{acc.quantity} PLN </StyledQuantity>
                    </StyledAccData>
                  )
              )}
            </StyledItemWrapper>
          </StyledSecondSection>
        </StyledSection> */}
      </StyledSection>
    </StyledWalletNavbar>
  );
};

export default AnalysisSidebar;
