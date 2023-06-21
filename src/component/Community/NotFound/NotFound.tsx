import { FunctionComponent } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import Link from 'next/link';

import { NOT_FOUND_TEXT_1, NOT_FOUND_TEXT_2, FOOTER_TEXT } from './constants';

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  return (
    <Flex direction='column' justify='center' align='center' minHeight='60vh'>
      <Box mb={6} bg='gray.400' borderRadius='50px' h='100px' w='100px'></Box>
      <Text fontSize='xl' mb={2}>
        {NOT_FOUND_TEXT_1}
      </Text>
      <Text fontSize='sm'>{NOT_FOUND_TEXT_2}</Text>
      <Link href='/'>
        <Button my={6} textTransform='uppercase' height='32px'>
          Go Home
        </Button>
      </Link>

      <Text maxW={470} fontSize='xs' textAlign='center' color='gray.600'>
        {FOOTER_TEXT}
      </Text>
    </Flex>
  );
};

export default NotFound;
