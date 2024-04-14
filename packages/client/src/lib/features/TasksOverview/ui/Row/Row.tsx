import { WrapperStyled } from './styles'

export const Row = (props: any) => {
    const { children } = props
    return <WrapperStyled>{children}</WrapperStyled>
}
