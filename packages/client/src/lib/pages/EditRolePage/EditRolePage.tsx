import { useLocation } from 'react-router-dom'
import { Header } from 'shared'
import styled from 'styled-components'

const EditRolePage = () => {
    const location = useLocation()
    const { methods } = location.state
    console.log(methods)
    return (
        <PageContainerStyled>
            <WrapperStyled>
                <ContentStyled>
                    <Header title={'Owner permissions'} />
                </ContentStyled>
            </WrapperStyled>
        </PageContainerStyled>
    )
}
const PageContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    gap: 105px;
    padding: 36px;
`
const WrapperStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    gap: 60px;
`
export default EditRolePage
