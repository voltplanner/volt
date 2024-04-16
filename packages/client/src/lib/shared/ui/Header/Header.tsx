import { memo } from 'react'
import { HeaderStyled, TitleStyled, SubtitleStyled } from './styles'
interface HeaderProps {
    title?: string
    subtitle?: string
}
export const Header = memo((props: HeaderProps) => {
    const { title, subtitle } = props
    return (
        <HeaderStyled>
            {title && <TitleStyled>{title}</TitleStyled>}
            {subtitle && <SubtitleStyled>{subtitle}</SubtitleStyled>}
        </HeaderStyled>
    )
})
