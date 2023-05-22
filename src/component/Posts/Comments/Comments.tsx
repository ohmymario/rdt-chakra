import { Post } from '@/atoms/postsAtoms';
import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import CommentInput from './CommentInput';

interface CommentsProps {
  user: User;
  selectedPost: Post;
  communityId: string;
}

const Comments = (props: CommentsProps) => {
  const { user, selectedPost, communityId } = props;

  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const onCreateComment = async () => {
    console.log('create comment');
  };

  const onDeleteComment = async () => {
    console.log('delete comment');
  };

  const getPostComments = async () => {
    console.log('get post comments');
  };

  useEffect(() => {
    getPostComments();
  }, []);

  const FlexWrapperStyles: FlexProps = {
    direction: 'column',
    pl: 10,
    pr: 4,
    mb: 6,
    fontSize: '10pt',
    width: '100%',
  };

  return (
    <Box bg='white' borderRadius='0px 0px 4px 4px' p={2}>
      <Flex {...FlexWrapperStyles}>
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
};

export default Comments;
