import TeacherList from '@/components/TeacherList';
import { DELETE_TEACHER_MUTATION } from '@/graphql/mutations/teacher.mutation';
import { FETCH_ALL_TEACHERS_QUERY } from '@/graphql/queries/teacher.query';
import apolloClient from '@/lib/apollo.client';
import { useMutation } from '@apollo/client';
import { Box, Button, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';


export type ITeacher = {
    id: number;
    name: string;
    subjects: string[];
};

interface TeacherDashboardProps {
    teachersData: ITeacher[]; // Replace 'any' with the type of your student data
}

export default function TeacherDashboard({ teachersData }: TeacherDashboardProps) {
    const router = useRouter();
    const [deleteTeacher, { data, loading, error }] = useMutation(DELETE_TEACHER_MUTATION);

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
            {/* Header Row With Title and a button */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                p={4}
                mb={4}
            >
                <Box>
                    <Heading>Teacher Dashboard</Heading>
                </Box>
                <Box>
                    <Button colorScheme="blue" onClick={() => router.push('/teacher/new')} >Add Teacher</Button>
                </Box>
            </Box>

            <TeacherList teachersData={teachersData} />

        </Box>
    );
}


// This function will run on the server
export const getServerSideProps: GetServerSideProps = async () => {
    const { data, loading, error } = await apolloClient.query({
        query: FETCH_ALL_TEACHERS_QUERY,
    })

    if (error) {
        console.error(`Error fetching students: ${error}`);
        return {
            props: {
                teachersData: []
            },
        };
    }


    return {
        props: {
            teachersData: data.teachers
        },
    };
}