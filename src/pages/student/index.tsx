import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
    Heading,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { dummyStudentData } from '@/mockData';
import StudentList from '@/components/StudentList';
import { gql, useQuery } from '@apollo/client';
import apolloClient from '@/lib/apolloClient';

export type IStudent = {
    id: number;
    name: string;
    grade: number;
};


interface StudentDashboardProps {
    studentsData: IStudent[]; // Replace 'any' with the type of your student data
}

// Refreshing is not happening
export default function StudentDashboard({ studentsData = [] }: StudentDashboardProps) {
    const router = useRouter();

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
                    <Heading>Student Dashboard</Heading>
                </Box>
                <Box>
                    <Button colorScheme="blue" onClick={() => router.push('/student/new')} >Add Student</Button>
                </Box>
            </Box>

            <StudentList studentsData={studentsData} />
        </Box>
    );
}


const FETCH_ALL_STUDENTS = gql`
    query fetchAllStudents {
        students {
            id
            name
            grade
        }
    }
`;

// This function will run on the server
export const getServerSideProps: GetServerSideProps = async () => {
    const { data, loading, error } = await apolloClient.query({
        query: FETCH_ALL_STUDENTS,
    })

    if (error) {
        console.error(`Error fetching students: ${error}`);
        return {
            props: {
                studentsData: []
            },
        };
    }

    // Pass the students
    return {
        props: {
            studentsData: data.students
        },
    };
}