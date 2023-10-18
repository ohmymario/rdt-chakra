import { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface NavbarErrorProps {
  error: Error;
}

const NavbarError = (props: NavbarErrorProps) => {
  const { error } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      onOpen();
    }
  }, [error, onOpen]);

  const handleRefresh = () => {
    router.reload();
  };

  if (!error) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent justifyContent='center' alignItems='center' mt={44}>
        {/* CLOSE BUTTON */}
        <ModalCloseButton />

        {/* HEADER & MESSAGE */}
        <ModalHeader>Error</ModalHeader>
        <ModalBody pt={6} pb={6}>
          {error.message}
        </ModalBody>

        {/* BUTTONS */}
        <ModalFooter alignSelf='flex-end'>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='outline' onClick={handleRefresh}>
            Refresh
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NavbarError;
