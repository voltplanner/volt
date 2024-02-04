import { Button } from 'shared'
import styled from 'styled-components'
interface ExternalLoginFormProps {
    onClick: () => void
}
export const ExternalLoginForm = (props: ExternalLoginFormProps) => {
    const { onClick } = props

    return (
        <WrapperStyled>
            <Button size="auto" variant="primary">
                Continue with Gitlab
            </Button>
            <Button size="auto" variant="primary">
                Continue with Github
            </Button>
            <Button size="auto" variant="primary">
                Continue with Google
            </Button>
            <Button size="auto" variant="primary">
                Continue with Gitlab
            </Button>
            <Button size="auto" variant="primary" onClick={onClick}>
                Continue with Email
            </Button>
        </WrapperStyled>
    )
}
const WrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
