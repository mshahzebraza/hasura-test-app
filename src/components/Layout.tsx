import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
            {/* You can add a header or sidebar here */}
            {children}
        </Box>
    );
}
