import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDENT_MUTATION, CREATE_STUDENT_MUTATION_VARIABLES, EDIT_TEACHER_FOR_STUDENT_MUTATION, EDIT_TEACHER_FOR_STUDENT_MUTATION_VARIABLES } from '@/graphql/mutations/student.mutation';
import { useRouter } from 'next/navigation';
import { IStudentForm } from '../../new/CreateStudentForm';
import { FETCH_SINGLE_STUDENT_QUERY, FETCH_SINGLE_STUDENT_QUERY_VARIABLES } from '@/graphql/queries/student.query';
import { useEffect } from 'react';


type IUseEditStudentFormProps = {
    editId: number;
    onSubmit: (values: IStudentForm, reset: () => void) => void;
    onError: (error: any) => void;
}
export const useEditStudentForm = (props: IUseEditStudentFormProps) => {
    const { editId, onSubmit, onError } = props;
    const router = useRouter();

    // Get the student against the active student id
    const {
        data: prevStudentData,
        loading: prevStudentLoading,
        error: prevStudentError
    } = useQuery(FETCH_SINGLE_STUDENT_QUERY, {
        variables: FETCH_SINGLE_STUDENT_QUERY_VARIABLES({ id: Number(editId) })
    })
    console.log(`🚀 ~ useEditStudentForm ~ editId:`, editId)

    console.log(`🚀 ~ useStudentForm ~ prevStudentData:`, prevStudentData)



    // Extract the form methods
    const {
        handleSubmit, register, reset: resetForm, formState: { errors, isSubmitting }
    } = useForm<IStudentForm>({
        defaultValues: prevStudentData?.students_by_pk || {}
    });

    // Extract the mutation methods
    const [mutateStudentAction, { data: mutationResponse, loading: mutationLoading, error: mutationError }] = useMutation(
        EDIT_TEACHER_FOR_STUDENT_MUTATION,
        {
            onCompleted: (data) => {
                console.log(data);
                router.push('/student');
            },
            onError: (error) => {
                onError(error);
            }
        }
    );

    const formValuesHandler = (values: IStudentForm) => {
        mutateStudentAction({
            variables: EDIT_TEACHER_FOR_STUDENT_MUTATION_VARIABLES({
                studentId: Number(editId),
                teacherId: values.teacher_id
            })
        });

        onSubmit(values, resetForm);
    };
    const formSubmitHandler = handleSubmit(formValuesHandler);

    useEffect(() => {
        resetForm(prevStudentData?.students_by_pk || {});
    }, [prevStudentData])

    return {
        formSubmitHandler,
        register,
        errors,
        isSubmitting,
        mutationResponse,
        mutationLoading,
        mutationError
    };
};
