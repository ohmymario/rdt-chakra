import { useEffect, useRef, useState } from 'react';
import { Flex } from '@chakra-ui/react';

// Types
import { tabLabels } from '../../NewPostForm';

// Components
import ImageUploadAlert from './ImageUploadAlert';
import ImageUploadInput from './ImageUploadInput';
import ImageUploadLoading from './ImageUploadLoading';
import ImageUploadPreview from './ImageUploadPreview';

interface ImageUploadProps {
  selectedFile: string | null;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSelectedFile: () => void;
  setActiveTab: (tab: tabLabels) => void;
  errorMessage: string | null;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { onSelectFile, selectedFile, resetSelectedFile, setActiveTab, errorMessage } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    onSelectFile(e);
  };

  useEffect(() => {
    if (selectedFile) {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const renderContent = () => {
    if (isLoading) {
      return <ImageUploadLoading />;
    }

    if (selectedFile) {
      return (
        <ImageUploadPreview
          selectedFile={selectedFile}
          resetSelectedFile={resetSelectedFile}
          setActiveTab={setActiveTab}
        />
      );
    }

    return (
      <ImageUploadInput
        fileInputRef={fileInputRef}
        handleFileSelection={handleFileSelection}
        clickFileInput={() => fileInputRef.current?.click()}
      />
    );
  };

  return (
    <Flex direction='column' justify='center' align='center' width='100%'>
      {errorMessage && <ImageUploadAlert errorMessage={errorMessage} />}
      {renderContent()}
    </Flex>
  );
};

export default ImageUpload;
