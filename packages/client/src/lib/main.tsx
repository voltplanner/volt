import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { apolloClient } from './shared'
import { ApolloProvider } from '@apollo/client'

import App from './app/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </StrictMode>,
)
