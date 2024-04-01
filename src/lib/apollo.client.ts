// create a new apollo client
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Replace 'http://localhost:4000/graphql' with your GraphQL server's URI
const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HASURA_URL as string,
    cache: new InMemoryCache(),
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apolloClient;