import { Flex, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface HeaderTextProps {
  name: string;
}

const HeaderText = (props: HeaderTextProps) => {
  const { name } = props;

  return (
    <Flex direction='column' mr={6}>
      <Text fontWeight={800} fontSize='16pt'>
        {name}
      </Text>
      <Text fontWeight={600} fontSize='10pt' color='gray.400'>
        r/{name}
      </Text>
    </Flex>
  );
};

export default HeaderText;
