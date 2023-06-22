import { Community } from '@/atoms/communitiesAtom';
import { auth } from '@/firebase/clientApp';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Box, Button, Divider, Flex, Icon, Image, Spinner, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import AboutHeader from './AboutHeader';
import AboutWelcome from './AboutWelcome';

interface AboutProps {
  communityData: Community;
}

const About = (props: AboutProps) => {
  // Grab the currently logged in user
  const [user] = useAuthState(auth);

  // Props
  const { communityData } = props;
  const { createdAt, creatorId, name, nsfw, numberOfMembers, type, imageURL, id } = communityData;
  const { selectedFileRef, selectedFile, onSelectFile, uploadingImage, onUpdateImage } = useImageUpload(communityData);
  // Fix for hydration error
  const [isMounted, setIsMounted] = useState(false);

  // When the component is mounted, it sets the `isMounted` state to `true` using the `useEffect` hook.
  // This ensures that the `Link` component is only rendered on the client side, after the component is mounted,
  // which should prevent the hydration error from occurring. If `isMounted` is `false`, the component returns `null`.
  // If `isMounted` is `true`, the component renders the `Link` component using the `next/link` package.
  // If you're using an older version of `@chakra-ui/react` that doesn't have the `NoSsr` component, you can use this approach instead.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box alignSelf='flex-start' width='100%'>
      <AboutHeader />

      {/* BODY */}
      <Flex direction='column' p={3} bg='white' borderRadius='0 0 4px 4px'>
        <Stack>
          <AboutWelcome creatorId={creatorId} createdAt={createdAt} />
          <Divider />

          <Flex width='100%' p={2} fontSize='10pt' fontWeight={700}>
            <Flex direction='column' flexGrow={1}>
              <Text>{numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction='column' flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>

          <Divider />

          <Link href={`/r/${creatorId}/submit`} passHref>
            <Button colorScheme='blue' height='30px' width='100%' my={2}>
              Create Post
            </Button>
          </Link>

          {user?.uid === creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize='10pt'>
                <Text fontWeight={600} fontSize='10pt'>
                  Admin
                </Text>
                <Flex align='center' justify='space-between'>
                  <Text
                    color={'blue.500'}
                    cursor='pointer'
                    _hover={{
                      textDecoration: 'underline',
                    }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {imageURL || selectedFile ? (
                    <Image src={selectedFile || imageURL} borderRadius='full' boxSize='40px' alt='Community Image' />
                  ) : (
                    <Icon as={FaReddit} fontSize={40} color='brand.100' />
                  )}
                </Flex>

                {selectedFile ? (
                  uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text cursor='pointer' onClick={onUpdateImage}>
                      Save Changes
                    </Text>
                  )
                ) : null}

                <input
                  id='file-upload'
                  ref={selectedFileRef}
                  type='file'
                  accept='image/jpeg, image/png'
                  onChange={(e) => onSelectFile(e)}
                  hidden
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
