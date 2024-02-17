import {
    ApolloClient,
    InMemoryCache,
    concat,
    createHttpLink,
} from '@apollo/client'
import { environment } from '../../../environments/environment'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})
const httpLink = createHttpLink({
    uri: `http://localhost:${environment.serverPort}/graphql`,
})
export const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
})
