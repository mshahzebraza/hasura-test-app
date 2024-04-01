import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_STUDENT_MUTATION, CREATE_STUDENT_MUTATION_VARIABLES, EDIT_TEACHER_FOR_STUDENT_MUTATION, EDIT_TEACHER_FOR_STUDENT_MUTATION_VARIABLES } from '@/graphql/mutations/student.mutation';
import { useRouter } from 'next/navigation';
import { IStudentForm } from './CreateStudentForm';
import { FETCH_SINGLE_STUDENT_QUERY, FETCH_SINGLE_STUDENT_QUERY_VARIABLES } from '@/graphql/queries/student.query';
import { applicationPaths } from '@/lib/paths.constants';


type IUseCreateStudentFormProps = {
    onSubmit: (values: IStudentForm, reset: () => void) => void;
    onError: (error: any) => void;
}
export const useCreateStudentForm = (props: IUseCreateStudentFormProps) => {
    const { onSubmit, onError } = props;
    const router = useRouter();

    // Extract the form methods
    const {
        handleSubmit,
        register,
        reset:
        resetForm,
        formState: { errors, isSubmitting }
    } = useForm<IStudentForm>();

    // Extract the mutation methods
    const [mutateStudentAction, { data: mutationResponse, loading: mutationLoading, error: mutationError }] = useMutation(
        CREATE_STUDENT_MUTATION,
        {
            onCompleted: (data) => {
                console.log(data);
                router.push(applicationPaths.allStudents);
            },
            onError: (error) => {
                onError(error);
            }
        }
    );

    const formValuesHandler = (values: IStudentForm) => {
        mutateStudentAction({
            variables: CREATE_STUDENT_MUTATION_VARIABLES({
                grade: values.grade,
                name: values.name,
                teacherId: values.teacher_id
            })
        });

        onSubmit(values, resetForm);
    };

    const formSubmitHandler = handleSubmit(formValuesHandler);


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
