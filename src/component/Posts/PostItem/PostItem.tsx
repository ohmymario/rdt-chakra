import { Post } from '@/atoms/postsAtoms';
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';

// Icons
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat, BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5';
import { SlPresent } from 'react-icons/sl';
import PostItemError from './PostItemError';
import PostItemHeader from './PostItemHeader';
import PostItemImage from './PostItemImage';
import PostItemVoting from './PostItemVoting';

interface PostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
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

  const { post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost, homePage } = props;
  const {
    title,
    body,
    createdAt,
    communityId,
    imageURL,
    voteStatus,
    numberOfComments,
    communityImageURL,
    creatorDisplayName,
  } = post;

  const singlePostPage = !onSelectPost;
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // only one delete request at a time
    if (loadingDelete) return;

    setLoadingDelete(true);
    event.stopPropagation();
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error('Failed to delete post');
      }

      if (singlePostPage) {
        router.push(`/r/${communityId}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to delete post');
      }
    }

    setLoadingDelete(false);
  };

  const containerStyles = {
    border: '1px solid',
    bg: 'white',
    borderColor: singlePostPage ? 'white' : 'gray.300',
    borderRadius: singlePostPage ? '4px 4px 0px 0px' : '4px',
    _hover: {
      borderColor: singlePostPage ? 'none' : 'gray.500',
    },
    cursor: singlePostPage ? 'unset' : 'pointer',
  };

  const actionStyles = {
    align: 'center',
    gap: 1.5,
    px: 1.5,
    py: 2,
    _hover: { bg: 'gray.200' },
  };

  return (
    <Flex {...containerStyles} onClick={() => onSelectPost && onSelectPost(post)}>
      {/* ERROR */}
      {error && <PostItemError error={error} />}
      {/* VOTING COLUMN */}
      <PostItemVoting
        post={post}
        userVoteValue={userVoteValue}
        onVote={onVote}
        communityId={communityId}
        singlePostPage={singlePostPage}
        voteStatus={voteStatus}
      />
      {/* POST TEXT */}
      <VStack align='flex-start' flexDir='column' flexGrow={1} m='8px 8px 2px 4px' spacing={2}>
        <PostItemHeader
          communityId={communityId}
          communityImageURL={communityImageURL}
          creatorDisplayName={creatorDisplayName}
          title={title}
          body={body}
          homePage={homePage}
          createdAt={createdAt}
          timestampToRelativeString={timestampToRelativeString}
        />

        {imageURL && (
          <PostItemImage
            imageURL={imageURL}
            title={title}
            loadingImage={loadingImage}
            setLoadingImage={setLoadingImage}
          />
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
          <Flex {...actionStyles} onClick={(e) => handleDelete(e)}>
            {userIsCreator && (
              <>
                {loadingDelete ? (
                  <Spinner size='sm' color='gray.500' />
                ) : (
                  <>
                    <Icon as={AiOutlineDelete} fontSize={20} cursor='pointer' />
                    <Text>Delete</Text>
                  </>
                )}
              </>
            )}
          </Flex>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default PostItem;
