import About from '@/component/Community/About/About';
import PageContent from '@/component/Layout/PageContent';
import NewPostForm from '@/component/Posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';
import { Box, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const SubmitPostPage: FunctionComponent = (props) => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  return (
    <PageContent>
      <VStack w='100%'>
        <Box borderBottom='1px solid white' w='100%' p='14px 0' mb='8px'>
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} communityImageURL={communityStateValue.currentCommunity?.imageURL} />}
      </VStack>
      <>{communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}</>
    </PageContent>
  );
};

export default SubmitPostPage;
