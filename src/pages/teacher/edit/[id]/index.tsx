import { dummyTeacherData } from '@/mockData'
import TeacherForm from '@/pages/teacher/new/teacherform'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const EditTeacher = () => {
    const router = useRouter()
    const teacher = dummyTeacherData.find((teacher) => teacher.id === Number(router.query.id))
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
            <TeacherForm prevData={teacher} />
        </Box>
    )
}

export default EditTeacher;