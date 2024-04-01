import { gql } from "@apollo/client";

export const FETCH_ALL_TEACHERS_QUERY = gql`
    query fetchAllTeachers {
        teachers {
            id
            name
            subjects
        }
    }
`;