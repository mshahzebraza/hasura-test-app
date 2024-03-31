import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select,
} from '@chakra-ui/react';

type IStudentForm = {
    name: string;
    teacher: string;
    grade: number;
};

type IStudentFormProps = {
    prevData?: IStudentForm;
};

export default function StudentForm(props: IStudentFormProps) {
    const { prevData = {} } = props;
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<IStudentForm>({
        defaultValues: prevData
    })

    function onSubmit(values: IStudentForm) {
        console.log(`🚀 ~ onSubmit ~ values:`, values)
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         alert(JSON.stringify(values, null, 2))
        //         resolve('Submitted successfully')
        //     }, 3000)
        // })
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

                    <option value='teacher1'>Teacher 1</option>
                    <option value='teacher2'>Teacher 2</option>
                    <option value='teacher3'>Teacher 3</option>
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