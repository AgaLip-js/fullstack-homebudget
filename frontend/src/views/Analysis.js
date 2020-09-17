import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import AnalysisSidebar from "../components/AnalysisSidebar/AnalysisSidebar";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MiniModal from "../components/MiniModal/MiniModal";

import { v4 as uuidv4 } from "uuid";
import DataExpenses from "../components/DataExpenses/DataExpenses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import OptionWrapper from "../components/atoms/OptionWrapper";

const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
`;
const StyledAccountList = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
`;
const StyledAccount = styled.div`
  display: grid;
  width: 100%;
  border-bottom: 1px solid #ffffff;
  margin: 0 0 20px 0;
  text-align: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
`;
const StyledAccountSelect = styled.div`
  display: flex;
  justify-content: center;
  /* width: 100%; */
  flex-wrap: wrap;
  position: relative;
  padding-right: 200px;
`;
const StyledAccountTitle = styled.h4`
  text-align: start;
  font-size: 18px;
  color: #1383c5;
  font-weight: 700;
  padding: 0 20px;
`;
const StyledGridCategory = styled.div`
  margin: 20px;
  background: ${({ active }) => (active ? "white" : "#1383c5")};
  color: ${({ active }) => (active ? "#1383c5" : "white")};
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font500};
  position: relative;
  z-index: 3;
`;
const StyledExpensesList = styled.div`
  display: grid;
  width: 100%;
  margin: 0 0 20px 0;
  text-align: center;
  align-items: center;
  grid-template-rows: auto auto;
  justify-content: center;
`;
const StyledExpensestTitle = styled.h4`
  text-align: center;
  font-size: 18px;
  color: #1383c5;
  font-weight: 700;
`;
const StyledObject = styled.div`
  position: relative;
`;
const StyledOptionWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  order: 99;
  /* transform: translateY(-70px); */
  transition: all 0.2s linear;
  margin: 0 20px;
  right: 0;
  z-index: 1;
  /* ${StyledObject}:hover & {
    transform: translateY(-40px);

    z-index: 1;
  } */
`;

const Analysis = () => {
  const { accounts, expenses } = useSelector((store) => ({
    accounts: store.analysis.accounts,
    expenses: store.analysis.expenses,
  }));
  const { account, select, title } = useSelector((store) => ({
    account: store.analysis.account,
    title: store.analysis.title,
    select: store.analysis.select,
  }));

  const { open } = useSelector((store) => ({
    open: store.analysis.open,
  }));

  const [active, setActive] = useState(-1);

  let newExpensesCategory = [];
  let newExpensesGroupCategory = [];
  let newAcc = [];

  accounts.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = {
        category: a.category,
        quantity: 0,
        id: uuidv4(),
      };
      newAcc.push(this[a.category]);
    }
    this[a.category].quantity += a.quantity;
  }, Object.create(null));

  console.log(newAcc);

  expenses.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = {
        category: a.category,
        quantity: 0,
        type: "Wydatek",
        id: uuidv4(),
      };
      newExpensesCategory.push(this[a.category]);
    }
    if (!this[a.groupCategory]) {
      this[a.groupCategory] = {
        category: a.category,
        groupCategory: a.groupCategory,
        quantity: 0,
        type: "Wydatek",
        id: uuidv4(),
      };
      newExpensesGroupCategory.push(this[a.groupCategory]);
    }
    this[a.category].quantity += a.quantity;
    this[a.groupCategory].quantity += a.quantity;
  }, Object.create(null));

  console.log(newExpensesGroupCategory);
  console.log(newExpensesCategory);

  const [newData, setnewData] = useState(expenses);

  const expCategoryList = newExpensesGroupCategory.filter((exp) => {
    if (exp.category === account.category) {
      return exp;
    }
  });
  let expGraphTable = [];
  const [selectWallet, setSelectWallet] = useState("");
  const dataExpListIdAcc = (acc) => {
    const dataList = expenses.filter((exp) => {
      if (exp.idAccount === acc.id) {
        return exp;
      }
    });
    setSelectWallet(acc);
    setActive(acc.id);
    setnewData(dataList);
  };
  newData.forEach(function (a) {
    if (!this[a.groupCategory]) {
      this[a.groupCategory] = {
        groupCategory: a.groupCategory,
        quantity: 0,
        id: uuidv4(),
        category: a.category,
      };
      expGraphTable.push(this[a.groupCategory]);
    }
    this[a.groupCategory].quantity += a.quantity;
  }, Object.create(null));

  const [accCatObj, setAccCatObj] = useState(accounts);

  const selectCategoryObj = (account, accounts) => {
    const accArray = accounts.filter((acc) => {
      if (acc.category === account.category) {
        return acc;
      }
    });
    setAccCatObj(accArray);
    if (accArray.length === 0) {
      setAccCatObj(accounts);
    }

    const accountIds = accArray.map((e) => e.id);
    if (accountIds.length !== 0) {
      console.log(accountIds);
      const alldata = expenses.filter((e) => accountIds.includes(e.idAccount));
      setnewData(alldata);
    } else if (account.title === "Wszystkie") {
      setnewData(expenses);
    } else {
      setnewData(newExpensesGroupCategory);
    }
  };

  const selectExpensesObj = (account, expenses) => {
    const accArray = expenses.filter((acc) => {
      if (acc.category === account.category) {
        return acc;
      }
    });
    setnewData(accArray);

    const accountIds = accArray.map((e) => e.idAccount);
    console.log(accountIds);
    if (accountIds.length !== 0) {
      const alldata = accounts.filter((e) => accountIds.includes(e.id));
      setAccCatObj(alldata);
    }
  };

  console.log(account);
  console.log(accCatObj);

  useEffect(() => {
    setActive(-1);
  }, [account]);

  return (
    <UserPageTemplate pageContext="analysis">
      <StyledWrapper>
        <AnalysisSidebar
          newAccounts={newAcc}
          newExpensesCategory={newExpensesCategory}
          selectCategoryObj={selectCategoryObj}
          selectExpensesObj={selectExpensesObj}
          accCatObj={accCatObj}
          setSelectWallet={setSelectWallet}
          setActive={setActive}
        />

        <StyledAccountList>
          <StyledAccount>
            <StyledAccountTitle>Typ konta</StyledAccountTitle>
            <StyledAccountSelect>
              {accCatObj.length > 0 && (
                <>
                  {accCatObj.map((obj) => {
                    if (obj) {
                      return (
                        <>
                          <StyledGridCategory
                            key={obj.id}
                            active={active === obj.id}
                            onClick={() => dataExpListIdAcc(obj)}
                          >
                            {obj.title}
                          </StyledGridCategory>
                          {selectWallet !== "" &&
                            active === obj.id &&
                            account.type !== "Wydatek" && (
                              <StyledOptionWrapper>
                                <OptionWrapper
                                  title="Edytuj konto"
                                  icon={faPencilAlt}
                                  walletCategory={selectWallet.category}
                                  category="Konto"
                                  secondary
                                />
                              </StyledOptionWrapper>
                            )}
                        </>
                      );
                    }
                  })}
                </>
              )}
            </StyledAccountSelect>
          </StyledAccount>

          <DataExpenses
            expCategoryList={expCategoryList}
            newExpensesCategory={newExpensesCategory}
            expGraphTable={expGraphTable}
            active={active}
            newData={newData}
          />
          {open && (
            <MiniModal
              newAccounts={newAcc}
              newExpensesCategory={newExpensesCategory}
              newExpensesGroupCategory={newExpensesGroupCategory}
              selectWallet={selectWallet}
            />
          )}
        </StyledAccountList>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default Analysis;
