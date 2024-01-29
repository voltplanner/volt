import { ApolloClient, InMemoryCache } from '@apollo/client'
import { environment } from '../../../environments/environment'

export const apolloClient = new ApolloClient({
    uri: `http://localhost:${environment.serverPort}/graphql`,
    cache: new InMemoryCache(),
})
