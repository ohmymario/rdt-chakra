import { FunctionComponent } from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { Box, VStack, Divider, Center, Flex, Text, Icon, HStack, Stack } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';

interface AboutProps {
  communityData: Community;
}

const About: FunctionComponent<AboutProps> = (props) => {
  const { communityData } = props;
  const { createdAt, creatorId, name, nsfw, numberOfMembers, type, imageURL, id } = communityData;

  return (
    <Box alignSelf='flex-start' width='100%'>
      {/* HEADER */}
      <Flex justify='space-between' align='center' bg='blue.400' color='white' p={3} borderRadius='4px 4px 0 0'>
        <Text>About Community</Text>
        <Icon
          as={HiOutlineDotsHorizontal}
          _hover={{
            cursor: 'pointer',
          }}
        />
      </Flex>
      <Divider />
      <Box>
        <Box>DATE OF CREATION</Box>
        <Box>BUTTON</Box>
      </Box>
    </VStack>
  );
};

export default About;
