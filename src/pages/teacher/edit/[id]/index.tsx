import { FETCH_ALL_TEACHERS_QUERY } from '@/graphql/queries/teacher.query'
import TeacherForm from '@/pages/teacher/new/teacherform'
import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const EditTeacher = () => {
    const router = useRouter()
    const { data, loading, error } = useQuery(FETCH_ALL_TEACHERS_QUERY)

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }

    const teacher = data.teachers.find((teacher: any) => {
        return teacher.id === router.query.id
    })

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