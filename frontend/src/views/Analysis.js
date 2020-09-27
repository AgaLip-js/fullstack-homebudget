import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import AnalysisSidebar from "../components/AnalysisSidebar/AnalysisSidebar";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MiniModal from "../components/MiniModal/MiniModal";

import { v4 as uuidv4 } from "uuid";
import DataExpenses from "../components/DataExpenses/DataExpenses";
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
  grid-template-columns: auto auto;
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
  const { accounts, expenses, account, open } = useSelector(({ analysis }) => ({
    accounts: analysis.accounts,
    expenses: analysis.expenses,
    account: analysis.account,
    open: analysis.open,
  }));

  const [active, setActive] = useState(-1);
  const [selectWallet, setSelectWallet] = useState("");
  let newExpensesCategory = [];
  let newExpensesGroupCategory = [];
  let newAcc = [];

  accounts.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = {
        category: a.category,
        quantity: 0,
        id: uuidv4(),
        type: a.type,
      };
      newAcc.push(this[a.category]);
    }
    this[a.category].quantity += a.quantity;
  }, Object.create(null));

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
    if (!this[a.groupcategory]) {
      this[a.groupcategory] = {
        category: a.category,
        groupcategory: a.groupcategory,
        quantity: 0,
        type: "Wydatek",
        id: uuidv4(),
      };
      newExpensesGroupCategory.push(this[a.groupcategory]);
    }
    this[a.category].quantity += a.quantity;
    this[a.groupcategory].quantity += a.quantity;
  }, Object.create(null));

  const [newData, setnewData] = useState(expenses);

  const expCategoryList = newExpensesGroupCategory.filter((exp) => {
    if (exp.category === account.category) {
      return exp;
    }
    return null;
  });
  let expGraphTable = [];

  const dataExpListIdAcc = (acc) => {
    const dataList = expenses.filter((exp) => {
      if (exp.idaccount === acc.id) {
        return exp;
      }
      return null;
    });
    setSelectWallet(acc);
    setActive(acc.id);
    setnewData(dataList);
  };
  newData.forEach(function (a) {
    if (!this[a.groupcategory]) {
      this[a.groupcategory] = {
        groupcategory: a.groupcategory,
        quantity: 0,
        id: uuidv4(),
        category: a.category,
      };
      expGraphTable.push(this[a.groupcategory]);
    }
    this[a.groupcategory].quantity += a.quantity;
  }, Object.create(null));

  const [accCatObj, setAccCatObj] = useState(accounts);

  const selectCategoryObj = (account, accounts) => {
    const accArray = accounts.filter((acc) => {
      if (acc.category === account.category) {
        return acc;
      }
      return null;
    });
    setAccCatObj(accArray);
    if (accArray.length === 0) {
      setAccCatObj(accounts);
    }

    const accountIds = accArray.map((e) => e.id);
    if (accountIds.length !== 0) {
      console.log(accountIds);
      const alldata = expenses.filter((e) => accountIds.includes(e.idaccount));
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
      return null;
    });
    setnewData(accArray);

    const accountIds = accArray.map((e) => e.idaccount);
    if (accountIds.length !== 0) {
      const alldata = accounts.filter((e) => accountIds.includes(e.id));
      setAccCatObj(alldata);
    }
  };
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);

  const sumAll =
    accounts.length === 0
      ? 0
      : sumValues(accounts.map((account) => account.quantity));

  const sumAllExp =
    expenses.length === 0 ? 0 : sumValues(expenses.map((exp) => exp.quantity));

  const allExp = {
    id: uuidv4(),
    quantity: sumAllExp,
    category: "Wszystkie wydatki",
    title: "Wszystkie",
    type: "Wydatek",
  };
  const all = {
    id: uuidv4(),
    quantity: sumAll,
    category: "Wszystkie konta",
    title: "Wszystkie",
  };
  const [activeBar, setActiveBar] = useState(all.category);
  console.log(account);
  console.log(accCatObj);

  useEffect(() => {
    setActive(-1);
  }, [account]);
  useEffect(() => {
    const accArray = accounts.filter((acc) => {
      if (acc.category === account.category) {
        return acc;
      }
      return null;
    });
    setAccCatObj(accArray);
    if (accArray.length === 0) {
      setAccCatObj(accounts);
    }
    const expArray = expenses.filter((exp) => {
      if (exp.idaccount === selectWallet.id) {
        return exp;
      }
      return null;
    });

    setnewData(expArray);
    if (expArray.length === 0) {
      setnewData(expenses);
    }
    console.log(selectWallet);
    console.log(newData);
  }, [accounts, expenses]);

  return (
    <UserPageTemplate pageContext="analysis">
      <StyledWrapper>
        <AnalysisSidebar
          newAccounts={newAcc}
          newExpensesCategory={newExpensesCategory}
          selectCategoryObj={selectCategoryObj}
          selectExpensesObj={selectExpensesObj}
          setSelectWallet={setSelectWallet}
          setActive={setActive}
          all={all}
          allExp={allExp}
          sumAll={sumAll}
          sumAllExp={sumAllExp}
          setActiveBar={setActiveBar}
          activeBar={activeBar}
        />

        <StyledAccountList>
          <StyledAccount>
            <StyledAccountTitle>Nazwa konta</StyledAccountTitle>
            <StyledAccountSelect>
              {accCatObj.length > 0 && (
                <>
                  {accCatObj.map((obj) => {
                    return (
                      <React.Fragment key={obj.id}>
                        <StyledGridCategory
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
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </StyledAccountSelect>
          </StyledAccount>

          <DataExpenses
            expCategoryList={expCategoryList}
            expGraphTable={expGraphTable}
            newData={newData}
          />
          {open && (
            <MiniModal
              newAccounts={newAcc}
              newExpensesCategory={newExpensesCategory}
              newExpensesGroupCategory={newExpensesGroupCategory}
              selectWallet={selectWallet}
              setSelectWallet={setSelectWallet}
            />
          )}
        </StyledAccountList>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default Analysis;
