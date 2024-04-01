import { gql } from "@apollo/client";

export const FETCH_ALL_STUDENTS = gql`
    query fetchAllStudents {
        students {
            id
            name
            grade
        }
    }
`;


// Fetch a single student
export const FETCH_SINGLE_STUDENT_QUERY = gql`
query fetchSingleStudent($id: Int!) {
   students_by_pk(id: $id) {
    id
    name
    grade
    teacher_id
}
}
`;
type IFetchSingleStudentQueryVariables = { id: number };
export const FETCH_SINGLE_STUDENT_QUERY_VARIABLES = (vars: IFetchSingleStudentQueryVariables) => vars;