import { Flex, Spinner } from '@chakra-ui/react';

interface ImageUploadLoadingProps {}

const flexContainerStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
};

const spinnerStyles = {
  thickness: '4px',
  speed: '0.65s',
  emptyColor: 'gray.200',
  color: 'blue.500',
  size: 'xl',
};

const ImageUploadLoading = (props: ImageUploadLoadingProps) => {
  return (
    <Flex {...flexContainerStyles}>
      <Spinner {...spinnerStyles} />
    </Flex>
  );
};

export default ImageUploadLoading;
