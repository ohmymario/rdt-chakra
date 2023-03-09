import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  Text,
  Input,
  Radio,
  VStack,
  Divider,
  Checkbox,
  Highlight,
  HStack,
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

  const handleCreateCommunity = () => {
    console.log('Create Community');
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='md' fontWeight='500'>
            Create a community
          </ModalHeader>
          <ModalCloseButton />

          <Divider />

          <ModalBody>
            <VStack spacing={6}>
              <VStack width={'100%'} align='flex-start'>
                <Box>
                  <Heading as='h4' size='sm' mb={2} fontWeight='500'>
                    Name
                  </Heading>
                  <Text>
                    Community names including capitalization cannot be changed.
                  </Text>
                </Box>
                <Input placeholder='r/' size='md' />
                <Text>21 characters remaining</Text>
              </VStack>

              <VStack width={'100%'} align='flex-start'>
                <Heading as='h4' size='sm' mb={2} fontWeight='500'>
                  Community Type
                </Heading>
                <Radio size='md' name='1'>
                  <HStack>
                    <Text display='inline'>Public</Text>
                    <Text fontSize='8pt' color='gray.500'>
                      Anyone can view, post, and comment to this community
                    </Text>
                  </HStack>
                </Radio>
                <Radio size='md' name='1'>
                  <HStack>
                    <Text>Restricted</Text>
                    <Text fontSize='8pt' color='gray.500'>
                      Anyone can view this community, but only approved users
                      can post
                    </Text>
                  </HStack>
                </Radio>
                <Radio size='md' name='1'>
                  <Text>Private</Text>
                  <Text fontSize='8pt' color='gray.500'>
                    Only approved users can view and submit to this community{' '}
                  </Text>
                </Radio>
              </VStack>

              <VStack width={'100%'} align='flex-start'>
                <Heading as='h4' size='sm' mb={2} fontWeight='500'>
                  Adult Content
                </Heading>
                <Checkbox size={'lg'}>
                  <Highlight
                    query='NSFW'
                    styles={{
                      px: '1',
                      py: '1',
                      bg: 'red.400',
                      color: 'white',
                      fontSize: '2xs',
                      fontWeight: 'bold',
                    }}
                  >
                    NSFW 18+ year old community
                  </Highlight>
                </Checkbox>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter bg='gray.100' borderRadius={'lg'}>
            <Button
              colorScheme='blue'
              variant={'outline'}
              height='32px'
              mr={3}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button height='32px' onClick={() => handleCreateCommunity()}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
