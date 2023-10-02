import { Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

// Icons
import { BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { Timestamp } from 'firebase/firestore';
import CommunityLink from './CommunityLink';

interface PostItemHeaderProps {
  communityId: string;
  communityImageURL?: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  homePage?: boolean;
  createdAt: Timestamp;
  timestampToRelativeString: (timestamp: Timestamp) => string;
}

const PostItemHeader = (props: PostItemHeaderProps) => {
  const {
    communityId,
    communityImageURL,
    creatorDisplayName,
    createdAt,
    title,
    body,
    homePage,
    timestampToRelativeString,
  } = props;

  return (
    <VStack align='flex-start' spacing={2} ml='4px'>
      {/* COMMUNITY & POSTER */}
      <HStack fontSize='xs' spacing={0.6} align='center'>
        {/* COMMUNITY LINK*/}
        <CommunityLink
          communityId={communityId}
          communityImageURL={communityImageURL}
          title={title}
          homepage={homePage}
        />

        <Text>
          Posted by u/{creatorDisplayName} {timestampToRelativeString(createdAt)}
        </Text>
      </HStack>

      {/* TITLE */}
      <Heading fontSize='lg' as='h3' fontWeight='600'>
        {title}
      </Heading>

      {/* BODY */}
      <Text fontSize='s' noOfLines={[4]} maxH='376px'>
        {body}
      </Text>
    </VStack>
  );
};

export default PostItemHeader;
