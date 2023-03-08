import CreateCommunityModal from '@/component/Modal/CreateCommunity/CreateCommunityModal';
import { Flex, HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { GrAdd } from 'react-icons/gr';

interface CommunitiesProps {}

const Communities: FunctionComponent<CommunitiesProps> = (
  props: CommunitiesProps
) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
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
    </>
  );
};

export default Communities;
