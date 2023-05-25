import { Flex, Text } from '@chakra-ui/react';

const CommentsEmpty = () => {
  return (
    <Flex direction='column' justify='center' align='center' borderTop='1px solid' borderColor='gray.100' p={20}>
      <Text fontWeight={700} opacity={0.3}>
        No comments yet
      </Text>
    </Flex>
  );
};

export default CommentsEmpty;
