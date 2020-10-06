import React from "react";
import { useDispatch } from "react-redux";

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

const AddForm = ({
  selectWallet,
  newObj,
  handleInput,
  titleName,
  titleQuantity,
  accountType,
  newExpensesGroupCategory,
  typeOfNew
}) => {
  const { category, accounts, title, openWM, auth, sumAccounts } = useSelector(
    (store) => ({
      category: store.analysis.category,
      title: store.analysis.title,
      accounts: store.analysis.accounts,
      openWM: store.analysis.openWM,
      auth: store.auth,
      sumAccounts: store.aggregate.sumAccounts,
    })
  );
  const dispatch = useDispatch();

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

  return (
    <StyledBackgroundWrapper>
      <StyledWrapper>
        <StyledButtonClose onClick={miniModalClose}>
          <FontAwesomeIcon icon={faWindowClose} />
        </StyledButtonClose>
     
          <StyledTitle> {title} </StyledTitle>
          <Input
            secondary
            className="required"
            type="text"
            required="required"
            title={titleName}
            name="title"
            value={newObj.title}
            onChange={handleInput}
          />
          {required && newObj.title === "" && (
            <StyledRequiredText>Wpisz nazwę</StyledRequiredText>
          )}
          {newObj.category !== "" && selectWallet.category ? (
            <>
              <StyledSelect onChange={handleInputWalletChange} name="category">
                <StyledOption value={newObj.category}>
                  {newObj.category}
                </StyledOption>
              </StyledSelect>
              <StyledLabel>Kategoria</StyledLabel>
            </>
          ) : (
            <>
              <Input
                secondary
                className="required"
                type="text"
                required="required"
                title="Kategoria"
                name="category"
                list="accountsCategory"
                typeOfNew = {typeOfNew}
                newAccounts={sumAccounts}
                value={newObj.category}
                onChange={handleInput}
              />
            </>
          )}
          {required && newObj.category === "" && (
            <StyledRequiredText>Wpisz lub wybierz kategorię</StyledRequiredText>
          )}
          {newObj.groupcategory && (
              <Input
               secondary
               list="expensesGroupCategory"
               className="required"
               type="text"
               required="required"
               title="Podgrupa wydatku"
               name="groupcategory"
               option=""
               typeOfNew = {typeOfNew}
               newAccounts={newExpensesGroupCategory}
               value={newObj.groupcategory}
               category={newObj.category}
               onChange={handleInput}
             />
             {required && newExp.groupcategory === "" && (
               <StyledRequiredText>
                 Wpisz lub wybierz podkategorie
               </StyledRequiredText>
             )}
          )}
          <Input
            secondary
            className="required"
            type="text"
            required="required"
            title={titleQuantity}
            name="quantity"
            value={newObj.quantity}
            onChange={handleInput}
            option="category"
          />
          {newObj.type && (
            <React.Fragment>
              {required && newObj.quantity === "" && (
                <StyledRequiredText>Podaj ilość</StyledRequiredText>
              )}
              {newObj.type !== "" &&
              newObj.type !== "Wybierz" &&
              selectWallet.type ? (
                <>
                  <StyledSelect onChange={handleInput} name="type">
                    <StyledOption value={newObj.type}>
                      {newObj.type}
                    </StyledOption>
                  </StyledSelect>
                  <StyledLabel>Typ konta</StyledLabel>
                </>
              ) : (
                <>
                  <StyledSelect onChange={handleInputWallet} name="type">
                    <StyledOption value="Wybierz">
                      Wybierz typ konta
                    </StyledOption>
                    <>
                      {Array.isArray(accountType) ? (
                        <>
                          {accountType.map((at) => (
                            <StyledOption value={at}>{at}</StyledOption>
                          ))}
                        </>
                      ) : (
                        <StyledOption value={accountType}>
                          {accountType}
                        </StyledOption>
                      )}
                    </>
                  </StyledSelect>
                  <StyledLabel>Typ konta</StyledLabel>

                  {required &&
                    (newObj.type === "" || newObj.type === "Wybierz") && (
                      <StyledRequiredText>Wybierz typ konta</StyledRequiredText>
                    )}
                </>
              )}
            </React.Fragment>
          )}
          {title==="Dodaj wydatek" && (
                <React.Fragment>
          <StyledSelect
            onChange={handleInput}
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
                </React.Fragment>
            )}


          <Button width type="button" primary onClick={() => submit(newObj)}>
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
                  newWallet={newObj}
                  warningModalClose={warningModalClose}
                />
              )}
            </>
          )}
      </StyledWrapper>
    </StyledBackgroundWrapper>
  );
};

export default AddForm;
