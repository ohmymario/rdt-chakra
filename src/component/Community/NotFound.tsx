import { FunctionComponent } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import Link from 'next/link';

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  return (
    <Flex direction='column' justify='center' align='center' minHeight='60vh'>
      <Box mb={6} bg='gray.400' borderRadius='50px' h='100px' w='100px'></Box>
      <Text fontSize='xl' mb={2}>
        Sorry, there aren&#39;t any communities on Reddit with that name.
      </Text>
      <Text fontSize='sm'>
        This community may have been banned or the community name is incorrect.
      </Text>
      <Link href='/'>
        <Button my={6} textTransform='uppercase' height='32px'>
          Go Home
        </Button>
      </Link>

      <Text maxW={470} fontSize='xs' textAlign='center' color='gray.600'>
        Use of this site constitutes acceptance of our User Agreement and
        Privacy Policy. ©2023 reddit inc. All rights reserved. REDDIT and the
        ALIEN Logo are registered trademarks of reddit inc.
      </Text>
    </Flex>
  );
};

export default NotFound;
