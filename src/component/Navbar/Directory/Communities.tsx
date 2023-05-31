import { communitiesState } from '@/atoms/communitiesAtom';
import CreateCommunityModal from '@/component/Modal/CreateCommunity/CreateCommunityModal';
import { Box, HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { FaReddit } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';
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

  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
          My Communities
        </Text>
      </Box>
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

      {mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          icon={FaReddit}
          iconColor='blue.500'
          ImageURL={snippet.imageURL}
        />
      ))}
    </>
  );
};

export default Communities;
