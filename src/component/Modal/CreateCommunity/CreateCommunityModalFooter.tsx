import useCreateCommunityModalState from '@/hooks/useCreateCommunityModalState';
import { Button, ModalFooter, ModalFooterProps } from '@chakra-ui/react';

interface CreateCommunityModalFooterProps {
  submitCommunity: () => Promise<void>;
  closeModalandResetForm: () => void;
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
  const { submitCommunity, loading, closeModalandResetForm } = props;

  return (
    <ModalFooter {...modalFooterStyles}>
      <Button colorScheme='blue' variant={'outline'} height='32px' mr={3} onClick={closeModalandResetForm}>
        Cancel
      </Button>
      <Button height='32px' onClick={submitCommunity} isLoading={loading}>
        Create Community
      </Button>
    </ModalFooter>
  );
};

export default CreateCommunityModalFooter;
