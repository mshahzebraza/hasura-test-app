import {
    Box,
    Button,
    Heading
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface ButtonProps {
    text: string;
    redirectPath: string;
}
interface ListPageHeaderProps {
    title: string;
    button: ButtonProps;
}
export const ListPageHeader: React.FC<ListPageHeaderProps> = ({ title, button }) => {
    const router = useRouter();

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            p={4}
            mb={4}
        >
            <Box>
                <Heading>{title}</Heading>
            </Box>
            <Box>
                <Button colorScheme="blue" onClick={() => router.push(button.redirectPath)}>
                    {button.text}
                </Button>
            </Box>
        </Box>
    );
};
