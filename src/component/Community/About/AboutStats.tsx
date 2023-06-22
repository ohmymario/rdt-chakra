import { Flex, Text } from '@chakra-ui/react';

interface AboutStatsProps {
  numberOfMembers: number;
}

const AboutStats = (props: AboutStatsProps) => {
  const { numberOfMembers } = props;
  return (
    <Flex width='100%' p={2} fontSize='10pt' fontWeight={700}>
      <Flex direction='column' flexGrow={1}>
        <Text>{numberOfMembers.toLocaleString()}</Text>
        <Text>Members</Text>
      </Flex>
      <Flex direction='column' flexGrow={1}>
        <Text>1</Text>
        <Text>Online</Text>
      </Flex>
    </Flex>
  );
};

export default AboutStats;
