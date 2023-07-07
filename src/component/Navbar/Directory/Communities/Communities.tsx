import { communitiesState } from '@/atoms/communitiesAtom';
import CreateCommunityModal from '@/component/Modal/CreateCommunity/CreateCommunityModal';
import { Box, HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';
import CommunitiesListItem from './CommunitiesListItem';
import CommunitiesModerating from './CommunitiesModerating';
import MenuListItem from './MenuListItem';

interface CommunitiesProps {}

const Communities: FunctionComponent<CommunitiesProps> = (props: CommunitiesProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const communityStateValue = useRecoilValue(communitiesState);
  const { mySnippets } = communityStateValue;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const communityHeaderStyles = {
    paddingLeft: 3,
    marginBottom: 1,
    fontSize: '7pt',
    fontWeight: 500,
    color: 'gray.500',
  };

  const modCommunities = mySnippets.filter((community) => community.isModerator);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />

      {modCommunities.length > 0 && <CommunitiesModerating modCommunities={modCommunities} />}

      <Box mt={3} mb={4}>
        <Text {...communityHeaderStyles}>My Communities</Text>
        <MenuItem
          width='100%'
          fontSize='10pt'
          _hover={{
            bg: 'gray.100',
          }}
          onClick={() => handleOpen()}
        >
          <HStack spacing={2}>
            <Icon as={GrAdd} fontSize={20} />
            <Text>Create Community</Text>
          </HStack>
        </MenuItem>

        {mySnippets.map(({ communityId, imageURL }) => (
          <CommunitiesListItem key={communityId} communityId={communityId} ImageURL={imageURL} />
        ))}
      </Box>
    </>
  );
};

export default Communities;
