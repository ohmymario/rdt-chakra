import { FunctionComponent } from 'react';
import { Post } from '@/atoms/postsAtoms';
import { Box, Flex, Grid, Heading, HStack, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';

// Icons
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat, BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { SlPresent } from 'react-icons/sl';
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

const PostItem: FunctionComponent<PostItemProps> = (props) => {
  // TODO: FIND A WAY TO DO THIS WITHOUT USING useRouter SEVERAL TIMES
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname === '/r/[communityId]');

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

  const containerStyles = {
    border: '1px solid',
    bg: 'white',
    borderColor: 'gray.300',
    borderRadius: 4,
    _hover: {
      borderColor: 'gray.500',
    },
    cursor: 'pointer',
  };

  const actionStyles = {
    align: 'center',
    gap: 1.5,
    px: 1.5,
    py: 2,
    _hover: { bg: 'gray.200' },
  };

  return (
    <Flex {...containerStyles} onClick={onSelectPost}>
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
      <VStack align={'flex-start'} flexDir='column' flexGrow={1} m='8px 8px 2px 4px' spacing={2}>
        {/* TEXT */}
        <VStack align='flex-start' border={'1px solid red'} spacing={2} ml='4px'>
          <HStack fontSize={'xs'} spacing={1}>
            {pathname != '/r/[communityId]' && (
              <Link href={`/r/${communityId}`}>
                <Image boxSize='20px' objectFit='cover' src={communityImageURL} alt={title} cursor='pointer' />
              </Link>
            )}
            <Text>Posted by u/{creatorDisplayName}</Text>
            <Text>{timestampToRelativeString(createdAt)}</Text>
          </HStack>
          <Heading fontSize='lg' as={'h3'} fontWeight={'600'}>
            {title}
          </Heading>
          <Text fontSize={'s'} noOfLines={[4]} maxH='376px'>
            {body}
          </Text>
        </VStack>

        {/* POST IMAGE */}
        {imageURL && (
          <Grid justifyContent='center' alignItems='center' w={'100%'} pl='4px'>
            <Image boxSize='512px' objectFit='cover' src={imageURL} alt={`image of ${title}`} />
          </Grid>
        )}

        {/* POST ACTIONS */}
        <HStack fontSize='xs' spacing={1} fontWeight={600} color='gray.500'>
          <Flex {...actionStyles}>
            <Icon as={BsChat} fontSize={20} />
            <Text>{numberOfComments} Comments</Text>
          </Flex>
          <Flex {...actionStyles}>
            <Icon as={SlPresent} fontSize={20} />
            <Text>Award</Text>
          </Flex>
          <Flex {...actionStyles}>
            <Icon as={IoArrowRedoOutline} fontSize={20} />
            <Text>Share</Text>
          </Flex>
          <Flex {...actionStyles}>
            <Icon as={IoBookmarkOutline} fontSize={20} />
            <Text>Save</Text>
          </Flex>
          <Flex {...actionStyles} onClick={onDeletePost}>
            {userIsCreator && (
              <>
                <Icon as={AiOutlineDelete} fontSize={20} cursor='pointer' />
                <Text>Delete</Text>
              </>
            )}
          </Flex>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default PostItem;