import { RoleList } from 'features'
import { Button, Header } from 'shared'
import styled from 'styled-components'

const RolesPage = () => {
    return (
        <PageContainerStyled>
            <ButtonsContainer>
                <Button>Create role</Button>
            </ButtonsContainer>
            <WrapperStyled>
                <ContentStyled>
                    <Header
                        title={'Roles'}
                        subtitle={'You can create role with custom permissions'}
                    />
                    <RoleList />
                </ContentStyled>
            </WrapperStyled>
        </PageContainerStyled>
    )
}
export default RolesPage

const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    gap: 60px;
`
const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: end;
`
const WrapperStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const PageContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    gap: 105px;
    padding: 36px;
`
