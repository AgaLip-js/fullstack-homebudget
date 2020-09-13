import React, { useState, useEffect } from "react";
import UserPageTemplate from "../templates/UserPageTemplate";
import AnalysisSidebar from "../components/AnalysisSidebar/AnalysisSidebar";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MiniModal from "../components/MiniModal/MiniModal";
import ListExpenses from "../components/ListExpenses/ListExpenses";

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

  const enterData = accounts.filter((a) => {
    if (a.category === account.category) {
      return a;
    }
  });

  const [newData, setnewData] = useState(expenses);

  const dataExpListGroup = (acc) => {
    const dataList = expenses.filter((exp) => {
      if (exp.category === acc.category) {
        return exp;
      }
    });
    setnewData(dataList);
  };

  const dataExpListIdAcc = (acc) => {
    const dataList = expenses.filter((exp) => {
      if (exp.idAccount === acc.id) {
        return exp;
      }
    });
    setnewData(dataList);
    console.log(newData);
  };

  const [accCatObj, setAccCatObj] = useState([]);

  const selectCategoryObj = (account, accounts) => {
    const accArray = accounts.filter((acc) => {
      if (acc.category === account.category) {
        return acc.id;
      }
    });
    setAccCatObj(accArray);
    console.log(accCatObj);

    const accountIds = accArray.map((e) => e.id);

    const alldata = expenses.filter((e) => accountIds.includes(e.idAccount));
    setnewData(alldata);
  };

  return (
    <UserPageTemplate pageContext="analysis">
      <StyledWrapper>
        <AnalysisSidebar
          newAccounts={newAcc}
          newExpensesCategory={newExpensesCategory}
          newExpensesGroupCategory={newExpensesGroupCategory}
          newData={newData}
          setnewData={setnewData}
          enterData={enterData}
          selectCategoryObj={selectCategoryObj}
          dataExpListIdAcc={dataExpListIdAcc}
          accCatObj={accCatObj}
        />

        <StyledAccountList>
          {account.title === "Wszystkie" && (
            <>
              {accounts.map((acc) => {
                return (
                  <>
                    <div key={acc.id}>{acc.category}</div>
                    <div>{acc.quantity}</div>
                  </>
                );
              })}
              ,
              {expenses.map((e) => {
                return (
                  <div>
                    <p>{e.category}</p>
                    <p>{e.quantity}</p>
                  </div>
                );
              })}
            </>
          )}

          <StyledAccount>
            {accCatObj.map((obj) => {
              if (obj.type) {
                return (
                  <StyledGridCategory onClick={() => dataExpListIdAcc(obj)}>
                    {obj.title}
                  </StyledGridCategory>
                );
              }
            })}
          </StyledAccount>
          {/* <StyledAccount>
            {ExpCatObj.map((obj) => {
              return (
                <StyledGridCategory onClick={() => dataExpListIdAcc(obj)}>
                  {obj.category}
                </StyledGridCategory>
              );
            })}
          </StyledAccount> */}
          {/* {account.title !== "Wszystkie" && (
            <>
              <StyledAccount>
                {accounts.map((acc) => {
                  if (account.category === acc.category) {
                    return (
                      <StyledGridCategory
                        key={acc.id}
                        onClick={() => dataExpListIdAcc(acc)}
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
                        onClick={() => dataExpListGroup(acc)}
                      >
                        {acc.groupCategory}
                      </StyledGridCategory>
                    );
                  }
                })}
              </StyledAccount>
            </>
          )} */}
          <ListExpenses newData={newData} />

          {!account &&
            (accounts.map((a) => {
              return (
                <div>
                  <p>{a.title}</p>
                  <p>{a.category}</p>
                  <p>{a.quantity}</p>
                </div>
              );
            }),
            expenses.map((e) => {
              return (
                <div>
                  <p>{e.category}</p>
                  <p>{e.quantity}</p>
                </div>
              );
            }))}

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
