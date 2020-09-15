import React from "react";

const ExpensesList = ({ allExp, newExpensesCategory, sumAllExp }) => {
  return (
    <StyledSection>
      <StyledTitle>Kategorie wydatków</StyledTitle>

      <StyledFirstSection
        onClick={() => {
          selectAcc(allExp, accounts);
        }}
        active={activeBar === allExp.id}
      >
        <StyledParagraph primary>Wszystkie</StyledParagraph>
        <StyledQuantity primary>{sumAllExp} PLN</StyledQuantity>
      </StyledFirstSection>

      {newExpensesCategory.map((acc) => {
        return (
          <StyledFirstSection
            key={acc.category}
            onClick={() => {
              selectExp(acc, expenses);
            }}
          >
            <StyledParagraph primary>{acc.category}</StyledParagraph>
            <StyledQuantity primary>{acc.quantity} PLN</StyledQuantity>
          </StyledFirstSection>
        );
      })}

      <StyledOptionWrapper>
        <StyledAddTitle>Dodaj wydatek</StyledAddTitle>
        <StyledIcon onClick={() => opentModal("Wydatek")}>
          <FontAwesomeIcon icon={faPlusCircle} style={{ margin: "0 10px" }} />
        </StyledIcon>
      </StyledOptionWrapper>
    </StyledSection>
  );
};

export default ExpensesList;
