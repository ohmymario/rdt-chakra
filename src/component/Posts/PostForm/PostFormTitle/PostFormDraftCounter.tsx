import { Flex, Text, TextProps } from '@chakra-ui/react';

interface PostFormDraftCounterProps {}

const PostFormDraftCounter = (props: PostFormDraftCounterProps) => {
  const {} = props;

  const draftStyles: TextProps = {
    textTransform: 'uppercase',
    fontWeight: '700',
    lineHeight: '22px',
    letterSpacing: '0.5px',

    color: 'blue.500',
    marginLeft: '10px',
    borderRadius: '2px',
    px: '4px',
  };

  const counterStyles: TextProps = {
    alignSelf: 'center',
    fontWeight: '400',
    borderRadius: '2px',
    color: 'white',
    padding: '0px 3px',
    bg: 'gray.500',
  };

  return (
    <Flex
      borderRadius={'14px'}
      padding='5px 13px 5px 0px'
      fontSize={'11px'}
      _hover={{
        backgroundColor: 'gray.300',
        cursor: 'pointer',
      }}
    >
      <Text {...draftStyles}>drafts</Text>
      <Text {...counterStyles}>0</Text>
    </Flex>
  );
};

export default PostFormDraftCounter;
