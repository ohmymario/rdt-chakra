import { FunctionComponent } from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { Box, VStack, Divider, Center, Flex, Text, Icon, HStack, Stack } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { Timestamp } from 'firebase/firestore';

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

      {/* BODY */}
      <Flex direction='column' p={3} bg='white' borderRadius='0 0 4px 4px'>
        <Stack>
          <Flex width='100%' p={2} fontSize='10pt'>
            <Flex direction='column' flexGrow={1}>
              <Text>{numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction='column' flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
      <Divider />
          <Flex width='100%' p={2} fontSize='10pt'>
            <Flex gap={1}>
              <Text>Created</Text>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
      </Box>
    </VStack>
  );
};

export default About;
