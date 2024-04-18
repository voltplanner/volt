import styled from 'styled-components'
import AppRouter from './routes/AppRouter'

export function App() {
    return (
        <WrapperStyled>
            <AppRouter />
        </WrapperStyled>
    )
}

export default App
const WrapperStyled = styled.div`
    display: flex;
    min-width: 100%;
    min-height: 100vh;
    background: #fff;
`
