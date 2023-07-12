import { communitiesState } from '@/atoms/communitiesAtom';
import CreateCommunityModal from '@/component/Modal/CreateCommunity/CreateCommunityModal';
import useCreateCommunityModalState from '@/hooks/useCreateCommunityModalState';
import { Box, HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';
import CommunitiesListItem from './CommunitiesListItem';
import CommunitiesModerating from './CommunitiesModerating';

interface CommunitiesProps {}

const Communities: FunctionComponent<CommunitiesProps> = (props: CommunitiesProps) => {
  const communityStateValue = useRecoilValue(communitiesState);
  const { mySnippets } = communityStateValue;

  // use the hook
  const { modalState, openModal, closeModal } = useCreateCommunityModalState();

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
      <CreateCommunityModal open={modalState.isModalOpen} handleClose={closeModal} />
      {modCommunities.length > 0 && <CommunitiesModerating modCommunities={modCommunities} />}
      <Box mt={3} mb={4}>
        <Text {...communityHeaderStyles}>My Communities</Text>
        <MenuItem
          width='100%'
          fontSize='10pt'
          _hover={{
            bg: 'gray.100',
          }}
          onClick={openModal}
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
