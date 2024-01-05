import { useRef } from 'react';

// Types
import { tabLabels } from '@/hooks/useTabState';

// Components
import ImageUploadError from './ImageUploadError';
import ImageUploadInput from './ImageUploadInput';
import ImageUploadLoading from './ImageUploadLoading';
import ImageUploadPreview from './ImageUploadPreview';

interface ImageUploadProps {
  selectedFile: string | null;
  errorMessage: string | null;
  loading: boolean;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetSelectedFile: () => void;
  setActiveTab: (tab: tabLabels) => void;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { selectedFile, errorMessage, loading, onSelectFile, resetSelectedFile, setActiveTab } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectFile(e);
  };

  const renderContent = () => {
    // Loading
    if (loading) return <ImageUploadLoading />;

    // Selected
    if (selectedFile) {
      return (
        <ImageUploadPreview
          selectedFile={selectedFile}
          resetSelectedFile={resetSelectedFile}
          setActiveTab={setActiveTab}
        />
      );
    }

    // Default
    return (
      <ImageUploadInput
        fileInputRef={fileInputRef}
        handleFileSelection={handleFileSelection}
        clickFileInput={() => fileInputRef.current?.click()}
      />
    );
  };

  return (
    <>
      {/* Error */}
      <ImageUploadError errorMessage={errorMessage} />
      {renderContent()}
    </>
  );
};

export default ImageUpload;
