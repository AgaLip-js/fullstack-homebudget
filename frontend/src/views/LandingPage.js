import React from "react";
import img1 from "../assets/pictures/undraw_Savings.svg";
import img2 from "../assets/pictures/undraw_finance2.svg";
import img3 from "../assets/pictures/undraw_personal.svg";
import img4 from "../assets/pictures/money4.png";
import img5 from "../assets/pictures/undraw_dashboard.svg";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const StyledFirstContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => theme.whitecolor};
  padding: 20px;
  padding-top: 90px;
`;
const StyledFirstText = styled.p`
  font-weight: ${({ theme }) => theme.font600};
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.blackcolor};
  text-align: center;
`;
const StyledImg = styled.img`
  height: 50vh;
  width: 50vw;
`;
const StyledSecondContainer = styled(StyledFirstContainer)`
  background-color: ${({ theme }) => theme.primarycolor};
`;
const StyledSecondText = styled(StyledFirstText)`
  color: ${({ theme }) => theme.whitecolor};
  line-height: 1.5;
`;

const StyledThirdContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  justify-items: center;
  row-gap: 20px;
  align-items: center;
  padding-bottom: 90px;
`;
const StyledImg2 = styled.img`
  height: 25vh;
`;

const StyledSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledDiv = styled.div`
  text-align: justify;
  line-height: 2.5;
  width: 100%;
`;
const StyledHeaderTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.l};
`;
const StyledThirdText = styled.p`
  letter-spacing: 0.5px;
`;

const LandingPage = () => {
  return (
    <StyledWrapper>
      <Navbar aos="fade-down" />
      <StyledFirstContainer data-aos="fade-up">
        <StyledFirstText>
          Zdobądź pełną kontrolę nad Twoimi pieniędzmi
        </StyledFirstText>
        <StyledImg src={img1} alt={img1} />
      </StyledFirstContainer>
      <StyledSecondContainer data-aos="fade-down">
        <StyledImg src={img2} alt={img2} />
        <StyledSecondText>
          Aplikacja do zarządzania domowym budżetem pozwoli Ci w pełni
          kontrolować twoje wydatki. Nawet nie wiesz ile można zaoszczędzić!
        </StyledSecondText>
      </StyledSecondContainer>
      <StyledThirdContainer data-aos="fade-down">
        <StyledImg2 src={img4} alt={img4} />
        <StyledImg2 src={img5} alt={img5} />
        <StyledImg2 src={img3} alt={img3} />
        <StyledSection>
          <StyledDiv>
            <StyledHeaderTitle>Podsumowanie</StyledHeaderTitle>
            <StyledThirdText>
              Twój rzeczywisty stan finansów, przedstawiający sumę przychodów i
              wydatków.
            </StyledThirdText>
          </StyledDiv>
        </StyledSection>
        <StyledSection>
          <StyledDiv>
            <StyledHeaderTitle>Analiza wydatków</StyledHeaderTitle>
            <StyledThirdText>
              Raporty przedstawiające bilans na dany dzień. Dodawaj swoje
              wydatki i porównuj z zaplanowanym budżetem.
            </StyledThirdText>
          </StyledDiv>
        </StyledSection>
        <StyledSection>
          <StyledDiv>
            <StyledHeaderTitle>Planowanie budżetu</StyledHeaderTitle>
            <StyledThirdText>
              Zaplanuj swój budżet i miej większą kontrolę nad własnymi
              finansami.
            </StyledThirdText>
          </StyledDiv>
        </StyledSection>
      </StyledThirdContainer>
      <Footer />
    </StyledWrapper>
  );
};

export default LandingPage;
