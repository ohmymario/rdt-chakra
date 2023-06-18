import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { GiCheckedShield } from 'react-icons/gi';

interface PremiumProps {}

const Premium = (props: PremiumProps) => {
  return (
    <Flex
      direction='column'
      bg='white'
      borderRadius={4}
      cursor='pointer'
      p='12px'
      border='1px solid'
      borderColor='gray.300'
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color='brand.100' mt={2} />
        <Stack spacing={1} fontSize='9pt' pl={2}>
          <Text fontWeight={600}>Reddit Promise</Text>
          <Text>The best Reddit experience, with monthly Coins</Text>
        </Stack>
        <Button height='30px' bg='brand.100'>
          Try Now
        </Button>
      </Flex>
    </Flex>
  );
};

export default Premium;
