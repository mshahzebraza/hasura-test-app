import { GET_USER_BY_EMAIL_QUERY } from "@/graphql/queries/user.query";
import apolloClient from "@/lib/apollo.client";

interface User {
    id: string;
    email: string;
    role: string;
}

interface CheckUserExistsResponse {
    users: User[];
}

export async function checkUserExists(email: string) {

    try {
        const { data, loading, error } = await apolloClient.query<CheckUserExistsResponse>({
            query: GET_USER_BY_EMAIL_QUERY,
            variables: { email }
        })

        if (data.users.length > 0) {
            return data.users[0];
        } else {
            return null;
        }

    } catch (error) {
        console.error('Error fetching user from Hasura:', error);
        return null; // Handle error appropriately in production
    }
}