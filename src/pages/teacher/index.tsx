import { dummyTeacherData } from '@/mockData';
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

// This function will run on the server
export const getServerSideProps: GetServerSideProps = async () => {

    const data = await fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
        headers: {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            query: `query fetchAllTeachers {
                teachers {
                  id
                  name
                  subjects
                }
              }`,
        }),
    });
    const response = await data.json();

    // transform the response into the shape of the studentData
    const teachersData = response.data.teachers;

    return {
        props: {
            teachersData
        },
    };
}