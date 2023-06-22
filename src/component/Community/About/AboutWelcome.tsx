import { FunctionComponent } from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { RiCakeLine } from 'react-icons/ri';
import { timestampToDate } from '@/utils/timestampToDate';
import { Timestamp } from 'firebase/firestore';

interface AboutWelcomeProps {
  creatorId: string;
  createdAt: Timestamp;
}

const AboutWelcome = (props: AboutWelcomeProps) => {
  const { creatorId, createdAt } = props;
  return (
    <>
      <Text>
        Welcome to r/{creatorId}, the place for almost anything {creatorId} related.
      </Text>
      <Flex width='100%' fontSize='10pt' gap={2} fontWeight='500' p={1}>
        <Icon color={'gray.600'} as={RiCakeLine} fontSize={18} />
        <Text color={'gray.400'}>Created {timestampToDate(createdAt)}</Text>
      </Flex>
    </>
  );
};

export default AboutWelcome;
