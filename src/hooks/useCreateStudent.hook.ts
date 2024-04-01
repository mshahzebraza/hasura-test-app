import { CREATE_STUDENT_MUTATION } from '@/graphql/mutations/student.mutation';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';


type IStudentForm = {
    name: string;
    teacher: number;
    grade: number;
};

export function useCreateStudent({ prevData }: { prevData?: IStudentForm }) {


    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IStudentForm>({
        defaultValues: prevData
    })

    const [createStudent, { data, loading, error }] = useMutation(CREATE_STUDENT_MUTATION);


    async function create(values: IStudentForm) {
        await createStudent({
            variables: {
                grade: values.grade,
                name: values.name,
                teacherId: values.teacher
            }
        });
    }

    return { create, data, loading, error };
}