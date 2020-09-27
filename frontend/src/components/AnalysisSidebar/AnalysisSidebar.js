import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { selectAccount } from "../../redux/actions/analysisActions";
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
  all,
  allExp,
  sumAll,
  sumAllExp,
  setActiveBar,
  activeBar,
}) => {
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
