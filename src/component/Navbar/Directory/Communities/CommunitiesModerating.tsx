import { CommunitySnippet } from '@/atoms/communitiesAtom';
import { Box, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import MenuListItem from './MenuListItem';

interface CommunitiesModeratingProps {
  modCommunities: CommunitySnippet[];
}

const communityHeaderStyles = {
  paddingLeft: 3,
  marginBottom: 1,
  fontSize: '7pt',
  fontWeight: 500,
  color: 'gray.500',
};

const CommunitiesModerating = (props: CommunitiesModeratingProps) => {
  const { modCommunities } = props;

  return (
    <Box mt={3} mb={4}>
      <Text {...communityHeaderStyles}>Moderating</Text>

      {modCommunities.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          icon={FaReddit}
          iconColor='brand.100'
          ImageURL={snippet.imageURL}
        />
      ))}
    </Box>
  );
};

export default CommunitiesModerating;
