import styled from 'styled-components'
import AppRouter from './routes/AppRouter'
import { Layout } from './Layout'
import { useSessionStore } from 'entities'
import { useEffect } from 'react'

export function App() {
    const { checkAuth, getLocalSession } = useSessionStore()
    useEffect(() => {
        const intervalId = setInterval(() => {
            getLocalSession()
        }, 3000)
        return () => clearInterval(intervalId)
    }, [])
    return (
        <WrapperStyled>
            <Layout
                header={undefined}
                content={<AppRouter />}
                sidebar={undefined}
                isAuth={checkAuth()}
            />
        </WrapperStyled>
    )
}

export default App
const WrapperStyled = styled.div`
    display: flex;
    min-width: 100%;
    min-height: 100%;
    background: #fff;
`
