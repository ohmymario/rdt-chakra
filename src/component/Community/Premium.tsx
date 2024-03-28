import { Button, Flex, FlexProps, Icon, Stack, Text } from '@chakra-ui/react';
import { GiCheckedShield } from 'react-icons/gi';

interface PremiumProps {}

const flexWrapperStyles: FlexProps = {
  direction: 'column',
  bg: 'white',
  borderRadius: 4,
  cursor: 'pointer',
  p: '12px',
  border: '1px solid',
  borderColor: 'gray.300',
};

const Premium = (props: PremiumProps) => {
  return (
    <Flex {...flexWrapperStyles}>
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color='brand.100' mt={2} />
        <Stack spacing={1} fontSize='9pt' pl={2}>
          <Text fontWeight={600}>Reddit Promise</Text>
          <Text>The best Reddit experience</Text>
        </Stack>
      </Flex>
      <Button height='30px' bg='brand.100'>
        Try Now
      </Button>
    </Flex>
  );
};

export default Premium;
