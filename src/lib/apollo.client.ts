// create a new apollo client
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Replace 'http://localhost:4000/graphql' with your GraphQL server's URI
const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HASURA_URL as string,
    cache: new InMemoryCache(),
    headers: {
        // 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
        'x-hasura-admin-secret': 'tG4FTYYTEfr4IiTnj0sr1uXUsKLMp4NI1Rig4MWEwjQb5DA0WTJJRVbZIVPEqQBJ' as string,
        'Content-Type': 'application/json',
    }
});

export default apolloClient;