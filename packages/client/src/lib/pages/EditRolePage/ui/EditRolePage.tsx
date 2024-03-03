import { EditRole } from 'features'
import { useParams } from 'react-router-dom'
import { Header } from 'shared'
import { PageContainerStyled, WrapperStyled, ContentStyled } from './styles'

const EditRolePage = () => {
    const { id } = useParams()
    return (
        <PageContainerStyled>
            <WrapperStyled>
                <ContentStyled>
                    <Header title={'Owner permissions'} />
                    <EditRole name={id ?? ''} />
                </ContentStyled>
            </WrapperStyled>
        </PageContainerStyled>
    )
}

export default EditRolePage
