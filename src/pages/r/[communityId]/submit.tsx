import PageContent from '@/component/Layout/PageContent';
import NewPostForm from '@/component/Posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import { Box, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const SubmitPostPage: FunctionComponent = (props) => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <VStack w='100%'>
        <Box borderBottom='1px solid white' w='100%' p='14px 0' mb='8px'>
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </VStack>

      <>About Community</>
    </PageContent>
  );
};

export default SubmitPostPage;
