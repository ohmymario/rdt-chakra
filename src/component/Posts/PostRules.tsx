import { Flex, Heading, Image, ListItem, OrderedList, Text } from '@chakra-ui/react';

interface PostRulesProps {}

const PostRules = (props: PostRulesProps) => {
  return (
    <Flex direction='column' bg='white' padding='12px' borderRadius='5px' marginTop='25px'>
      {/* Image goes here */}

      <Flex align='center' gap='5px' borderBottom='1px solid' borderColor='gray.200' pb='5px'>
        <Image src='/images/redditRules.svg' alt='' height='36px' width='39px' />
        <Text>Posting to Reddit</Text>
      </Flex>

      {/* grey separation line */}
      {/* <Flex direction='column'> */}
      <OrderedList m='0'>
        <ListItem
          borderBottom='1px solid'
          borderColor='gray.200'
          padding='10px 5px 5px 0px'
          listStylePos='inside'
          fontSize='14px'
        >
          Remember the human
        </ListItem>
        <ListItem
          borderBottom='1px solid'
          borderColor='gray.200'
          padding='10px 5px 5px 0px'
          listStylePos='inside'
          fontSize='14px'
        >
          Behave like you would in real life
        </ListItem>
        <ListItem
          borderBottom='1px solid'
          borderColor='gray.200'
          padding='10px 5px 5px 0px'
          listStylePos='inside'
          fontSize='14px'
        >
          Look for the original source of content
        </ListItem>
        <ListItem
          borderBottom='1px solid'
          borderColor='gray.200'
          padding='10px 5px 5px 0px'
          listStylePos='inside'
          fontSize='14px'
        >
          Search for duplicates before posting
        </ListItem>
        <ListItem
          borderBottom='1px solid'
          borderColor='gray.200'
          padding='10px 5px 5px 0px'
          listStylePos='inside'
          fontSize='14px'
        >
          Read the community\u2019s rules
        </ListItem>
      </OrderedList>
      {/* </Flex> */}
    </Flex>
  );
};

export default PostRules;
