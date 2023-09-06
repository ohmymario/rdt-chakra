import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Image,
  Spacer,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { tabLabels } from '../NewPostForm';

interface ImageUploadProps {
  selectedFile: string | null;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSelectedFile: () => void;
  setActiveTab: (tab: tabLabels) => void;
  errorMessage: string | null;
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

const inputStyles = {
  display: 'none',
  visibility: 'hidden',
  opacity: 0,
  height: 0,
  width: 0,
};

const ImageUpload = (props: ImageUploadProps) => {
  const { onSelectFile, selectedFile, resetSelectedFile, setActiveTab, errorMessage } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clickFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    onSelectFile(e);
  };

  useEffect(() => {
    if (selectedFile) {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return (
    <Flex direction='column' justify='center' align='center' width='100%'>
      {errorMessage && (
        <Alert status='error' mb={4} justifyContent='center'>
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <Flex justifyContent='center' alignItems='center'>
          <Spinner size='xl' />
        </Flex>
      ) : selectedFile ? (
        <>
          <Image src={selectedFile} alt='User selected image for upload' maxW='400px' maxH='400px' />
          <Spacer />
          <Stack direction='row' spacing={4} mt={6}>
            <Button height='28px' aria-label='Go back to post editing' onClick={() => setActiveTab('Post')}>
              Back to Post
            </Button>
            <Button height='28px' variant='outline' aria-label='Remove selected image' onClick={resetSelectedFile}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Flex {...inputContainerStyles}>
            <input
              ref={fileInputRef}
              aria-label='Select an image file to upload'
              type='file'
              accept='image/jpeg, image/png'
              onChange={handleFileSelection}
              hidden
              {...inputStyles}
            />
            <Button height='28px' variant='outline' aria-label='Upload an image' onClick={clickFileInput}>
              Upload
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ImageUpload;
