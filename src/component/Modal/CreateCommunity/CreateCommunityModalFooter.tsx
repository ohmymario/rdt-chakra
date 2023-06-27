import { Button, ModalFooter, ModalFooterProps } from '@chakra-ui/react';

interface CreateCommunityModalFooterProps {
  handleClose: () => void;
  submitCommunity: () => Promise<void>;
  loading: boolean;
}

const modalFooterStyles: ModalFooterProps = {
  bg: 'gray.100',
  borderRadius: 'lg',
  position: 'relative',
  left: '-16px',
  bottom: '-16px',
  width: '512px',
  height: '64px',
};

const CreateCommunityModalFooter = (props: CreateCommunityModalFooterProps) => {
  const { handleClose, submitCommunity, loading } = props;

  return (
    <ModalFooter {...modalFooterStyles}>
      <Button colorScheme='blue' variant={'outline'} height='32px' mr={3} onClick={handleClose}>
        Cancel
      </Button>
      <Button height='32px' onClick={submitCommunity} isLoading={loading}>
        Create Community
      </Button>
    </ModalFooter>
  );
};

export default CreateCommunityModalFooter;
