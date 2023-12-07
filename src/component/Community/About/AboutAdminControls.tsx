import { Community } from '@/atoms/communitiesAtom';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Divider, Flex, Icon, Image, Input, Spinner, Stack, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface AboutAdminControlsProps {
  communityData: Community;
}

const AboutAdminControls = (props: AboutAdminControlsProps) => {
  const { communityData } = props;
  const { selectedFileRef, selectedFile, loadingState, onSelectFile, onUpdateImage } =
    useCommunityImageUpload(communityData);

  return (
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
          {communityData.imageURL || selectedFile ? (
            <Image
              src={selectedFile || communityData.imageURL}
              borderRadius='full'
              boxSize='40px'
              alt='Community Image'
            />
          ) : (
            <Icon as={FaReddit} fontSize={40} color='brand.100' />
          )}
        </Flex>

        {selectedFile &&
          (loadingState ? (
            <Spinner />
          ) : (
            <Text cursor='pointer' onClick={onUpdateImage}>
              Save Changes
            </Text>
          ))}

        <Input
          id='file-upload'
          ref={selectedFileRef}
          type='file'
          accept='image/jpeg, image/png'
          onChange={onSelectFile}
          hidden
        />
      </Stack>
    </>
  );
};

export default AboutAdminControls;
