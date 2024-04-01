import { gql } from "@apollo/client";

// Mutation, Types & Variables required to Create a new student
export const CREATE_STUDENT_MUTATION = gql`
mutation insertNewStudent ($grade:Int, $name: String, $teacherId:Int) {
  insert_students(objects: {grade: $grade, name: $name, teacher_id: $teacherId}) {
    returning {
      id
    }
  }
}`;

type ICreateStudentMutationVariables = { grade: number, name: string, teacherId: number };
export const CREATE_STUDENT_MUTATION_VARIABLES = (vars: ICreateStudentMutationVariables) => vars;

// Mutation, Types & Variables required to Edit a student
export const EDIT_TEACHER_FOR_STUDENT_MUTATION = gql`
mutation editTeacherId ($studentId:Int!, $teacherId:Int!) {
    update_students_by_pk(pk_columns: {id: $studentId}, _set: {teacher_id: $teacherId}) {
    teacher_id
    name
  }
}`;

type IEditTeacherForStudentMutationVariables = { studentId: number, teacherId: number };
export const EDIT_TEACHER_FOR_STUDENT_MUTATION_VARIABLES = (vars: IEditTeacherForStudentMutationVariables) => vars;