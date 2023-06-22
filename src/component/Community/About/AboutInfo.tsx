import { timestampToDate } from '@/utils/timestampToDate';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { RiCakeLine } from 'react-icons/ri';
import { Timestamp } from 'firebase/firestore';

interface AboutInfoProps {
  createdAt: Timestamp;
}

const AboutInfo = (props: AboutInfoProps) => {
  const { createdAt } = props;
  return (
    <Flex width='100%' fontSize='10pt' gap={2} fontWeight='500' p={1}>
      <Icon color={'gray.600'} as={RiCakeLine} fontSize={18} />
      <Text color={'gray.400'}>Created {timestampToDate(createdAt)}</Text>
    </Flex>
  );
};

export default AboutInfo;
