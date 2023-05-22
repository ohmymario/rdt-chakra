import AuthButtons from '@/component/Navbar/RightContent/AuthButtons';
import { Button, Flex, FlexProps, Text, Textarea } from '@chakra-ui/react';
import { User } from 'firebase/auth';

interface CommentInputProps {
  commentText: string;
  setCommentText: (commentText: string) => void;
  user: User;
  createLoading: boolean;
  onCreateComment: (commentText: string) => void;
}

const CommentInput = (props: CommentInputProps) => {
  const { commentText, setCommentText, user, createLoading, onCreateComment } = props;

  const userDisplayName = user?.email?.split('@')[0];
  const hasCommentText = Boolean(commentText.length);

  const handleCommentSubmit = () => {
    console.log('create comment');
    onCreateComment(commentText);
  };

  const commentInputStyles = {
    fontSize: '10pt',
    borderRadius: '4px',
    minHeight: '160px',
    pb: 10,
    _placeholder: { color: 'gray.500' },
    _focus: { outline: 'none', bg: 'white', border: '1px solid black' },
  };

  const commentButtonContainerStyles: FlexProps = {
    position: 'absolute',
    left: '1px',
    right: 0.1,
    bottom: '1px',
    justify: 'flex-end',
    bg: 'gray.100',
    p: '6px 8px',
    borderRadius: '0px 0px 4px 4px',
  };

  const promptLoginStyles: FlexProps = {
    align: 'center',
    justify: 'space-between',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'gray.100',
    p: 4,
  };

  return (
    <Flex direction='column' position='relative'>
      {user ? (
        <>
          <Text mb={1}>
            Comment as <span style={{ color: '#3182CE' }}>{userDisplayName}</span>
          </Text>
          <Textarea
            {...commentInputStyles}
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder='What are your thoughts?'
          />
          <Flex {...commentButtonContainerStyles}>
            <Button height='26px' isDisabled={!hasCommentText} isLoading={createLoading} onClick={handleCommentSubmit}>
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex {...promptLoginStyles}>
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};

export default CommentInput;
