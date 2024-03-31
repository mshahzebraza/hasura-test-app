import StudentForm from '@/pages/student/new/studentform'
import { Box } from '@chakra-ui/react'
import React from 'react'

const CreateStudent = () => {
    return (
        <Box
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            alignItems="center"
            h="100vh"
            maxW={'50rem'}
            margin={'0 auto'}
        >
            <StudentForm />
        </Box>
    )
}

export default CreateStudent