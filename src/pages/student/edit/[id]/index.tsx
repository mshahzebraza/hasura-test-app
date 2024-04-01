import EditStudentForm from '@/pages/student/edit/[id]/EditStudentForm'
import StudentForm from '@/pages/student/new/CreateStudentForm'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const EditStudent = () => {
    const router = useRouter()
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
            <EditStudentForm editId={Number(router.query.id)} />
        </Box>
    )
}

export default EditStudent