import { Flex, Text, Icon } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const AboutHeader = () => (
  <Flex justify='space-between' align='center' bg='blue.400' color='white' p={3} borderRadius='4px 4px 0 0'>
    <Text fontWeight={700} fontSize='10pt'>
      About Community
    </Text>
    <Icon
      as={HiOutlineDotsHorizontal}
      _hover={{
        cursor: 'pointer',
      }}
    />
  </Flex>
);

export default AboutHeader;
