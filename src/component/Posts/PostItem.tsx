import { FunctionComponent } from 'react';
import { Post } from '@/atoms/postsAtoms';
import { Box, Flex, Grid, Heading, HStack, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

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

  // ChatGPT method to convert firebase timestamp to relative string
  function timestampToRelativeString(timestamp: Timestamp) {
    const now = new Date();
    const timeDifference = now.getTime() - timestamp.toDate().getTime();

    const secondsInMs = 1000;
    const minutesInMs = secondsInMs * 60;
    const hoursInMs = minutesInMs * 60;
    const daysInMs = hoursInMs * 24;
    const weeksInMs = daysInMs * 7;
    const monthsInMs = daysInMs * 30.44; // Using the average number of days in a month (365.25 / 12)

  if (timeDifference < hoursInMs) {
    const minutes = Math.round(timeDifference / minutesInMs);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (timeDifference < daysInMs) {
      const hours = Math.round(timeDifference / hoursInMs);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (timeDifference < weeksInMs) {
      const days = Math.round(timeDifference / daysInMs);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (timeDifference < monthsInMs) {
      const weeks = Math.round(timeDifference / weeksInMs);
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else {
      const months = Math.round(timeDifference / monthsInMs);
      return `${months} month${months === 1 ? '' : 's'} ago`;
    }
  }

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
      <Flex flexDir='column' alignItems='center' justifyContent='flex-start' w={'40px'} p={2} bg='gray.300'>
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
      <Flex flexDir='column' flexGrow={1} m='8px'>
        {/* TEXT */}
        <VStack spacing={1} align='flex-start'>
          <HStack spacing={1} fontSize={'xs'}>
            {/* {communityImageURL && (
            <Link href={`/communities/${communityId}`}>
              <Image boxSize='20px' objectFit='cover' src={communityImageURL} alt={title} cursor='pointer' />
            </Link>
          )} */}
            <Text>Posted by u/{creatorDisplayName}</Text>
            <Text>{timestampToRelativeString(createdAt as Timestamp)}</Text>
          </HStack>
          <Heading as={'h3'} fontSize='lg' fontWeight={'normal'}>
            {title}
          </Heading>
          <Text noOfLines={[4]} maxH='376px' fontSize={'s'}>
            {body}
          </Text>
        </VStack>

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
