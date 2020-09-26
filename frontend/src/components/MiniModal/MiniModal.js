import React, { useState } from "react";
import Button from "../atoms/Button";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  closeMiniModal,
  addNewAccount,
  addNewExpense,
  editAccount,
  loadingAccount,
  removeAccount,
  openMiniModal,
  openWarningModal,
  closeWarningModal,
} from "../../redux/actions/analysisActions";
import { useDispatch, useSelector } from "react-redux";
import Input from "../atoms/Input";
import { v4 as uuidv4 } from "uuid";
import { parse } from "@fortawesome/fontawesome-svg-core";
import WarningModal from "../atoms/WarningModal";

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
  /* border: 1px solid lightgrey;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 5px; */
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
  color: ${({ theme }) => theme.primarycolor};
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  height: fit-content;
  text-align: end;
  width: 18px;
  position: fixed;
  right: 3%;
  top: 1%;
  :hover,
  :focus {
    color: ${({ theme }) => theme.lightcolor};
    text-decoration: none;
    cursor: pointer;
  }
`;
const StyledTitle = styled.p`
  padding-bottom: 10px;
  font-weight: ${({ theme }) => theme.font500};
`;
const StyledSelect = styled.select`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 250px;
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
  font-size: 14px;
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
  newAccounts,
  newExpensesCategory,
  newExpensesGroupCategory,
  selectWallet,
  setSelectWallet,
  account,
}) => {
  const dispatch = useDispatch();

  const [required, setRequired] = useState(false);
  const { category, accounts, expenses, title, openWM } = useSelector(
    (store) => ({
      category: store.analysis.category,
      title: store.analysis.title,
      accounts: store.analysis.accounts,
      expenses: store.analysis.expenses,
      openWM: store.analysis.openWM,
    })
  );
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));

  const submitAcc = (newAcc) => {
    if (
      newAcc.title === "" ||
      newAcc.category === "" ||
      newAcc.quantity === "" ||
      newAcc.type === "" ||
      newAcc.type === "Wybierz"
    ) {
      console.log(newAcc);
      setRequired(true);
      return false;
    } else {
      console.log(newAcc.category);
      newAcc.quantity = parseInt(newAcc.quantity);
      if (selectWallet) {
        console.log(newAcc);
        dispatch(editAccount(newAcc.id, newAcc));
      } else {
        console.log(newAcc);
        dispatch(addNewAccount(newAcc));
      }
      setSelectWallet(newWallet);
      dispatch(closeMiniModal());
    }
  };

  const warningModalOpen = () => {
    dispatch(openWarningModal());
  };
  const warningModalClose = () => {
    dispatch(closeWarningModal());
  };

  const removeAcc = (removeAcc) => {
    dispatch(removeAccount(removeAcc));
    dispatch(closeWarningModal());
    dispatch(closeMiniModal());
  };

  const submitExp = (newExp) => {
    if (
      newExp.title === "" ||
      newExp.category === "" ||
      newExp.groupcategory === "" ||
      newExp.quantity === "" ||
      newExp.idaccount === "" ||
      newExp.idaccount === "Wybierz"
    ) {
      setRequired(true);
      return false;
    } else {
      newExp.quantity = parseInt(newExp.quantity);
      newExp.idaccount = parseInt(newExp.idaccount);
      const accmap = accounts.filter((account) => {
        if (account.id === newExp.idaccount) {
          account.quantity = account.quantity - newExp.quantity;
          return account;
        }
      });
      console.log(accmap);
      console.log(accmap[0]);
      dispatch(addNewExpense(newExp, accmap[0]));

      dispatch(closeMiniModal());
      console.log(accounts);
      console.log(newExp);
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
    id: selectWallet && selectWallet.id,
    type: selectWallet ? selectWallet.type : "",
    user_id: selectWallet ? selectWallet.user_id : auth.user.id,
  };
  const newExpense = {
    date: addDate,
    idaccount: account ? account.idaccount : "",
    quantity: account ? account.quantity : "",
    category: account ? account.category : "",
    groupcategory: account ? account.groupcategory : "",
    title: account ? account.title : "",
    type: "Wydatek",
    user_id: account ? account.user_id : auth.user.id,
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
            {required && newWallet.title === "" && (
              <StyledRequiredText>Wpisz nazwę</StyledRequiredText>
            )}
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
            {required && newWallet.category === "" && (
              <StyledRequiredText>
                Wpisz lub wybierz kategorię
              </StyledRequiredText>
            )}
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
            {required && newWallet.quantity === "" && (
              <StyledRequiredText>Podaj ilość</StyledRequiredText>
            )}
            {newWallet.type !== "" && newWallet.type !== "Wybierz" ? (
              <>
                <StyledSelect onChange={handleInputWalletChange} name="type">
                  <StyledOption value={newWallet.type}>
                    {newWallet.type}
                  </StyledOption>
                </StyledSelect>
                <StyledLabel>Typ konta</StyledLabel>
              </>
            ) : (
              <>
                <StyledSelect onChange={handleInputWalletChange} name="type">
                  <StyledOption value="Wybierz">Wybierz typ konta</StyledOption>
                  <StyledOption value="Środki bieżące">
                    Środki bieżące
                  </StyledOption>
                  <StyledOption value="Oszczędności">Oszczędności</StyledOption>
                </StyledSelect>
                <StyledLabel>Typ konta</StyledLabel>

                {required &&
                  (newWallet.type === "" || newWallet.type === "Wybierz") && (
                    <StyledRequiredText>Wybierz typ konta</StyledRequiredText>
                  )}
              </>
            )}
            <Button
              width
              type="button"
              primary
              onClick={() => submitAcc(newWallet)}
            >
              {title}
            </Button>
            {title === "Edytuj konto" && (
              <>
                <Button
                  width
                  secondary
                  primary
                  type="button"
                  onClick={() => warningModalOpen()}
                >
                  Usuń konto
                </Button>
                {openWM && (
                  <WarningModal
                    title="Czy na pewno chcesz usunąć konto?"
                    removeAcc={removeAcc}
                    newWallet={newWallet}
                    warningModalClose={warningModalClose}
                  />
                )}
              </>
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
            {required && newExp.category === "" && (
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
              name="groupcategory"
              option=""
              newExpenses={newExpensesGroupCategory}
              value={newExp.groupcategory}
              category={newExp.category}
              onChange={handleInputExpChange}
            />
            {required && newExp.groupcategory === "" && (
              <StyledRequiredText>
                Wpisz lub wybierz podkategorie
              </StyledRequiredText>
            )}
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
            {required && newExp.title === "" && (
              <StyledRequiredText>Wpisz nazwę</StyledRequiredText>
            )}
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
            {required && newExp.quantity === "" && (
              <StyledRequiredText>Wpisz kwotę</StyledRequiredText>
            )}
            <StyledSelect
              onChange={handleInputExpChange}
              name="idaccount"
              required="required"
              className="required"
              title="Wybierz konto"
            >
              <StyledOption value="Wybierz">Wybierz konto</StyledOption>
              {accounts.map((acc) => (
                <StyledOption value={acc.id}>{acc.title}</StyledOption>
              ))}
            </StyledSelect>
            <StyledLabel>Konto</StyledLabel>
            {required &&
              (newExp.idaccount === "" || newExp.idaccount === "Wybierz") && (
                <StyledRequiredText>Wybierz konto</StyledRequiredText>
              )}
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
