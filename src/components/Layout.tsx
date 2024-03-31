import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Box>
            {/* You can add a header or sidebar here */}
            {children}
        </Box>
    );
}
