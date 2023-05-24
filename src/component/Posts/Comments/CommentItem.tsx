import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { FaReddit } from 'react-icons/fa';

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
  return (
    <Flex>
      <Box>
        <Icon as={FaReddit} />
      </Box>
      <HStack align='center' fontSize='10pt'>
        <Text>{creatorDisplayText}</Text>
        <Text>{timeFromNow}</Text>
      </HStack>
    </Flex>
  );
};

export default CommentItem;
