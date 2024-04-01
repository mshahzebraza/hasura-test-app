import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL_QUERY = gql`
    query GetUserByEmail($email: String!) {
      users(where: {email: {_eq: $email}}) {
        uid
        email
        role
      }
    }
`;