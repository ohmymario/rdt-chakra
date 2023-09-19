import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';

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
  loading: boolean;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { selectedFile, onSelectFile, resetSelectedFile, setActiveTab, errorMessage, loading } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectFile(e);
  };

  const renderContent = () => {
    if (loading) {
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
