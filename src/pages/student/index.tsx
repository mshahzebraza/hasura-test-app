import Layout from '@/components/Layout';
import StudentList from '@/components/StudentList';
import { FETCH_ALL_STUDENTS } from '@/graphql/queries/student.query';
import apolloClient from '@/lib/apollo.client';
import { applicationPaths } from '@/lib/paths.constants';
import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ListPageHeader } from '../../components/ListPageHeader';

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
        <Layout >
            <ListPageHeader
                title="Student Dashboard"
                button={{ text: 'Add Student', redirectPath: applicationPaths.newStudent }}
            />
            <StudentList
                studentsData={studentsData}
                onDelete={(id: number) => { console.log(`Delete student with id: ${id}`) }}
                onEdit={(id: number) => { console.log(`Edit student with id: ${id}`) }}
            />
        </Layout>
    );
}


// This function will run on the server
export const getServerSideProps: GetServerSideProps = async (context: any) => {

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