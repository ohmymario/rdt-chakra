import { Icon, Image, Link, Text } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';

interface CommunityLinkProps {
  communityId: string;
  communityImageURL?: string;
  title: string;
  homepage?: boolean;
}

const CommunityLink = (props: CommunityLinkProps) => {
  const { communityId, communityImageURL, title, homepage } = props;

  // stop link from propagating to post
  // post will go to the single post page if this isnt used
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  if (!homepage) return null;

  return (
    <>
      {/* Check for community image */}
      {communityImageURL && <Image boxSize='18px' borderRadius='full' src={communityImageURL} alt={title} mr={2} />}
      {!communityImageURL && <Icon as={FaReddit} fontSize='18pt' mr={1} color='blue.500' aria-hidden='true' />}

      {/* Link to community */}
      <Link href={`/r/${communityId}`}>
        <Text
          fontWeight='600'
          _hover={{ textDecoration: 'underline' }}
          onClick={stopPropagation}
          aria-label={`Link to community ${communityId}`}
        >
          {`r/${communityId}`}
        </Text>
      </Link>

      {/* Dot Separator */}
      <Icon as={BsDot} fontSize={8} color='gray.500' aria-hidden='true' />
    </>
  );
};

export default CommunityLink;
