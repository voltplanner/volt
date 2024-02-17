import { RoleList } from 'features'
import { Header } from 'shared'
import styled from 'styled-components'

const RolesPage = () => {
    return (
        <WrapperStyled>
            <ContentStyled>
                <Header
                    title={'Roles'}
                    subtitle={'You can create role with custom permissions'}
                />
                <RoleList />
            </ContentStyled>
        </WrapperStyled>
    )
}
export default RolesPage

const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    gap: 60px;
`
const WrapperStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
