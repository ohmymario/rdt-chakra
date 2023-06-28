import { auth, firestore } from '@/firebase/clientApp';
import UseDirectory from '@/hooks/useDirectory';
import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  Divider,
  Heading,
  Highlight,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaEye, FaLock, FaUserCircle } from 'react-icons/fa';
import CreateCommunityModalAdult from './CreateCommunityModalAdult';
import CreateCommunityModalFooter from './CreateCommunityModalFooter';
import CreateCommunityModalHeader from './CreateCommunityModalHeader';

interface CreateCommunityModalProps {
  open: boolean;
  handleClose: () => void;
}

export type AccessLevel = 'public' | 'restricted' | 'private';

const CreateCommunityModal: FunctionComponent<CreateCommunityModalProps> = (props: CreateCommunityModalProps) => {
  const { open, handleClose } = props;

  const router = useRouter();
  const { toggleMenuOpen } = UseDirectory();

  const [user] = useAuthState(auth);

  const [communityName, setCommunityName] = useState<string>('');
  const [charsRemain, setCharsRemain] = useState<number>(21);
  const [communityType, setCommunityType] = useState<AccessLevel>('public');
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleCommunityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length > 21) return;
    setCharsRemain(21 - name.length);
    setCommunityName(name);
  };

  const handleCommunityType = (e: string) => {
    setCommunityType(e as AccessLevel);
  };

  const handleNSFW = () => {
    setIsAdult(!isAdult);
  };

  const submitCommunity = async () => {
    if (error) setError(''); // clear error

    // https://stackoverflow.com/a/32311188
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    // Validate
    if (format.test(communityName)) {
      setError('Community names can only contain letters and numbers');
      return;
    }

    if (communityName.length < 3) {
      setError('Community names must be at least 3 characters long');
      return;
    }

    if (communityName.length > 21) {
      setError('Community names must be less than 21 characters long');
      return;
    }

    setLoading(true);

    try {
      await runTransaction(firestore, async (transaction) => {
        const communityDocRef = doc(firestore, 'communities', communityName);
        // Check for Existing Community
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry r/${communityName} is taken. Try another.`);
        }

        // Create Community
        transaction.set(communityDocRef, {
          name: communityName,
          type: communityType,
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          nsfw: isAdult,
        });

        const communitySnippets = `users/${user?.uid}/communitySnippets`;
        const userDocRef = doc(firestore, communitySnippets, communityName);

        // Create Community Snippet on User
        transaction.set(userDocRef, {
          communityId: communityName,
          isModerator: true,
        });
      });

      resetForm();
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }

    setLoading(false);
    handleClose();
    toggleMenuOpen();
    router.push(`/r/${communityName}`);
  };

  const resetForm = () => {
    setCommunityName('');
    setCharsRemain(21);
    setCommunityType('public');
    setIsAdult(false);
    setError('');
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
          <CreateCommunityModalHeader />
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
                  <Text {...subTextStyles}>Community names including capitalization cannot be changed.</Text>
                </Box>
                <Text position='relative' top='37px' left='10px' width='20px' color='gray.400'>
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
                <Text {...subTextStyles} color={!charsRemain ? 'red' : 'gray.500'}>
                  {charsRemain} characters remaining
                </Text>

                {error && (
                  <Alert status='error' border={'1px solid red'} borderRadius='xl'>
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
              </VStack>

              {/* Community Type */}
              <VStack width={'100%'} align='flex-start'>
                <Heading as='h4' size='sm' mb={2} fontWeight='500'>
                  Community Type
                </Heading>
                <RadioGroup onChange={(e) => handleCommunityType(e)} value={communityType}>
                  <Radio size='md' mb={4} value='public'>
                    <HStack>
                      <Icon as={FaUserCircle} color='gray.500' top='-1px' position='relative' />
                      <Text fontSize='10pt' fontWeight='600'>
                        Public
                      </Text>
                      <Text {...subTextStyles}>Anyone can view, post, and comment to this community</Text>
                    </HStack>
                  </Radio>
                  <Radio size='md' mb={4} value='restricted'>
                    <HStack>
                      <Icon as={FaEye} color='gray.500' top='-1px' position='relative' />
                      <Text fontSize='10pt' fontWeight='600'>
                        Restricted
                      </Text>
                      <Text {...subTextStyles}>Anyone can view this community, but only approved users can post</Text>
                    </HStack>
                  </Radio>
                  <Radio size='md' mb={4} value='private'>
                    <HStack>
                      <Icon as={FaLock} color='gray.500' top='-1px' position='relative' />
                      <Text fontSize='10pt' fontWeight='600'>
                        Private
                      </Text>
                      <Text {...subTextStyles}>Only approved users can view and submit to this community </Text>
                    </HStack>
                  </Radio>
                </RadioGroup>
              </VStack>

              {/* Adult Content */}
              <CreateCommunityModalAdult handleNSFW={handleNSFW} isAdult={isAdult} />
            </VStack>
          </ModalBody>
          <CreateCommunityModalFooter loading={loading} submitCommunity={submitCommunity} handleClose={handleClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
