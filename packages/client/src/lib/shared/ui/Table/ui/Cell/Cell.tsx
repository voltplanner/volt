import { WrapperStyled } from './styles'

export const Cell = (props: any) => {
    const { width, children } = props
    return <WrapperStyled $width={width}>{children}</WrapperStyled>
}
