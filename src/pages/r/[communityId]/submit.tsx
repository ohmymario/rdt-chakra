// Libs
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

// Components
import About from '@/component/Community/About/About';
import PageContent from '@/component/Layout/PageContent';
import NewPostForm from '@/component/Posts/NewPostForm';
import PostFormDraftCounter from '@/component/Posts/PostForm/PostFormTitle/PostFormDraftCounter';

// Firebase
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

// Hooks
import useCommunityData from '@/hooks/useCommunityData';

const SubmitPostPage: FunctionComponent = (props) => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  return (
    <PageContent>
      <VStack w='100%'>
        <HStack
          borderBottom='1px solid white'
          w='100%'
          p='14px 0'
          mb='8px'
          justifyContent={'space-between'}
          paddingRight='20px'
        >
          <Text fontWeight={'600'}>Create a post</Text>

          {/* DRAFTS COUNTER */}
          <PostFormDraftCounter />
        </HStack>
        {user && <NewPostForm communityImageURL={communityStateValue.currentCommunity?.imageURL} />}
      </VStack>

      {/* todo: change to rules */}
      <>{communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}</>
    </PageContent>
  );
};

export default SubmitPostPage;
