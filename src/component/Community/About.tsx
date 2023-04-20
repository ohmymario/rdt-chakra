import { Community } from '@/atoms/communitiesAtom';
import { Box, VStack, Divider } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface AboutProps {
  communityData: Community;
}

const About: FunctionComponent<AboutProps> = (props) => {
  const { communityData } = props;
  const { createdAt, creatorId, name, nsfw, numberOfMembers, type, imageURL, id } = communityData;

  return (
    <VStack>
      <Box>About Community ...</Box>
      <Box>
        <Box>230140234 memebrs</Box>
        <Box>1231 online</Box>
      </Box>
      <Divider />
      <Box>
        <Box>DATE OF CREATION</Box>
        <Box>BUTTON</Box>
      </Box>
    </VStack>
  );
};

export default About;
