import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import {
  selectAccount,
  openMiniModal,
} from "../../redux/actions/analysisActions";
import { v4 as uuidv4 } from "uuid";
import AccountsList from "../AccountsList/AccountsList";

const StyledWalletNavbar = styled.div`
  width: 350px;
  height: 100%;
  background: ${({ theme }) => theme.primarycolor};
  left: 0;
  padding: 20px;
`;

const AnalysisSidebar = ({
  newAccounts,
  newExpensesCategory,
  selectCategoryObj,
  selectExpensesObj,
  setSelectWallet,
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

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
  const sumAll = sumValues(accounts.map((account) => account.quantity));
  const sumAllExp = sumValues(expenses.map((exp) => exp.quantity));

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
  const [activeBar, setActiveBar] = useState(-1);
  const dispatch = useDispatch();

  const selectAcc = (account, accounts) => {
    dispatch(selectAccount(account));
    selectCategoryObj(account, accounts);
    setActiveBar(account.category);
  };

  const selectExp = (account, expenses) => {
    dispatch(selectAccount(account));
    selectExpensesObj(account, expenses);
    setActiveBar(account.category);
  };

  return (
    <StyledWalletNavbar>
      <AccountsList
        selectAcc={selectAcc}
        activeBar={activeBar}
        newAccounts={newAccounts}
        all={all}
        sumAll={sumAll}
        setActiveBar={setActiveBar}
        title="Konta"
        allExp={allExp}
        newExpensesCategory={newExpensesCategory}
        sumAllExp={sumAllExp}
        setSelectWallet={setSelectWallet}
      />
      <AccountsList
        title="Kategorie wydatków"
        allExp={allExp}
        newExpensesCategory={newExpensesCategory}
        sumAllExp={sumAllExp}
        selectExp={selectExp}
        selectAcc={selectAcc}
        activeBar={activeBar}
        setSelectWallet={setSelectWallet}
      />
    </StyledWalletNavbar>
  );
};

export default AnalysisSidebar;
