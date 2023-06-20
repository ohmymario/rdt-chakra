import { communitiesState, Community } from '@/atoms/communitiesAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelecfile from '@/hooks/useSelectFile';
import { Box, Button, Divider, Flex, Icon, Image, Spinner, Stack, Text } from '@chakra-ui/react';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';

interface AboutProps {
  communityData: Community;
}

function timestampToDate(timestampData: { seconds: number; nanoseconds: number }): string {
  const timestamp = new Timestamp(timestampData.seconds, timestampData.nanoseconds);
  const date = timestamp.toDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}, ${day} ${year}`;
}

const About: FunctionComponent<AboutProps> = (props) => {
  // Grab the currently logged in user
  const [user] = useAuthState(auth);

  // Props
  const { communityData } = props;
  const { createdAt, creatorId, name, nsfw, numberOfMembers, type, imageURL, id } = communityData;

  // Fix for hydration error
  const [isMounted, setIsMounted] = useState(false);

  // Image Upload / Input Ref
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, onSelectFile, setSelectedFile } = useSelecfile();
  const [uploadingImage, setUploadingImage] = useState(false);

  const [communityStateValue, setCommunityStateValue] = useRecoilState(communitiesState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);

    try {
      // Uploading an image to a community, generating a download URL,
      // and updating the community document with the image URL in Firestore.
      const imageLocation = `communities/${id}/image`;
      const imageRef = ref(storage, imageLocation);
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, 'communities', id), {
        imageURL: downloadURL,
      });

      // Update the global state
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...communityData,
          imageURL: downloadURL,
        },
      }));

      // Operation Complete
      setUploadingImage(false);
    } catch (error) {
      setUploadingImage(false);
      console.error(error);
    }
  };

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
      {/* HEADER */}
      <Flex justify='space-between' align='center' bg='blue.400' color='white' p={3} borderRadius='4px 4px 0 0'>
        <Text fontWeight={700} fontSize='10pt'>
          About Community
        </Text>
        <Icon
          as={HiOutlineDotsHorizontal}
          _hover={{
            cursor: 'pointer',
          }}
        />
      </Flex>

      {/* BODY */}
      <Flex direction='column' p={3} bg='white' borderRadius='0 0 4px 4px'>
        <Stack>
          <Text>
            Welcome to r/{creatorId}, the place for almost anything {creatorId} related.
          </Text>
          <Flex width='100%' fontSize='10pt' gap={2} fontWeight='500' p={1}>
            <Icon color={'gray.600'} as={RiCakeLine} fontSize={18} />
            <Text color={'gray.400'}>Created {timestampToDate(createdAt)}</Text>
          </Flex>

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
            <Button
              // as='a'
              colorScheme='blue'
              height='30px'
              width='100%'
              my={2}
            >
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
