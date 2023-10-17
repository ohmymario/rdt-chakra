import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface NavbarErrorProps {
  error: Error;
}

const onClose = () => {
  // close the modal
};

const NavbarError = (props: NavbarErrorProps) => {
  const { error } = props;

  if (!error) return null;
  // might need to use a effect to check if that error is still there
  // if it is then show the modal
  // if not then close the modal

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{error.message}</ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Refresh</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NavbarError;
