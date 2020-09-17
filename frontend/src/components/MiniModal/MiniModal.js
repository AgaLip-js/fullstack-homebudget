import React, { useState } from "react";
import Button from "../atoms/Button";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  closeMiniModal,
  addNewAccount,
  addNewExpense,
} from "../../redux/actions/analysisActions";
import { useDispatch, useSelector } from "react-redux";
import Input from "../atoms/Input";
import { v4 as uuidv4 } from "uuid";
import { parse } from "@fortawesome/fontawesome-svg-core";

const StyledBackgroundWrapper = styled.div`
  background-color: grey;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 16;
`;
const StyledWrapper = styled.div`
  text-align: center;
  border: 1px solid lightgrey;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  background: white;

  input {
    margin-top: 0px;
    font-size: 14px;
  }
`;
const StyledButtonClose = styled.span`
  color: black;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  height: fit-content;
  text-align: end;
  width: 18px;
  position: fixed;
  right: 2%;
  :hover,
  :focus {
    color: darkgray;
    text-decoration: none;
    cursor: pointer;
  }
`;
const StyledTitle = styled.p`
  padding-bottom: 10px;
`;
const StyledSelect = styled.select`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: fit-content;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 12px 20px;
  color: ${({ theme }) => theme.blackcolor};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.font500};
  line-height: inherit;
  transition: 0.3s ease;
`;
const StyledOption = styled.option``;
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 25px;
  margin-top: 5px;
  color: ${({ theme }) => theme.blackcolor};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.font500};
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;
const StyledRequiredText = styled.p`
  position: relative;
  margin-top: -20px;
  margin-left: 5px;
  color: red;
  font-size: 12px;
`;

const MiniModal = ({
  account,
  newAccounts,
  newExpensesCategory,
  newExpensesGroupCategory,
  selectWallet,
}) => {
  const dispatch = useDispatch();

  const [required, setRequired] = useState(false);
  const { category, accounts, expenses, title } = useSelector((store) => ({
    category: store.analysis.category,
    title: store.analysis.title,
    accounts: store.analysis.accounts,
    expenses: store.analysis.expenses,
  }));

  const submitAcc = (newAcc) => {
    if (newAcc.title === "") {
      setRequired(true);
      return false;
    } else {
      newAcc.quantity = parseInt(newAcc.quantity);
      dispatch(addNewAccount(newAcc));
      dispatch(closeMiniModal());
    }
  };

  const submitExp = (newExp) => {
    if (newExp.title === "") {
      setRequired(true);
      return false;
    } else {
      newExp.quantity = parseInt(newExp.quantity);
      const accmap = accounts.filter((account) => {
        if (account.id === newExp.idAccount) {
          account.quantity = account.quantity - newExp.quantity;
          return account;
        }
      });
      console.log(accmap[0]);
      dispatch(addNewExpense(newExp, accmap[0]));
      dispatch(closeMiniModal());
      console.log(accounts);
      console.log(newWallet);
    }
  };

  const miniModalClose = () => {
    dispatch(closeMiniModal());
  };

  let newDate = new Date();
  let today = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let addDate = `${today < 10 ? `0${today}` : `${today}`}.${
    month < 10 ? `0${month}` : `${month}`
  }.${year}`;

  const newAccount = {
    title: selectWallet ? selectWallet.title : "",
    category: selectWallet ? selectWallet.category : "",
    quantity: selectWallet ? selectWallet.quantity : "",
    date: addDate,
    id: selectWallet ? selectWallet.id : uuidv4(),
    type: selectWallet ? selectWallet.type : "",
  };
  const newExpense = {
    id: account ? account.id : uuidv4(),
    date: addDate,
    idAccount: account ? account.idAccount : "",
    quantity: account ? account.quantity : "",
    category: account ? account.category : "",
    groupCategory: account ? account.groupCategory : "",
    title: account ? account.title : "",
    type: "Wydatek",
  };
  const [newWallet, setNewWallet] = useState(newAccount);
  const [newExp, setNewExp] = useState(newExpense);
  const [idAcc, setIdAcc] = useState("");
  console.log(selectWallet);

  const handleInputWalletChange = (e) => {
    setNewWallet({
      ...newWallet,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputExpChange = (e) => {
    setNewExp({
      ...newExp,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledBackgroundWrapper>
      <StyledWrapper>
        <StyledButtonClose onClick={miniModalClose}>
          <FontAwesomeIcon icon={faWindowClose} />
        </StyledButtonClose>
        {category === "Konto" ? (
          <>
            <StyledTitle> {title} </StyledTitle>
            <Input
              secondary
              className="required"
              type="text"
              required="required"
              title="Nazwa konta"
              name="title"
              value={newWallet.title}
              onChange={handleInputWalletChange}
            />
            <Input
              secondary
              className="required"
              type="text"
              required="required"
              title="Kategoria"
              name="category"
              list="accountsCategory"
              newAccounts={newAccounts}
              value={newWallet.category}
              onChange={handleInputWalletChange}
            />
            <Input
              secondary
              className="required"
              type="text"
              required="required"
              title="Stan konta"
              name="quantity"
              value={newWallet.quantity}
              onChange={handleInputWalletChange}
            />
            <StyledSelect onChange={handleInputWalletChange} name="type">
              <StyledOption value="Środki bieżące">Środki bieżące</StyledOption>
              <StyledOption value="Oszczędności">Oszczędności</StyledOption>
            </StyledSelect>
            <StyledLabel>Typ konta</StyledLabel>
            <Button type="button" primary onClick={() => submitAcc(newWallet)}>
              {title}
            </Button>
            {title === "Edytuj konto" && (
              <Button
                secondary
                primary
                type="button"
                onClick={() => submitAcc(newWallet)}
              >
                Usuń konto
              </Button>
            )}
          </>
        ) : (
          <>
            <StyledTitle> {title} </StyledTitle>

            <Input
              list="expensesCategory"
              required="required"
              className="required"
              type="text"
              newExpenses={newExpensesCategory}
              secondary
              title="Kategoria wydatku"
              name="category"
              option="category"
              value={newExp.category}
              onChange={handleInputExpChange}
            />
            {required && newExp.title === "" && (
              <StyledRequiredText>
                Wpisz lub wybierz kategorie
              </StyledRequiredText>
            )}
            <Input
              secondary
              list="expensesGroupCategory"
              className="required"
              type="text"
              required="required"
              title="Podgrupa wydatku"
              name="groupCategory"
              option=""
              newExpenses={newExpensesGroupCategory}
              value={newExp.groupCategory}
              category={newExp.category}
              onChange={handleInputExpChange}
            />
            <Input
              secondary
              className="required"
              type="text"
              required="required"
              title="Nazwa"
              name="title"
              value={newExp.title}
              onChange={handleInputExpChange}
            />
            <Input
              secondary
              className="required"
              type="text"
              required="required"
              title="Podaj kwotę wydatku"
              name="quantity"
              value={newExp.quantity}
              onChange={handleInputExpChange}
            />

            <StyledSelect onChange={handleInputExpChange} name="idAccount">
              {accounts.map((acc) => (
                <StyledOption value={acc.id}>{acc.title}</StyledOption>
              ))}
            </StyledSelect>
            <StyledLabel>Konto</StyledLabel>
            <Button type="button" primary onClick={() => submitExp(newExp)}>
              {title}
            </Button>
          </>
        )}
      </StyledWrapper>
    </StyledBackgroundWrapper>
  );
};

export default MiniModal;
