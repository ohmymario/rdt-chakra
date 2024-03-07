import { Flex, Heading, Image, ListItem, OrderedList, Text } from '@chakra-ui/react';

interface PostRulesProps {}

const PostRules = (props: PostRulesProps) => {
  return (
    <Flex direction='column'>
      {/* 5 Rules */}
      <Flex direction='column' bg='white' padding='12px 17px' borderRadius='4px' marginTop='27px'>
        {/* Image goes here */}

        <Flex align='center' gap='5px' borderBottom='1px solid' borderColor='gray.200' pb='5px' border='1px solid'>
          <Image src='/images/redditRules.svg' alt='' height='36px' width='39px' />
          <Text>Posting to Reddit</Text>
        </Flex>

        <OrderedList m='0' fontSize='14px' border='1px solid'>
          <ListItem borderBottom='1px solid' borderColor='gray.200' padding='10px 5px 5px 0px' listStylePos='inside'>
            Remember the human
          </ListItem>
          <ListItem borderBottom='1px solid' borderColor='gray.200' padding='10px 5px 5px 0px' listStylePos='inside'>
            Behave like you would in real life
          </ListItem>
          <ListItem borderBottom='1px solid' borderColor='gray.200' padding='10px 5px 5px 0px' listStylePos='inside'>
            Look for the original source of content
          </ListItem>
          <ListItem borderBottom='1px solid' borderColor='gray.200' padding='10px 5px 5px 0px' listStylePos='inside'>
            Search for duplicates before posting
          </ListItem>
          <ListItem borderBottom='1px solid' borderColor='gray.200' padding='10px 5px 5px 0px' listStylePos='inside'>
            Read the community\u2019s rules
          </ListItem>
        </OrderedList>
      </Flex>

      {/* Content Policy */}
      <Text fontSize='12px' color='gray.500' marginY='10px' lineHeight='16px' maxWidth='250px'>
        Please be mindful of reddit&apos;s{' '}
        <Text as='span' color='blue.300' _hover={{ cursor: 'pointer' }}>
          content policy
        </Text>{' '}
        and practice good{' '}
        <Text as='span' color='blue.300' _hover={{ cursor: 'pointer' }}>
          reddiquette
        </Text>
        .
      </Text>
    </Flex>
  );
};

export default PostRules;
