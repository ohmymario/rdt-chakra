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
  RadioGroup,
  Icon,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

// profile icon import
import { FaUserCircle } from 'react-icons/fa';
// eye icon import
import { FaEye } from 'react-icons/fa';
// lock icon import
import { FaLock } from 'react-icons/fa';

interface CreateCommunityModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateCommunityModal: FunctionComponent<CreateCommunityModalProps> = (
  props: CreateCommunityModalProps
) => {
  const { open, handleClose } = props;

  type AccessLevel = 'public' | 'restricted' | 'private';

  const [communityName, setCommunityName] = useState<string>('');
  const [charsRemain, setCharsRemain] = useState<number>(21);
  const [communityType, setCommunityType] = useState<AccessLevel>('public');
  const [isAdult, setIsAdult] = useState<boolean>(false);

  console.log(communityName, charsRemain, communityType, isAdult);

  const handleCommunityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length > 21) return;
    setCharsRemain(21 - name.length);
    setCommunityName(name);
  };

  const handleCommunityType = (e: string) => {
    setCommunityType(e as AccessLevel);
  };

  const submitCommunity = () => {
    console.log(`🚀 ~ handleCreateCommunity ~ e:`, e);
    console.log('Create Community');
  };

  const subTextStyles = {
    fontSize: '8pt',
    color: 'gray.500',
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent maxW={'lg'} p={4}>
          <ModalHeader fontSize='md' fontWeight='500' p={0}>
            Create a community
          </ModalHeader>
          <ModalCloseButton />

          <Divider mt={3} mb={2} />

          <ModalBody px={0}>
            <VStack spacing={6}>
              {/* Community Name */}
              <VStack width={'100%'} align='flex-start' mb={3}>
                <Box>
                  <Heading as='h4' size='sm' mb={2} fontWeight='500'>
                    Name
                  </Heading>
                  <Text {...subTextStyles}>
                    Community names including capitalization cannot be changed.
                  </Text>
                </Box>
                <Text
                  position='relative'
                  top='37px'
                  left='10px'
                  width='20px'
                  color='gray.400'
                >
                  r/
                </Text>
                <Input
                  position='relative'
                  pl='20px'
                  size='sm'
                  borderRadius='md'
                  value={communityName}
                  onChange={(e) => handleCommunityName(e)}
                />
                <Text
                  {...subTextStyles}
                  color={!charsRemain ? 'red' : 'gray.500'}
                >
                  {charsRemain} characters remaining
                </Text>
              </VStack>

              {/* Community Type */}
              <VStack width={'100%'} align='flex-start'>
                <Heading as='h4' size='sm' mb={2} fontWeight='500'>
                  Community Type
                </Heading>
                <RadioGroup
                  onChange={(e) => handleCommunityType(e)}
                  value={communityType}
                >
                  <Radio size='md' mb={4} value='public'>
                    <HStack>
                      <Icon
                        as={FaUserCircle}
                        color='gray.500'
                        top='-1px'
                        position='relative'
                      />
                      <Text fontSize='10pt' fontWeight='600'>
                        Public
                      </Text>
                      <Text {...subTextStyles}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </HStack>
                  </Radio>
                  <Radio size='md' mb={4} value='restricted'>
                    <HStack>
                      <Icon
                        as={FaEye}
                        color='gray.500'
                        top='-1px'
                        position='relative'
                      />
                      <Text fontSize='10pt' fontWeight='600'>
                        Restricted
                      </Text>
                      <Text {...subTextStyles}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </HStack>
                  </Radio>
                  <Radio size='md' mb={4} value='private'>
                    <HStack>
                      <Icon
                        as={FaLock}
                        color='gray.500'
                        top='-1px'
                        position='relative'
                      />
                      <Text fontSize='10pt' fontWeight='600'>
                        Private
                      </Text>
                      <Text {...subTextStyles}>
                        Only approved users can view and submit to this
                        community{' '}
                      </Text>
                    </HStack>
                  </Radio>
                </RadioGroup>
              </VStack>

              {/* Adult Content */}
              <VStack width={'100%'} align='flex-start'>
                <Heading as='h4' size='sm' fontWeight='500'>
                  Adult Content
                </Heading>
                <Checkbox
                  isChecked={isAdult}
                  onChange={() => setIsAdult(!isAdult)}
                >
                  <Highlight
                    query='NSFW'
                    styles={{
                      px: '1',
                      py: '1',
                      top: '-2px',
                      position: 'relative',
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

          <ModalFooter
            bg='gray.100'
            borderRadius={'lg'}
            position='relative'
            left='-16px'
            bottom='-16px'
            width='512px'
            height='64px'
          >
            <Button
              colorScheme='blue'
              variant={'outline'}
              height='32px'
              mr={3}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button height='32px' onClick={() => submitCommunity()}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
