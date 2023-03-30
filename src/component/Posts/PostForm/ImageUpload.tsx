import { Button, Flex } from '@chakra-ui/react';
import { FunctionComponent, useRef } from 'react';

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
  const handleSubmitClick = () => {
    fileInputRef.current?.click();
  };

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
    <Flex justify='center' align='center' width='100%'>
          <Flex {...inputContainerStyles}>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/jpeg, image/png'
          onChange={(e) => onSelectImage(e)}
          hidden
          style={{ display: 'none', visibility: 'hidden', opacity: 0, height: 0, width: 0 }}
        />
        <Button variant='outline' height='28px' onClick={() => handleSubmitClick()}>
          Upload
        </Button>
      </Flex>
    </Flex>
  );
};

export default ImageUpload;
