import { ModalHeader } from '@chakra-ui/react';

interface CreateCommunityModalHeaderProps {}

const CreateCommunityModalHeader = (props: CreateCommunityModalHeaderProps) => {
  return (
    <ModalHeader fontSize='md' fontWeight='500' p={0}>
      Create a community
    </ModalHeader>
  );
};

export default CreateCommunityModalHeader;
