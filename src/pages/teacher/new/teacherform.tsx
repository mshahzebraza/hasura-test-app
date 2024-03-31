import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react';

type ITeacherForm = {
    name: string;
    subjects: string[];
};

type ITeacherFormProps = {
    prevData?: ITeacherForm;
};

export default function TeacherForm(props: ITeacherFormProps) {
    const { prevData = {} } = props;
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<ITeacherForm>({
        defaultValues: prevData
    })

    function onSubmit(values: ITeacherForm) {
        console.log(`🚀 ~ onSubmit ~ values:`, values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor='name'>Name</FormLabel>
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

            {/* Subject */}
            <FormControl isInvalid={!!errors.subjects}>
                <FormLabel htmlFor='subjects'>Subjects</FormLabel>
                <Input
                    id='subjects'
                    placeholder='subjects'
                    {...register('subjects', {
                        required: 'This is required',
                    })}
                />
                <FormErrorMessage>
                    {errors.subjects && errors.subjects.message}
                </FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
        </form>
    )
}