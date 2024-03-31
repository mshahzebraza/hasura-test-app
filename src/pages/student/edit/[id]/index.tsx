import { dummyStudentData } from '@/mockData'
import StudentForm from '@/pages/student/new/studentform'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const EditStudent = () => {
    const router = useRouter()
    const student = dummyStudentData.find((student) => student.id === Number(router.query.id))
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
            <StudentForm prevData={student} />
        </Box>
    )
}

export default EditStudent