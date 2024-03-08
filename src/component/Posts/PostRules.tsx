import { Flex, Image, ListItem, OrderedList, Text, Box, Heading, ListItemProps, FlexProps } from '@chakra-ui/react';

const PostRules = () => {
  const rules = [
    'Remember the human',
    'Behave like you would in real life',
    'Look for the original source of content',
    'Search for duplicates before posting',
    "Read the community's rules",
  ];

  const listRulesStyle: FlexProps = {
    direction: 'column',
    bg: 'white',
    padding: '12px 17px',
    borderRadius: '4px',
    marginTop: '27px',
    marginBottom: '5px',
    border: '1px solid',
    borderColor: 'gray.200',
  };

  const listRuleStyle: ListItemProps = {
    listStylePos: 'inside',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    padding: '10px 5px 5px 0',
  };

  return (
    <Flex direction='column' minWidth='315px'>
      <Flex {...listRulesStyle}>
        {/* Header & Image */}
        <Flex align='center' gap='5px' borderBottom='1px solid' borderColor='gray.200' pb='5px'>
          <Image src='/images/redditRules.svg' alt='Reddit rules icon' height='36px' width='39px' />
          <Heading as='h5' size='s' fontWeight='500'>
            Posting to Reddit
          </Heading>
        </Flex>

        {/* Rules List */}
        <OrderedList m='0' fontSize='14px'>
          {rules.map((rule, i) => (
            <ListItem {...listRuleStyle} key={i}>
              {rule}
            </ListItem>
          ))}
        </OrderedList>
      </Flex>

      {/* Content Policy Reminder */}
      <Text fontSize='12px' color='gray.500' my='10px' lineHeight='16px' maxWidth='250px'>
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
