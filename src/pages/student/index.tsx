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

type IStudent = {
    id: number;
    name: string;
    grade: number;
};

interface StudentDashboardProps {
    studentsData: IStudent[]; // Replace 'any' with the type of your student data
}

// Refreshing is not happening
export default function StudentDashboard({ studentsData }: StudentDashboardProps) {

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

            <TableContainer w={'100%'}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Grade</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Map over the studentData array and create a new table row for each student */}
                        {studentsData.map((student) => (
                            <Tr key={student.id}>
                                <Td>{student.name}</Td>
                                <Td>{student.grade}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={() => router.push(`/student/edit/${student.id}`)}>Edit</MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    dummyStudentData.splice(
                                                        dummyStudentData.findIndex((s) => s.id === student.id),
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


// This function will run on the server
export const getServerSideProps: GetServerSideProps = async () => {

    const data = await fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
        headers: {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            query: `query fetchAllStudents {
                students {
                  id
                  name
                  grade
                }
              }`,
        }),
    });
    const response = await data.json();

    // transform the response into the shape of the studentData
    const studentsData = response.data.students;


    // Fetch student data from an API
    // const studentData = dummyStudentData;

    // Pass the student
    return {
        props: {
            studentsData
        },
    };
}
