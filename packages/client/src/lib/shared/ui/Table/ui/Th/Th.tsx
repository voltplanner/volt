import { WrapperStyled } from './styles'

export const Th = (props: any) => {
    const { width, children } = props
    return <WrapperStyled $width={width}>{children}</WrapperStyled>
}
