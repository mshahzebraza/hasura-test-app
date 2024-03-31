import { dummyStudentData } from '@/mockData';
import { IStudent } from '@/pages/student';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Menu, MenuButton, Button, MenuList, MenuItem, Box } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react'



interface IStudentList {
    studentsData: IStudent[]; // Replace 'any' with the type of your student data
}

const StudentList = (props: IStudentList) => {
    const { studentsData } = props;
    return (
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
    )
}

export default StudentList