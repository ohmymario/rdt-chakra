import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
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

function timestampToDate(timestampData: { seconds: number; nanoseconds: number }): string {
  const timestamp = new Timestamp(timestampData.seconds, timestampData.nanoseconds);
  const date = timestamp.toDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}, ${day} ${year}`;
}

const CommentItem = (props: CommentItemProps) => {
  const { comment, onDeleteComment, loadingDelete, userId } = props;
  const { id, creatorId, creatorDisplayText, communityId, postId, postTitle, text, createdAt } = comment;
  return (
    <Flex>
      <Box>
        <Icon as={FaReddit} />
      </Box>
      <HStack align='center' fontSize='10pt'>
        <Text>{creatorDisplayText}</Text>
        <Text>{timestampToDate(createdAt)}</Text>
      </HStack>
    </Flex>
  );
};

export default CommentItem;
