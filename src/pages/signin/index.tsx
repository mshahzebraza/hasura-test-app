// pages/auth/signin.tsx
import { signIn } from 'next-auth/react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            // Handle error
            console.log(result.error);
        } else {
            // Redirect to the dashboard or desired page after successful sign-in
            window.location.href = '/';
        }
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit">Sign In</Button>
        </VStack>
    );
}