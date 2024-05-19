import styled from 'styled-components'
import AppRouter from './routes/AppRouter'
import { Layout } from './Layout'

export function App() {
    return (
        <WrapperStyled>
            <Layout header={undefined} content={<AppRouter />} sidebar={undefined} />
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
