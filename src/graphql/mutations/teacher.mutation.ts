import { gql } from "@apollo/client";

//  Mutation, Types & Variables required to Delete a student
export const DELETE_TEACHER_MUTATION = gql`
    mutation deleteTeacher($id: Int!) {
        deleteTeacher(id: $id)
    }
`;

type IDeleteStudentMutationVariables = { id: number };
export const DELETE_TEACHER_MUTATION_VARIABLES = (vars: IDeleteStudentMutationVariables) => vars;