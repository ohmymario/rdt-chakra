import { Flex, Icon, Text } from '@chakra-ui/react';
import { Post } from '@/atoms/postsAtoms';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
} from 'react-icons/io5';

interface PostItemVotingProps {
  post: Post;
  userVoteValue?: number | undefined;
  onVote: (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => void;
  communityId: string;
  singlePostPage?: boolean;
  voteStatus?: number;
}

const PostItemVoting = (props: PostItemVotingProps) => {
  const { post, userVoteValue, onVote, communityId, singlePostPage, voteStatus } = props;

  const votingStyles = {
    alignItems: 'center',
    justifyContent: 'flex-start',
    w: '40px',
    p: 2,
    bg: singlePostPage ? 'none' : 'gray.100',
    borderRadius: singlePostPage ? '0' : '3px 0px 0px 3px',
  };

  return (
    <Flex {...votingStyles} direction='column'>
      <Icon
        as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
        color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
        fontSize={22}
        onClick={(event) => onVote(event, post, 1, communityId)}
        cursor='pointer'
      />
      <Text>{voteStatus}</Text>
      <Icon
        as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
        color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
        fontSize={22}
        onClick={(event) => onVote(event, post, -1, communityId)}
        cursor='pointer'
      />
    </Flex>
  );
};

export default PostItemVoting;
