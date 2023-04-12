import { FunctionComponent } from 'react';
import { Post } from '@/atoms/postsAtoms';
import { Box, Flex, Grid, Heading, Icon, Image, Text } from '@chakra-ui/react';

// Icons
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat, BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';
import Link from 'next/link';

interface PostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
}

const PostItem: FunctionComponent<PostItemProps> = (props) => {
  const { post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost } = props;
  const {
    id,
    title,
    body,
    createdAt,
    communityId,
    creatorId,
    imageURL,
    voteStatus,
    numberOfComments,
    communityImageURL,
    creatorDisplayName,
  } = post;

  return (
    <Flex
      border='1px solid'
      bg='white'
      borderColor='gray.300'
      borderRadius={4}
      _hover={{
        borderColor: 'gray.500',
      }}
      cursor='pointer'
      onClick={onSelectPost}
    >
      {/* VOTING COLUMN */}
      <Flex flexDir='column' alignItems='center' justifyContent='flex-start' w={'40px'} p={2} bg='gray.300' mr='8px'>
        <Icon
          as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          fontSize={22}
          onClick={onVote}
          cursor='pointer'
        />
        <Text>{voteStatus}</Text>
        <Icon
          as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
          fontSize={22}
          onClick={onVote}
          cursor='pointer'
        />
      </Flex>

      {/* POST DATA */}
      <Flex flexDir='column' justifyContent='center' flexGrow={1}>
        <Flex fontSize={'xs'}>
          <Text>Posted by {creatorDisplayName}</Text>
          <Text>TIME</Text>
        </Flex>
        <Heading as={'h3'} fontSize='lg' fontWeight={'normal'}>
          {title}
        </Heading>
        <Text noOfLines={[4]} maxH='376px' fontSize={'s'}>
          {body}
        </Text>

        {/* POST IMAGE */}
        {imageURL && (
          <Grid justifyContent='center' alignItems='center' w={'100%'}>
            <Image boxSize='512px' objectFit='cover' src={imageURL} alt={title} />
          </Grid>
        )}
      </Flex>
    </Flex>
  );
};

export default PostItem;
