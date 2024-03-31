import apolloClient from '@/lib/apolloClient';
import { dummyTeacherData } from '@/mockData';
import { gql } from '@apollo/client';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';


type ITeacher = {
    id: number;
    name: string;
    subjects: string[];
};

interface TeacherDashboardProps {
    teachersData: ITeacher[]; // Replace 'any' with the type of your student data
}

export default function TeacherDashboard({ teachersData }: TeacherDashboardProps) {
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
                    <Heading>Teacher Dashboard</Heading>
                </Box>
                <Box>
                    <Button colorScheme="blue" onClick={() => router.push('/teacher/new')} >Add Teacher</Button>
                </Box>
            </Box>

            <TableContainer w={'100%'}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Subject</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Map over the teacherData array and create a new table row for each teacher */}
                        {teachersData.map((teacher) => (
                            <Tr key={teacher.id}>
                                <Td>{teacher.name}</Td>
                                <Td>{teacher.subjects.join(', ')}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={() => router.push(`/teacher/edit/${teacher.id}`)}>Edit</MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    /* Add delete logic here */
                                                    dummyTeacherData.splice(
                                                        dummyTeacherData.findIndex((t) => t.id === teacher.id),
                                                        1
                                                    );
                                                }}
                                            >Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const FETCH_ALL_TEACHERS = gql`
    query fetchAllTeachers {
        teachers {
            id
            name
            subjects
        }
    }
`;

// This function will run on the server
export const getServerSideProps: GetServerSideProps = async () => {
    const { data, loading, error } = await apolloClient.query({
        query: FETCH_ALL_TEACHERS,
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