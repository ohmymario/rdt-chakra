// Chakra UI Components
import { Button, Image, Spacer, Stack } from '@chakra-ui/react';

// Types
import { tabLabels } from '@/hooks/useTabState';

interface ImageUploadPreviewProps {
  selectedFile: string;
  setActiveTab: (tab: tabLabels) => void;
  resetSelectedFile: () => void;
}

const ImageUploadPreview = (props: ImageUploadPreviewProps) => {
  const { selectedFile, setActiveTab, resetSelectedFile } = props;
  return (
    <>
      <Image src={selectedFile} alt='Your uploaded image preview' maxW='400px' maxH='400px' />

      {/* SPACER */}
      <Spacer />
      {/* SPACER */}

      <Stack direction='row' spacing={4} mt={6}>
        <Button height='28px' aria-label='Go back to post editing' onClick={() => setActiveTab('Post')}>
          Back to Post
        </Button>
        <Button height='28px' variant='outline' aria-label='Remove selected image' onClick={resetSelectedFile}>
          Remove
        </Button>
      </Stack>
    </>
  );
};

export default ImageUploadPreview;
