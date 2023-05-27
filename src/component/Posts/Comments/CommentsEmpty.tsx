import { Flex, FlexProps, Text } from '@chakra-ui/react';

const CommentsEmpty = () => {
  const FlexWrapper: FlexProps = {
    direction: 'column',
    justify: 'center',
    align: 'center',
    borderTop: '1px solid',
    borderColor: 'gray.100',
    p: 20,
  };

  return (
    <Flex {...FlexWrapper}>
      <Text fontWeight={700} opacity={0.3}>
        No comments yet
      </Text>
    </Flex>
  );
};

export default CommentsEmpty;
