import { EditRole } from 'features'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Header } from 'shared'
import {
    PageContainerStyled,
    WrapperStyled,
    ContentStyled,
    ButtonsContainer,
} from './styles'

const EditRolePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/roles')
    }
    return (
        <PageContainerStyled>
            <WrapperStyled>
                <ButtonsContainer>
                    <Button onClick={handleNavigate}>{'< Back'}</Button>
                </ButtonsContainer>
                <ContentStyled>
                    <Header title={'Owner permissions'} />
                    <EditRole name={id ?? ''} />
                </ContentStyled>
            </WrapperStyled>
        </PageContainerStyled>
    )
}

export default EditRolePage
