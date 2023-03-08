import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface CreateCommunityModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateCommunityModal: FunctionComponent<CreateCommunityModalProps> = (
  props: CreateCommunityModalProps
) => {
  const { open, handleClose } = props;

  return (
    <>
      <Modal isOpen={open} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            MODAL BODY Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consectetur, quos.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant='ghost'>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
