import { ReactElement } from 'react'
import {
    ContentStyled,
    ContentWrapper,
    HeaderStyled,
    LayoutStyled,
    RightbarStyled,
    SidebarStyled,
    ToolbarStyled,
} from './styles'

interface MainLayoutProps {
    header?: ReactElement
    content: ReactElement
    sidebar?: ReactElement
    toolbar?: ReactElement
    isAuth: boolean
}
export const Layout = (props: MainLayoutProps) => {
    const { content, toolbar, header, sidebar, isAuth } = props
    if (!isAuth) {
        return content
    }
    return (
        <LayoutStyled>
            <HeaderStyled>{header}</HeaderStyled>
            <ContentWrapper>
                <SidebarStyled>{sidebar}</SidebarStyled>
                <ContentStyled>{content}</ContentStyled>
            </ContentWrapper>
            <ToolbarStyled>{toolbar}</ToolbarStyled>
        </LayoutStyled>
    )
}
