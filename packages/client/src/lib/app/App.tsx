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
    width: 100vw;
    height: 100%;
    background: #979797;
`
