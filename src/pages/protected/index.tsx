
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'

const Protected = () => {
    console.log('Protected Page')
    return (
        <div>Protected: Should be Protected for unauth requests</div>
    )
}

// This function will run on the server
// TODO: What is this context? and where is it coming from?
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin?callbackUrl=/protected',
                permanent: false, // if true, browser will cache the redirect and redirect without checking the server
            },
        };
    }
    return {
        props: {
            session: {},
        },
    }
}

export default Protected;
