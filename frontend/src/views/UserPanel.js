import React from 'react'
import UserPageTemplate from '../templates/UserPageTemplate'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Button from '../components/atoms/Button'
import image from "../assets/pictures/undraw_male_avatar.svg"

const StyledWrapper = styled.div`
display:flex;
justify-content: center;
flex-direction:column;
align-items:center;

`
const StyledHeader = styled.h3`
margin:10px;
text-align: center;
padding-bottom:10px;
`
const StyledAdminContainer = styled.div`
  background: ${({ theme }) => theme.primarycolor};
  color: ${({ theme }) => theme.whitecolor};
width: 300px;
height:fit-content;
border-radius: 4px;
  box-shadow: 0 0 30px rgba(black, 0.1);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left:40px;
`
const StyledTitle = styled.p`
font-weight: ${({ theme }) => theme.font500};
text-align:center;
`
const StyledContainer = styled.div`
display:flex;
justify-content:center;
position:relative;
left: 50%;
    transform: translate(-50%, 50%);
`
const StyledBackgroundImg = styled.img`
width:200px;
margin-right:40px;

`

const UserPanel = () => {
    const { auth } = useSelector((store) => ({
        auth: store.auth,
      }));

    return (
        <UserPageTemplate pageContext="userpanel">
            <StyledContainer>
                <StyledBackgroundImg src={image} alt={image} >

                </StyledBackgroundImg>
            <StyledWrapper>
<StyledAdminContainer>
<StyledHeader>Panel Użytkownika</StyledHeader>
<StyledTitle>Nazwa użytkownika: <strong>{auth.user.login}</strong></StyledTitle>

<Button secondary type="button">Zmień hasło</Button>
<Button secondary type="button">Usuń Użytkownika</Button>

</StyledAdminContainer>
            </StyledWrapper>
            </StyledContainer>
        </UserPageTemplate>
    )
}

export default UserPanel
