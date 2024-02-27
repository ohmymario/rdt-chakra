import { Flex, Text } from '@chakra-ui/react';

interface PostFormDraftCounterProps {}

const PostFormDraftCounter = (props: PostFormDraftCounterProps) => {
  const {} = props;

  const draftStyles = {
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '700',
    color: 'blue.500',
    lineHeight: '22px',
    letterSpacing: '0.5px',
    marginLeft: '10px',
    borderRadius: '2px',
    px: '4px',
  };

  return (
    <Flex border='1px solid ' borderRadius={'14px'} padding='3px 10px 3px 0px'>
      <Text
        textTransform='uppercase'
        fontSize='12px'
        fontWeight='700'
        color='blue.500'
        lineHeight='22px'
        letterSpacing='0.5px'
        marginLeft='10px'
        borderRadius='2px'
        px={'4px'}
      >
        drafts
      </Text>
      <Text
        fontSize='12px'
        alignSelf='center'
        fontWeight='400'
        marginLeft='1px'
        lineHeight='20px'
        borderRadius='2px'
        padding='0px 3px'
        bg='gray.500'
        color='white'
      >
        0
      </Text>
    </Flex>
  );
};

export default PostFormDraftCounter;
