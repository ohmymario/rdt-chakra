import { Box, Flex, HStack, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { FaReddit } from 'react-icons/fa';
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from 'react-icons/io5';

interface CommentItemProps {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
}

export interface Comment {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
}

const CommentItem = (props: CommentItemProps) => {
  const { comment, onDeleteComment, loadingDelete, userId } = props;
  const { id, creatorId, creatorDisplayText, communityId, postId, postTitle, text, createdAt } = comment;

  const timeFromNow = moment(new Date(createdAt.seconds * 1000)).fromNow();

  const handleDeleteComment = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault();
    onDeleteComment(comment);
  };

  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color='gray.300' />
      </Box>
      <Stack spacing={1}>
        <HStack align='center' fontSize='8pt'>
          <Text fontWeight={700}>{creatorDisplayText}</Text>
          <Text color='gray.600'>{timeFromNow}</Text>
          {loadingDelete && <Spinner />}
        </HStack>

        <Text fontSize='10pt'>{text}</Text>
        <HStack align='center' cursor='pointer' color='gray.500'>
          <Icon as={IoArrowUpCircleOutline} fontSize={12} />
          <Icon as={IoArrowDownCircleOutline} fontSize={12} />

          {userId === creatorId && (
            <>
              <Text fontSize='9pt' _hover={{ color: 'blue.500' }}>
                Edit
              </Text>
              <Text fontSize='9pt' _hover={{ color: 'blue.500' }} onClick={(e) => handleDeleteComment(e)}>
                Delete
              </Text>
            </>
          )}
        </HStack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;
