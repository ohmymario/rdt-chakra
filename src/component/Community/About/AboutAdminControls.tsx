import { Divider, Flex, Icon, Image, Input, Spinner, Stack, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface AboutAdminControlsProps {
  selectedFileRef: React.MutableRefObject<HTMLInputElement | null>;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateImage: () => void;
  selectedFile: string | null;
  uploadingImage: boolean;
  imageURL: string | undefined;
}

const AboutAdminControls = (props: AboutAdminControlsProps) => {
  const { selectedFileRef, selectedFile, imageURL, onSelectFile, onUpdateImage, uploadingImage } = props;

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
          {imageURL || selectedFile ? (
            <Image src={selectedFile || imageURL} borderRadius='full' boxSize='40px' alt='Community Image' />
          ) : (
            <Icon as={FaReddit} fontSize={40} color='brand.100' />
          )}
        </Flex>

        {selectedFile &&
          (uploadingImage ? (
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
          onChange={(e) => onSelectFile(e)}
          hidden
        />
      </Stack>
    </>
  );
};

export default AboutAdminControls;
