// Chakra UI Components
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Image } from '@chakra-ui/react';

interface ImageUploadPreviewProps {
  selectedFile: string;
  resetSelectedFile: () => void;
}

const ImageUploadPreview = (props: ImageUploadPreviewProps) => {
  const { selectedFile, resetSelectedFile } = props;
  return (
    <Flex
      justifyContent='center'
      direction='column'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='4'
      position='relative'
      overflow='hidden'
    >
      {/* Image Container */}
      <Flex
        position='relative'
        alignSelf='center'
        maxH='400px'
        width='100%'
        overflow='hidden'
        align='center'
        justify='center'
      >
        {/* Blurry Background Image */}
        <Image
          src={selectedFile}
          alt='Background Preview'
          width='100%'
          height='100%'
          transform='scale(1.1)'
          filter='blur(13px)'
          position='absolute'
          top={0}
          left={0}
        />

        {/* Clear Image */}
        <Image src={selectedFile} alt='Your uploaded image preview' maxH='400px' position='relative' zIndex={1} />
      </Flex>

      {/* Delete Image */}
      <Box m={2} alignSelf='flex-end' padding={1} zIndex={2}>
        <DeleteIcon
          boxSize={8}
          color='gray.500'
          cursor='pointer'
          onClick={resetSelectedFile}
          p={1.5}
          _hover={{
            bg: 'gray.100',
            cursor: 'pointer',
            borderRadius: '4',
          }}
        />
      </Box>
    </Flex>
  );
};

export default ImageUploadPreview;
