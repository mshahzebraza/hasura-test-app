import { useCreateStudentForm } from '@/pages/student/new/useCreateStudentForm';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export type IStudentForm = {
    name: string;
    teacher_id: number;
    grade: number;
};

type IStudentFormProps = {
    editId?: string;
};

export default function CreateStudentForm(props: IStudentFormProps) {
    const router = useRouter();

    const {
        errors,
        formSubmitHandler,
        isSubmitting,
        register,
        mutationResponse,
        mutationError,
        mutationLoading
    } = useCreateStudentForm({
        onSubmit: (values, reset) => {
            console.log(values);
            reset();
        },
        onError: (error) => {
            console.error(error);
        }
    })


    if (mutationLoading) return 'Submitting...';
    if (mutationError) return `Submission error! ${mutationError.message}`;


    return (
        <form onSubmit={formSubmitHandler}>

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
            <FormControl isInvalid={!!errors.teacher_id}>
                <FormLabel htmlFor='teachers'>Teachers</FormLabel>

                <Select
                    id='teachers'
                    placeholder='Select teachers'
                    {...register('teacher_id', {
                        required: 'This is required',
                    })}
                // multiple
                >

                    <option value={1}>Papa</option>
                    <option value={2}>Ammi</option>
                </Select>
                <FormErrorMessage>
                    {errors.teacher_id && errors.teacher_id.message}
                </FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
        </form>
    )
}