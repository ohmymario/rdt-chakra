import { Community } from '@/atoms/communitiesAtom';
import { auth } from '@/firebase/clientApp';
import { Box, Divider, Flex, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AboutAdminControls from './AboutAdminControls';
import AboutCreatePost from './AboutCreatePost';
import AboutHeader from './AboutHeader';
import AboutInfo from './AboutInfo';
import AboutStats from './AboutStats';
import AboutWelcome from './AboutWelcome';

interface AboutProps {
  communityData: Community;
}

const About = (props: AboutProps) => {
  const [user] = useAuthState(auth);

  // Props
  const { communityData } = props;
  const { createdAt, creatorId, name, numberOfMembers } = communityData;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box alignSelf='flex-start' width='100%'>
      <AboutHeader />

      <Flex direction='column' p={3} bg='white' borderRadius='0 0 4px 4px'>
        <Stack>
          <AboutWelcome name={name} />
          <AboutInfo createdAt={createdAt} />
          <Divider />
          <AboutStats numberOfMembers={numberOfMembers} />
          <Divider />
          <AboutCreatePost creatorId={creatorId} />

          {user?.uid === creatorId && <AboutAdminControls communityData={communityData} />}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
