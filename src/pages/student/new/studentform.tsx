import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

type IStudentForm = {
    name: string;
    teacher: number;
    grade: number;
};

type IStudentFormProps = {
    prevData?: IStudentForm;
};

const CREATE_STUDENT = gql`
mutation insertNewStudent ($grade:Int, $name: String, $teacherId:Int) {
  insert_students(objects: {grade: $grade, name: $name, teacher_id: $teacherId}) {
    returning {
      id
    }
  }
}`;

export default function StudentForm(props: IStudentFormProps) {
    const { prevData = {} } = props;
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IStudentForm>({
        defaultValues: prevData
    })

    const [createStudent, { data, loading, error }] = useMutation(CREATE_STUDENT);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    async function onSubmit(values: IStudentForm) {
        await createStudent({
            variables: {
                grade: values.grade,
                name: values.name,
                teacherId: values.teacher
            }
        });
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor='name'>First name</FormLabel>
                <Input
                    id='name'
                    placeholder='name'
                    {...register('name', {
                        required: 'This is required',
                        minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>

            {/* grade */}
            <FormControl isInvalid={!!errors.grade}>
                <FormLabel htmlFor='grade'>Grade</FormLabel>
                <Input
                    id='grade'
                    placeholder='grade'
                    {...register('grade', {
                        required: 'This is required',
                        min: { value: 1, message: 'Minimum value should be 1' },
                        max: { value: 12, message: 'Maximum value should be 12' },
                    })}
                />
                <FormErrorMessage>
                    {errors.grade && errors.grade.message}
                </FormErrorMessage>
            </FormControl>

            {/* Teachers */}
            <FormControl isInvalid={!!errors.teacher}>
                <FormLabel htmlFor='teachers'>Teachers</FormLabel>

                <Select
                    id='teachers'
                    placeholder='Select teachers'
                    {...register('teacher', {
                        required: 'This is required',
                    })}
                // multiple
                >

                    <option value={1}>Papa</option>
                    <option value={2}>Ammi</option>
                </Select>
                <FormErrorMessage>
                    {errors.teacher && errors.teacher.message}
                </FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
        </form>
    )
}