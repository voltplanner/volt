import { Button, Input } from 'shared'
import styled from 'styled-components'
interface InternalLoginFormProps {
    onChangeEmail: (value: string) => void
    onChangePassword: (value: string) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    disabled: boolean
}
export const InternalLoginForm = (props: InternalLoginFormProps) => {
    const { onChangeEmail, onChangePassword, onSubmit, disabled } = props
    return (
        <FormStyled onSubmit={onSubmit}>
            <WrapperStyled>
                <Input
                    autofocus
                    variant="primary"
                    onChange={onChangeEmail}
                    placeholder="Email"
                    type="email"
                />
                <Input
                    variant="primary"
                    onChange={onChangePassword}
                    placeholder="Password"
                    type="password"
                />
                <Button variant="primary" type="submit" disabled={disabled}>
                    {'Sign In'}
                </Button>
            </WrapperStyled>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    height: 120px;
    width: 100%;
`
const WrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    gap: 8px;
`
