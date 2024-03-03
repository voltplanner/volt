import { useState } from 'react'
import { Button, Input } from 'shared'
import { ContainerStyled, FormStyled, WrapperStyled } from './styles'

export const HiddenForm = ({
    onChange,
    onSubmit,
}: {
    onChange: (value: string) => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
    const [isOpened, setIsOpened] = useState(false)
    const onOpenClick = () => {
        setIsOpened(true)
    }
    return (
        <ContainerStyled>
            <FormStyled onSubmit={onSubmit}>
                {isOpened ? (
                    <WrapperStyled>
                        <Input
                            autofocus
                            variant="primary"
                            onChange={onChange}
                            type="email"
                        />
                        <Button variant="primary" size="auto" type="submit">
                            {'Sign In'}
                        </Button>
                    </WrapperStyled>
                ) : (
                    <Button variant="primary" onClick={onOpenClick}>
                        Continue with Email
                    </Button>
                )}
            </FormStyled>
        </ContainerStyled>
    )
}

