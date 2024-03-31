import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();


  return (
    <Box>
      <Text>Welcome to the Educational Platform</Text>
      {/* This Button is just a placeholder for your actual login or setup logic */}
      <Button
        colorScheme="blue"
        onClick={() => push('/signin')}
      >Login / Setup</Button>
    </Box>
  );
}