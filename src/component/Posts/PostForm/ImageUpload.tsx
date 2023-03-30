import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import { FunctionComponent, useRef } from 'react';
import { tabLabels } from '../NewPostForm';

interface ImageUploadProps {
  selectedFile: string | null;
  setSelectedFile: (file: string | null) => void;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveTab: (tab: tabLabels) => void;
}

const ImageUpload: FunctionComponent<ImageUploadProps> = (props) => {
  const { onSelectImage, setActiveTab, selectedFile, setSelectedFile } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for Button Click
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const ActiveTabPost = () => setActiveTab('Post');
  const removeSelectedFile = () => setSelectedFile(null);

  const inputContainerStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    border: '1px solid',
    borderColor: 'gray.200',
    width: '100%',
    borderRadius: 4,
  };

  return (
    <Flex direction='column' justify='center' align='center' width='100%'>
      {selectedFile ? (
        <>
          <Image src={selectedFile} alt='selected' style={{ maxWidth: '400', maxHeight: '400px' }} />
          <Stack direction='row' spacing={4} mt={4}>
            <Button height='28px' onClick={() => ActiveTabPost()}>
              Back to Post
            </Button>
            <Button variant='outline' height='28px' onClick={() => removeSelectedFile()}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Flex {...inputContainerStyles}>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/jpeg, image/png'
              onChange={(e) => onSelectImage(e)}
              hidden
              style={{ display: 'none', visibility: 'hidden', opacity: 0, height: 0, width: 0 }}
            />
            <Button variant='outline' height='28px' onClick={() => handleInputClick()}>
              Upload
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ImageUpload;
