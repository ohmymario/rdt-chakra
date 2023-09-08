import { Button, Flex } from '@chakra-ui/react';
import { RefObject } from 'react';

interface ImageUploadInputProps {
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickFileInput: () => void;
}

const inputContainerStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  border: '1px solid',
  borderColor: 'gray.200',
  width: '100%',
  borderRadius: 4,
};

const inputHiddenStyles = {
  display: 'none',
  visibility: 'hidden',
  opacity: 0,
  height: 0,
  width: 0,
};

const ImageUploadInput = (props: ImageUploadInputProps) => {
  const { fileInputRef, handleFileSelection, clickFileInput } = props;

  return (
    <Flex {...inputContainerStyles}>
      <input
        hidden
        type='file'
        ref={fileInputRef}
        {...inputHiddenStyles}
        accept='image/jpeg, image/png'
        onChange={handleFileSelection}
        aria-label='Select an image file to upload'
      />
      <Button height='28px' variant='outline' aria-label='Upload an image' onClick={clickFileInput}>
        Upload
      </Button>
    </Flex>
  );
};

export default ImageUploadInput;
