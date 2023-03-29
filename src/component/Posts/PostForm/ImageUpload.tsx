import { Button, Flex } from '@chakra-ui/react';
import { FunctionComponent, useRef } from 'react';

interface ImageUploadProps {}

const ImageUpload: FunctionComponent<ImageUploadProps> = (props: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for Button Click
  const handleSubmitClick = () => {
    fileInputRef.current?.click();
  };

  // Logic for Input Element / File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Uploading image:', files[0]);
    }
  };

  return (
    <Flex justify='center' align='center' width='100%'>
      <Flex
        justify='center'
        align='center'
        p={20}
        border='1px solid'
        borderColor='gray.200'
        width='100%'
        borderRadius={4}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button variant='outline' height='28px' onClick={handleSubmitClick}>
          Upload
        </Button>
      </Flex>
    </Flex>
  );
};

export default ImageUpload;
