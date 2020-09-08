import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import AnalysisSidebar from "../components/AnalysisSidebar/AnalysisSidebar";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MiniModal from "../components/MiniModal/MiniModal";

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
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
`;
const StyledGridCategory = styled.div`
  margin: 20px;
  background: ${({ theme }) => theme.primarycolor};
  color: white;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font500};
`;

const Analysis = () => {
  const { accounts, expenses } = useSelector((store) => ({
    accounts: store.analysis.accounts,
    expenses: store.analysis.expenses,
  }));
  const { account, select } = useSelector((store) => ({
    account: store.analysis.account,
    select: store.analysis.select,
  }));

  const { open } = useSelector((store) => ({
    open: store.analysis.open,
  }));

  let newExpensesCategory = [];
  let newExpensesGroupCategory = [];

  let newAcc = Array.from(
    accounts.reduce(
      (m, { category, quantity }) =>
        m.set(category, (m.get(category) || 0) + quantity),
      new Map()
    ),
    ([category, quantity]) => ({ category, quantity })
  );
  // const [newAccounts, setNewAccounts] = useState(newAcc);

  expenses.forEach(function (a) {
    if (!this[a.category]) {
      this[a.category] = { category: a.category, quantity: 0 };
      newExpensesCategory.push(this[a.category]);
    }
    if (!this[a.groupCategory]) {
      this[a.groupCategory] = {
        category: a.category,
        groupCategory: a.groupCategory,
        quantity: 0,
      };
      newExpensesGroupCategory.push(this[a.groupCategory]);
    }
    this[a.category].quantity += a.quantity;
    this[a.groupCategory].quantity += a.quantity;
  }, Object.create(null));

  const [returnData, setreturnData] = useState([]);
  const dataExpListGroup = (acc) => {
    const xyz = expenses.map((exp) => {
      if (exp.groupCategory === acc.groupCategory) {
        console.log(exp);
      }
    });
    console.log(xyz);
  };

  const [newData, setnewData] = useState([]);

  const dataExpListIdAcc = (acc) => {
    const dataList = expenses.filter((exp) => {
      if (exp.idAccount === acc.id) {
        return exp;
      }
    });
    setnewData(dataList);
  };

  const showData = (account) => {
    setreturnData(account);
  };

  useEffect(() => {
    console.log(returnData);
  }, [returnData]);

  // const [newECG, setNewECG] = useState(newExpensesGroupCategory);
  // const [newEC, setNewEC] = useState(newExpensesCategory);

  // useEffect(() => {
  //   setNewAccounts(newAcc);
  //   setNewECG(newExpensesGroupCategory);
  //   setNewEC(newExpensesCategory);
  //   console.log(account);
  // }, [accounts, expenses, account]);

  return (
    <UserPageTemplate pageContext="analysis">
      <StyledWrapper>
        <AnalysisSidebar
          newAccounts={newAcc}
          newExpensesCategory={newExpensesCategory}
          newExpensesGroupCategory={newExpensesGroupCategory}
        />
        <StyledAccountList>
          {account.title === "Wszystkie" && (
            <>
              {newExpensesCategory.map((acc) => {
                return <div key={acc.id}>{acc.category}</div>;
              })}
            </>
          )}

          {account.title !== "Wszystkie" && (
            <>
              <StyledAccount>
                {accounts.map((acc) => {
                  if (account.category === acc.category && { select }) {
                    return (
                      <StyledGridCategory
                        key={acc.id}
                        onClick={() => showData(dataExpListIdAcc(acc))}
                      >
                        {acc.title}
                      </StyledGridCategory>
                    );
                  }
                })}
              </StyledAccount>

              <StyledAccount>
                {newExpensesGroupCategory.map((acc) => {
                  if (
                    account.category === acc.category &&
                    acc.groupCategory !== "" && { select }
                  ) {
                    return (
                      <StyledGridCategory
                        key={acc.id}
                        onClick={() => showData(dataExpListGroup(acc))}
                      >
                        {acc.groupCategory}
                      </StyledGridCategory>
                    );
                  }
                })}
              </StyledAccount>

              {newData.map((data) => {
                return (
                  <div>
                    <p>{data.category} </p>
                    <p>{data.groupCategory}</p>
                    <p>{data.quantity}</p>
                  </div>
                );
              })}
            </>
          )}

          {open && (
            <MiniModal
              newAccounts={newAcc}
              newExpensesCategory={newExpensesCategory}
              newExpensesGroupCategory={newExpensesGroupCategory}
            />
          )}
        </StyledAccountList>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

export default Analysis;
