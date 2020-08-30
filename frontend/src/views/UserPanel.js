import React from 'react'
import UserPageTemplate from '../templates/UserPageTemplate'
import styled from 'styled-components'

const StyledWrapper = styled.div`
`
const StyledTitle = styled.h4`
text-align: center;
`

const UserPanel = () => {
    return (
        <UserPageTemplate pageContext="userpanel">
            <StyledWrapper>
<StyledTitle>Panel Użytkownika</StyledTitle>

            </StyledWrapper>
        </UserPageTemplate>
    )
}

export default UserPanel
