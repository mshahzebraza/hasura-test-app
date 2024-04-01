import { ITeacher } from '@/pages/teacher';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Menu, MenuButton, Button, MenuList, MenuItem, Box } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react'

interface ITeacherList {
    teachersData: ITeacher[]; // Replace 'any' with the type of your teacher data
}

const TeacherList = (props: ITeacherList) => {
    const { teachersData } = props;
    return (
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
                                                // TODO: use mutation here
                                                teachersData.splice(
                                                    teachersData.findIndex((t) => t.id === teacher.id),
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

export default TeacherList