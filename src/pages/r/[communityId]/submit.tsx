import PageContent from '@/component/Layout/PageContent';
import NewPostForm from '@/component/Posts/NewPostForm';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

const SubmitPostPage: FunctionComponent = (props) => {
  return (
    <PageContent>
      <VStack w='100%'>
        <Box borderBottom='1px solid white' w='100%' p='14px 0' mb='8px'>
          <Text>Create a post</Text>
        </Box>
        <NewPostForm />
      </VStack>

      <>About Community</>
    </PageContent>
  );
};

export default SubmitPostPage;
