import styled from 'styled-components'
interface HeaderProps {
    title?: string
    subtitle?: string
}
export const Header = (props: HeaderProps) => {
    const { title, subtitle } = props
    return (
        <HeaderStyled>
            <TitleStyled>{title}</TitleStyled>
            <SubtitleStyled>{subtitle}</SubtitleStyled>
        </HeaderStyled>
    )
}
const HeaderStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`
const TitleStyled = styled.h1`
    font-weight: 500;
    font-size: 32px;
    margin: 0;
`
const SubtitleStyled = styled.p`
    font-weight: 500;
    font-size: 20px;
    margin: 0;
`
